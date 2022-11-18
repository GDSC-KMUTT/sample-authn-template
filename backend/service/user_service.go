package service

import (
	"bytes"
	"encoding/base64"
	"image/png"
	"time"

	"github.com/GDSC-KMUTT/totp-session/config"
	"github.com/GDSC-KMUTT/totp-session/repository"
	"github.com/golang-jwt/jwt"
	"github.com/pquerna/otp/totp"
	"golang.org/x/crypto/bcrypt"
)

type userService struct {
	repository repository.UserRepository
}

func NewUserService(userRepository repository.UserRepository) userService {
	return userService{repository: userRepository}
}

func (s userService) SignUp(email string, password string) (*string, *string, error) {
	// Generate a new secret TOTP key
	key, err := totp.Generate(totp.GenerateOpts{
		Issuer:      "GDSC KMUTT",
		AccountName: email,
	})
	if err != nil {
		return nil, nil, err
	}
	secret := key.Secret()

	// Hash the password
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, nil, err
	}

	// Create a new user
	user, err := s.repository.CreateUser(email, string(hashedPwd), secret)
	if err != nil {
		return nil, nil, err
	}

	// Create a new JWT claims
	claims := jwt.MapClaims{
		"id":  user.Id,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(config.C.JWT_SECRET))

	// Convert TOTP key into a PNG
	var buf bytes.Buffer
	img, err := key.Image(200, 200)
	if err != nil {
		return nil, nil, err
	}
	if err := png.Encode(&buf, img); err != nil {
		return nil, nil, err
	}
	base64string := "data:image/png;base64," + base64.StdEncoding.EncodeToString(buf.Bytes())

	return &tokenString, &base64string, nil
}

func (s userService) SignIn(email string, password string) (*UserService, error) {
	return nil, nil
}

func (s userService) ListUsers() ([]*User, error) {
	users, err := s.repository.GetUsers()
	if err != nil {
		return nil, err
	}
	var userResponse []*User
	for _, user := range users {
		userResponse = append(userResponse, &User{Id: user.Id, Email: user.Email})
	}
	return userResponse, nil
}
