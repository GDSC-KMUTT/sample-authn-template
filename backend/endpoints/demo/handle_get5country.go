package demo

import (
	"github.com/gofiber/fiber/v2"

	"backend/modules/mysql"
	"backend/types/model"
)

func Get5CountryHandler(c *fiber.Ctx) error {
	var countries []*model.Country
	if result := mysql.DemoStoreDB.Raw("SELECT * FROM countries LIMIT 5").Scan(&countries); result.Error != nil {
		return result.Error
	}

	return c.JSON(countries)
}
