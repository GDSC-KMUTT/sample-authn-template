package demo

import (
	"github.com/gofiber/fiber/v2"

	"backend/modules/mysql"
	"backend/types/model"
)

func GetProductByBottleSize(c *fiber.Ctx) error {
	min := c.Query("min")
	max := c.Query("max")

	var products []*model.Product
	if result := mysql.DemoStoreDB.Raw("SELECT * FROM products WHERE bottle_size >= ? AND bottle_size <= ?", min, max).Scan(&products); result.Error != nil {
		return result.Error
	}

	return c.JSON(products)

}
