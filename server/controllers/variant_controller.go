package controllers

import (
	"app.myriadflow.com/db"

	"net/http"

	"app.myriadflow.com/models"

	"github.com/gin-gonic/gin"
)

func CreateVariant(c *gin.Context) {
	var variant models.Variant
	if err := c.ShouldBindJSON(&variant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Create(&variant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, variant)
}

func GetVariant(c *gin.Context) {
	id := c.Param("id")
	var variant models.Variant
	if err := db.DB.First(&variant, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Variant not found"})
		return
	}

	c.JSON(http.StatusOK, variant)
}

// get all variant api
func GetAllVariantByChainType(c *gin.Context) {
	chaintypeId := c.Param("chaintype_id")
	var variants []models.Variant
	if err := db.DB.Where("chaintype_id = ? ", chaintypeId).Find(&variants).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, variants)
}

func GetAllVariant(c *gin.Context) {
	var variants []models.Variant
	if err := db.DB.Find(&variants).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, variants)
}

func UpdateVariant(c *gin.Context) {
	id := c.Param("id")
	var variant models.Variant
	if err := db.DB.First(&variant, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Variant not found"})
		return
	}

	if err := c.ShouldBindJSON(&variant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&variant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, variant)
}

func DeleteVariant(c *gin.Context) {
	id := c.Param("id")
	if err := db.DB.Delete(&models.Variant{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Variant deleted successfully"})
}
