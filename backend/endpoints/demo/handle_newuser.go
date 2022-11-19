package demo

import (
	"github.com/gofiber/fiber/v2"

	"backend/modules/mysql"
	"backend/types/payload"
	"backend/types/response"
)

func NewUser(c *fiber.Ctx) error {
	// * Parse body
	var body *payload.NewUser
	if err := c.BodyParser(&body); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if result := mysql.PersonalDB.Exec("INSERT INTO users (name, email, password, secret) VALUES (?, ?, ?, ?)", body.Name, body.Email, body.Password, "AAAA"); result.Error != nil {
		return result.Error
	}

	return c.JSON(response.Info{
		Success: true,
		Message: "Successfully created a user",
	})
}
