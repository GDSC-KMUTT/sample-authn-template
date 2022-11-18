package repository

import (
	"database/sql"
)

type userRepositoryDB struct {
	db *sql.DB
}

func NewRepositoryDB(db *sql.DB) userRepositoryDB {
	return userRepositoryDB{db: db}
}

func (u userRepositoryDB) CreateUser(email string, password string, secret string) (*User, error) {
	// Insert document into database
	insert, err := u.db.Exec("INSERT INTO users (email, password, secret) VALUES (?, ?, ?)", email, password, secret)
	if err != nil {
		return nil, err
	}
	userId, err := insert.LastInsertId()

	// Create user object
	var user = User{
		Id:       userId,
		Email:    email,
		Password: password,
		Secret:   secret,
	}
	return &user, nil
}
func (u userRepositoryDB) CheckUser(email string) (*User, error) {
	return nil, nil
}

func (u userRepositoryDB) GetUsers() ([]*User, error) {
	result, err := u.db.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}
	var users []*User
	for result.Next() {
		var user User

		if err := result.Scan(&user.Id, &user.Email, &user.Password, &user.Secret); err != nil {
			return nil, err
		}

		users = append(users, &user)
	}
	defer result.Close()
	return users, nil
}
