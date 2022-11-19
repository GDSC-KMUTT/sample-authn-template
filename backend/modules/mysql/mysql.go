package mysql

import (
	"log"
	"os"

	"github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"backend/modules/config"
)

var PersonalDB *gorm.DB
var DemoStoreDB *gorm.DB

func Init() {
	// Create logger
	l := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			Colorful: true,
			LogLevel: logger.Info,
		},
	)

	// Open Personal SQL connection
	personalDialect := mysql.New(
		mysql.Config{
			DSN:               config.C.PersonalMySqlDsn,
			DefaultStringSize: 255,
		},
	)

	if db, err := gorm.Open(personalDialect, &gorm.Config{Logger: l}); err != nil {
		logrus.Fatal("UNABLE TO LOAD GORM MYSQL DATABASE")
	} else {
		PersonalDB = db
	}

	// Open DemoStore SQL connection
	demoStoreDialect := mysql.New(
		mysql.Config{
			DSN: config.C.DemoStoreMySqlDsn,
		},
	)

	if db, err := gorm.Open(demoStoreDialect, &gorm.Config{Logger: l}); err != nil {
		logrus.Fatal("UNABLE TO LOAD GORM MYSQL DATABASE")
	} else {
		DemoStoreDB = db
	}
}
