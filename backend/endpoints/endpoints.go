package endpoints

import (
	"github.com/gofiber/fiber/v2"

	demoEndpoint "backend/endpoints/demo"
)

func Init(app *fiber.App) {
	demo := app.Group("/demo")
	demo.Get("/get5countries", demoEndpoint.Get5CountryHandler)
	demo.Get("/getcountrybyid", demoEndpoint.GetCountryById)
	demo.Get("/getproductbybottlesize", demoEndpoint.GetProductByBottleSize)
	demo.Post("/newuser", demoEndpoint.NewUser)
}
