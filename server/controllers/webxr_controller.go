package controllers

import (
	"net/http"

	"app.myriadflow.com/db"
	"app.myriadflow.com/models"
	"github.com/gin-gonic/gin"
)

func CreateWebXR(c *gin.Context) {
	var webxr models.WebXR
	if err := c.ShouldBindJSON(&webxr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Create(&webxr).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, webxr)
}

func GetWebXR(c *gin.Context) {
	id := c.Param("id")
	var webxr models.WebXR
	if err := db.DB.First(&webxr, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, webxr)
}

func GetWebXRByPhygitalID(c *gin.Context) {
	phygitalID := c.Param("phygital_id")
	var webxr models.WebXR
	if err := db.DB.First(&webxr, "phygital_id = ?", phygitalID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "WebXR not found"})
		return
	}

	c.JSON(http.StatusOK, webxr)
}

// get all webxr
func GetAllWebXRByChainType(c *gin.Context) {
	chaintypeId := c.Param("chaintype_id")
	var webxr []models.WebXR
	if err := db.DB.Where("chaintype_id = ? ",chaintypeId).Find(&webxr).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, webxr)
}

func GetAllWebXR(c *gin.Context) {
	var webxr []models.WebXR
	if err := db.DB.Find(&webxr).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, webxr)
}

func UpdateWebXR(c *gin.Context) {
	id := c.Param("id")
	var webxr models.WebXR
	if err := db.DB.First(&webxr, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "WebXR not found"})
		return
	}

	if err := c.ShouldBindJSON(&webxr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&webxr).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, webxr)
}

func DeleteWebXR(c *gin.Context) {
	id := c.Param("id")
	if err := db.DB.Delete(&models.WebXR{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "WebXR deleted successfully"})
}
