package controllers

import (
	"net/http"

	"app.myriadflow.com/db"
	"app.myriadflow.com/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateChain(c *gin.Context) {
	var chain models.ChainType
	if err := c.ShouldBindJSON(&chain); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	chain.ID = uuid.New()
	db.DB.Create(&chain)
	c.JSON(http.StatusOK, chain)
}

func GetChain(c *gin.Context) {
	var chain models.ChainType
	if err := db.DB.Where("chain_id = ?", c.Param("chain_id")).First(&chain).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, chain)
}

func UpdateChain(c *gin.Context) {
	var chain models.ChainType
	if err := db.DB.Where("id = ?", c.Param("id")).First(&chain).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	if err := c.ShouldBindJSON(&chain); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Save(&chain)
	c.JSON(http.StatusOK, chain)
}

func DeleteChain(c *gin.Context) {
	var chain models.ChainType
	if err := db.DB.Where("id = ?", c.Param("id")).First(&chain).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	db.DB.Delete(&chain)
	c.JSON(http.StatusOK, gin.H{"message": "Record deleted"})
}

func GetChains(c *gin.Context) {
	var chains []models.ChainType
	db.DB.Find(&chains)
	c.JSON(http.StatusOK, chains)
}
