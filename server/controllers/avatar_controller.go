package controllers

import (
	"app.myriadflow.com/db"

	"net/http"

	"app.myriadflow.com/models"

	"github.com/gin-gonic/gin"
)

func CreateAvatar(c *gin.Context) {
	var avatar models.Avatar
	if err := c.ShouldBindJSON(&avatar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Create(&avatar).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, avatar)
}

func GetAvatar(c *gin.Context) {
	id := c.Param("id")
	var avatar models.Avatar
	if err := db.DB.First(&avatar, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Avatar not found"})
		return
	}

	c.JSON(http.StatusOK, avatar)
}

func GetAvatarByPhygitalID(c *gin.Context) {
	phygitalID := c.Param("phygital_id")
	var avatar models.Avatar
	if err := db.DB.First(&avatar, "phygital_id = ?", phygitalID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Avatar not found"})
		return
	}

	c.JSON(http.StatusOK, avatar)
}


// get all avatars api
func GetAllAvatarsByChainType(c *gin.Context) {
	chaintypeId := c.Param("chaintype_id")
	var avatars []models.Avatar
	if err := db.DB.Where("chaintype_id = ?" , chaintypeId).Find(&avatars).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, avatars)
}

func GetAllAvatars(c *gin.Context) {
	var avatars []models.Avatar
	if err := db.DB.Find(&avatars).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, avatars)
}

func UpdateAvatar(c *gin.Context) {
	id := c.Param("id")
	var avatar models.Avatar
	if err := db.DB.First(&avatar, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Avatar not found"})
		return
	}

	if err := c.ShouldBindJSON(&avatar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&avatar).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, avatar)
}

func DeleteAvatar(c *gin.Context) {
	id := c.Param("id")
	if err := db.DB.Delete(&models.Avatar{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Avatar deleted successfully"})
}
