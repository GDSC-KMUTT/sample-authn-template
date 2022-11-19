package fiber

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/sirupsen/logrus"

	"backend/endpoints"

	"backend/types/response"
)

func Init() {
	// Initialize fiber instance
	app := fiber.New(fiber.Config{
		Prefork:       false,
		StrictRouting: true,
		ReadTimeout:   5 * time.Second,
		WriteTimeout:  5 * time.Second,
	})

	// Apply CORS middleware
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// Init root endpoint
	app.All("/", func(c *fiber.Ctx) error {
		return c.JSON(&response.Info{
			Success: true,
			Message: "Root Endpoint",
		})
	})

	endpoints.Init(app)

	// Startup
	err := app.Listen(":8080")
	if err != nil {
		logrus.Fatal(err)
	}
}
