package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/GDSC-KMUTT/totp-session/service"
	"github.com/GDSC-KMUTT/totp-session/types"
	"github.com/GDSC-KMUTT/totp-session/utils"
)

type userHandler struct {
	service service.UserService
}

func NewUserHandler(userSerivice service.UserService) userHandler {
	return userHandler{service: userSerivice}
}

func (h userHandler) SignUp(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	var response []byte
	var body types.SignIn
	err := utils.Parse(r, &body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Call signup service
	token, base64, err := h.service.SignUp(body.Email, body.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response
	response, _ = json.Marshal(map[string]any{"success": true, "token": token, "image": base64})
	fmt.Fprint(w, response)
	return
}

func (h userHandler) SignIn(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, r.Body)
}

func (h userHandler) ListUsers(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	users, err := h.service.ListUsers()
	if err != nil {
		panic(err.Error())
	}
	response, err := json.Marshal(map[string]any{"users": users})
	if err != nil {
		panic(err)
	}
	fmt.Fprint(w, response)
}
