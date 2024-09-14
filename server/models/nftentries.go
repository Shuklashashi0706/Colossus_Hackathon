package models

import(
"time"
"github.com/google/uuid"
)

type NftEntries struct {
    ID          	uuid.UUID       `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
    PhygitalID      string          `json:"phygital_id"`
    CopyNumber   int				`json:"copy_number"`
    WalletAddress string    		`json:"wallet_address"`
    ChaintypeID  		uuid.UUID	   `gorm:"type:uuid" json:"chaintype_id"`
    CreatedAt     time.Time 		`gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
    UpdatedAt   time.Time      `gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}