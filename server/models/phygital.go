package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Phygital struct {
	ID              uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Name            string         `json:"name"`
	BrandName       string         `json:"brand_name"`
	Category        datatypes.JSON `gorm:"type:jsonb" json:"category"`
	Tags        	datatypes.JSON `gorm:"type:jsonb" json:"tags"`
	Description     string         `json:"description"`
	Price 			*float64 	   `json:"price" gorm:"type:decimal(20,10);"`
	Quantity        int            `json:"quantity"`
	Royality        int            `json:"royality"`
	Image           string         `json:"image"`
	ProductInfo     string         `json:"product_info"`
	ProductUrl      string         `json:"product_url"`
	Color           string         `json:"color"`
	Size            string         `json:"size"`
	Weight          float64        `json:"weight" gorm:"type:decimal(20,10)"`
	Material        string         `json:"material"`
	Usage           string         `json:"usage"`
	Quality         string         `json:"quality"`
	Manufacturer    string         `json:"manufacturer"`
	OriginCountry   string         `json:"origin_country"`
	MetadataURI     string         `json:"metadata_uri"`
	DeployerAddress string         `json:"deployer_address"`
	ContractAddress string         `json:"contract_address"`
	GraphURL        string         `json:"graph_url"`
	CollectionID    uuid.UUID      `json:"collection_id"`
	ChaintypeID     uuid.UUID      `gorm:"type:uuid" json:"chaintype_id"`
	CreatedAt       time.Time      `gorm:"type:timestamp;default:current_timestamp" json:"created_at"`
	UpdatedAt       time.Time      `gorm:"type:timestamp;default:current_timestamp" json:"updated_at"`
}

func (p *Phygital) BeforeCreate(tx *gorm.DB) (err error) {
	p.ID = uuid.New()
	return
}
