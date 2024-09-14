package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Collection struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	LogoImage   string         `json:"logo_image"`
	CoverImage  string         `json:"cover_image"`
	Category    datatypes.JSON `gorm:"type:jsonb" json:"category"`
	Tags        string         `json:"tags"`
	Status      int            `json:"status"`
	BrandID     string         `json:"brand_id"`
	ChaintypeID  		uuid.UUID	   `gorm:"type:uuid" json:"chaintype_id"`
	CreatedAt   time.Time      `gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}

func (c *Collection) BeforeCreate(tx *gorm.DB) (err error) {
	c.ID = uuid.New()
	return
}
