package main

import (
	"backend/modules/config"
	"backend/modules/fiber"
	"backend/modules/mysql"
)

func main() {
	config.Init()
	mysql.Init()
	fiber.Init()
}
