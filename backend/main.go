package main

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/GDSC-KMUTT/totp-session/config"
	_ "github.com/go-sql-driver/mysql"
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

	http.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		// implement me!
	})

	http.HandleFunc("/signin", func(w http.ResponseWriter, r *http.Request) {
		// implement me!
	})

	http.HandleFunc("/list", func(w http.ResponseWriter, r *http.Request) {
		// implement me!
	})

	if err := s.ListenAndServe(); err != nil {
		panic(err)
	}

	defer db.Close()
}
