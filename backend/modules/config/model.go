package config

import (
	"os"

	"gopkg.in/yaml.v2"
)

var C = new(Model)

func Init() {
	yml, err := os.ReadFile("config.yaml")
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(yml, C)
	if err != nil {
		panic(err)
	}
}
