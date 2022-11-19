package demo

import (
	"github.com/davecgh/go-spew/spew"
	"github.com/gofiber/fiber/v2"

	"backend/modules/mysql"
	"backend/types/model"
)

func GetCountryById(c *fiber.Ctx) error {
	id := c.Query("id")

	var countries []*model.Country
	if result := mysql.DemoStoreDB.Raw("SELECT * FROM countries WHERE id = ?", id).Scan(&countries); result.Error != nil {
		return result.Error
	}

	spew.Dump(countries)

	return c.JSON(countries[0])
}
