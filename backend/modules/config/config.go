package config

type Model struct {
	Address           string `json:"address"`
	JwtSecret         string `yaml:"jwt_secret"`
	PersonalMySqlDsn  string `yaml:"personal_mysql_dsn"`
	DemoStoreMySqlDsn string `yaml:"demo_store_mysql_dsn"`
}
