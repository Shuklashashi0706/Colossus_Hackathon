package db

import (
	"log"
	"os"

	"app.myriadflow.com/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {

	DB := Connect()
	db, err := DB.DB()
	if err != nil {
		log.Println(err)
		log.Fatal(err)
	}
	db.SetMaxIdleConns(50)
	db.SetMaxOpenConns(200)

	err = db.Ping()
	if err != nil {
		log.Println(err)
		log.Fatal(err)
	}
	log.Println("Successfully connected to the database!")

	InitMigration(DB)

	err = DB.Debug().AutoMigrate(&models.User{}, &models.Brand{}, &models.Collection{}, &models.Phygital{}, &models.WebXR{}, &models.Avatar{}, &models.Variant{} , &models.FanToken{} , &models.ChainType{} ,  &models.NftEntries{} , &models.Profile{} , &models.CartItem{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}
}

func Connect() *gorm.DB {
	// dsn := "host=satao.db.elephantsql.com user=atvcirnc password=fFa7mq_RGHrfMQ1tvfsNanUhjF96sbCk dbname=atvcirnc port=5432 sslmode=disable"
	dsn := "host=" + os.Getenv("DB_HOST") + " port=" + os.Getenv("DB_PORT") + " user=" + os.Getenv("DB_USERNAME") + " password=" + os.Getenv("DB_PASSWORD") + " dbname=" + os.Getenv("DB_NAME") + " sslmode=" + os.Getenv("DB_SSL_MODE") + ""

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("failed to connect to database: %v", err)
	}

	return DB
}
func InitMigration(db *gorm.DB) error {
	return db.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"").Error
}
