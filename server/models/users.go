package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID            uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Username      string    `json:"username"`
	WalletAddress string    `json:"wallet_address"`
	Name          string    `json:"name"`
	ProfileImage  string    `json:"profile_image"`
	ChaintypeID  		uuid.UUID	   `gorm:"type:uuid" json:"chaintype_id"`
	CreatedAt     time.Time `gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt     time.Time `gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
