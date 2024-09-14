package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CartItem struct {
	ID          	uuid.UUID 	`gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	WalletAddress 	string    	`gorm:"index;not null" json:"wallet_address"`
	PhygitalID  	uuid.UUID 	`gorm:"type:uuid;not null" json:"phygital_id"`
	Name        	string    	`json:"name"`
	Price       	*float64  	`json:"price" gorm:"type:decimal(20,10);"`
	Image       	string    	`json:"image"`
	Logo			string		`json:"logo"`
	Quantity    	int       	`json:"quantity"`
	CreatedAt   	time.Time 	`gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt   	time.Time 	`gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}

func (c *CartItem) BeforeCreate(tx *gorm.DB) (err error) {
	c.ID = uuid.New()
	return
}
