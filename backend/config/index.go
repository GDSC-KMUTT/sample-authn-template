package config

import (
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

var C = new(config)

func init() {
	yml, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(yml, C)
	if err != nil {
		panic(err)
	}
}
