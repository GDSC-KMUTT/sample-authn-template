package main

import (
	"bytes"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"image/png"
	"net/http"
	"time"

	"github.com/GDSC-KMUTT/totp-session/config"
	"github.com/GDSC-KMUTT/totp-session/handler"
	"github.com/GDSC-KMUTT/totp-session/repository"
	"github.com/GDSC-KMUTT/totp-session/service"
	"github.com/GDSC-KMUTT/totp-session/types"
	"github.com/GDSC-KMUTT/totp-session/utils"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt"
	"github.com/pquerna/otp/totp"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	s := &http.Server{
		Addr:           ":8080",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	db, err := sql.Open("mysql", config.C.DB_HOST)
	if err != nil {
		panic(err)
	}
	userRepository := repository.NewRepositoryDB(db)
	userService := service.NewUserService(userRepository)
	userHandler := handler.NewUserHandler(userService)

	http.HandleFunc("/", (func(w http.ResponseWriter, r *http.Request) {
		// Check if the request method is POST
		if r.Method != "POST" {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		// Set the response header to application/json
		w.Header().Set("Content-Type", "application/json")

		// Declare a variable to store the body of the request
		var response []byte
		var body types.SignIn
		err := utils.Parse(r, &body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Generate a new secret TOTP key
		key, err := totp.Generate(totp.GenerateOpts{
			Issuer:      "GDSC KMUTT",
			AccountName: body.Email,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		secret := key.Secret()

		// Hash the password
		hashedPwd, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Create a new user
		insert, err := db.Exec("INSERT INTO users (email, password, secret) VALUES (?, ?, ?)", body.Email, hashedPwd, secret)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		userId, err := insert.LastInsertId()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Create a new JWT claims
		claims := jwt.MapClaims{
			"id":  userId,
			"exp": time.Now().Add(time.Hour * 72).Unix(),
		}

		// Create JWT token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString([]byte(config.C.JWT_SECRET))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Convert TOTP key into a PNG, and encode it to base64
		var buf bytes.Buffer
		img, err := key.Image(200, 200)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if err := png.Encode(&buf, img); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		base64string := "data:image/png;base64," + base64.StdEncoding.EncodeToString(buf.Bytes())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Create a response
		response, _ = json.Marshal(map[string]any{"success": true, "token": tokenString, "image": base64string})
		fmt.Fprint(w, response)
	}))

	http.HandleFunc("/signup", userHandler.SignUp)
	http.HandleFunc("/signin", userHandler.SignIn)
	http.HandleFunc("/list", userHandler.ListUsers)

	if err := s.ListenAndServe(); err != nil {
		panic(err)
	}

	defer db.Close()
}
