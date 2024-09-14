package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Variant struct {
	ID          uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Variant     string    `json:"variant"`
	Description string    `json:"description"`
	PhygitalID  string    `json:"phygital_id"`
	ChaintypeID  		uuid.UUID	   `gorm:"type:uuid" json:"chaintype_id"`
	CreatedAt   time.Time `gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt   time.Time `gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}

func (v *Variant) BeforeCreate(tx *gorm.DB) (err error) {
	v.ID = uuid.New()
	return
}
