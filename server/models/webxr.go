package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type WebXR struct {
	ID                 uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Image360           string         `json:"image360"`
	Video360           string         `json:"video360"`
	RewardsMetadataURI string         `json:"rewards_metadata_uri"`
	Customizations     datatypes.JSON `gorm:"type:jsonb" json:"customizations"`
	FreeNFTImage       string         `json:"free_nft_image"`
	GoldReward         string         `json:"gold_reward"`
	SilverReward       string         `json:"silver_reward"`
	BronzeReward       string         `json:"bronze_reward"`
	PhygitalID         string         `json:"phygital_id"`
	ChaintypeID  		uuid.UUID	   `gorm:"type:uuid" json:"chaintype_id"`
	CreatedAt          time.Time      `gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt          time.Time      `gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}

func (w *WebXR) BeforeCreate(tx *gorm.DB) (err error) {
	w.ID = uuid.New()
	return
}
