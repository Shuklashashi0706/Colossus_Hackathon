package models

import "github.com/google/uuid"

type ChainType struct{
	ID          	uuid.UUID       `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	ChainID			int  			`json:"chain_id"`
	ChainName		string  		`json:"chain_name"`
}