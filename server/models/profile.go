package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Profile struct {
	ID            uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Name          string    `json:"name"`
	Email         string    `json:"email"`
	WalletAddress string    `json:"wallet_address"`
	CoverImage    string    `json:"cover_image"`
	ProfileImage  string    `json:"profile_image"`
	Username      string    `json:"username"`
	Bio           string    `json:"bio"`
	Website       string    `json:"website"`
	X             string    `json:"x"`
	Instagram     string    `json:"instagram"`
	ChaintypeID   uuid.UUID	   `gorm:"type:uuid" json:"chaintype_id"`
	CreatedAt     time.Time `gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt     time.Time `gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}

func (p *Profile) BeforeCreate(tx *gorm.DB) (err error) {
	p.ID = uuid.New()
	return
}
