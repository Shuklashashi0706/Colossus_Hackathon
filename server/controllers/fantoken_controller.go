package controllers

import(
	"net/http"

	"app.myriadflow.com/db"
	"app.myriadflow.com/models"
	"github.com/gin-gonic/gin"
)

func CreateFanToken(c *gin.Context) {
	var fantoken models.FanToken
	if err := c.ShouldBindJSON(&fantoken); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Create(&fantoken).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, fantoken)
}

func GetFanToken(c *gin.Context) {
	id := c.Param("id")
	var fantoken models.FanToken
	if err := db.DB.First(&fantoken, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FanToken not found"})
		return
	}

	c.JSON(http.StatusOK, fantoken)
}

func GetAllFanTokenByChainType(c *gin.Context) {
	chaintypeId := c.Param("chaintype_id")
	var fantoken []models.FanToken
	if err := db.DB.Where("chaintype_id = ?",chaintypeId).Find(&fantoken).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, fantoken)
}

func GetAllFanToken(c *gin.Context) {
	var fantoken []models.FanToken
	if err := db.DB.Find(&fantoken).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, fantoken)
}

func UpdateFanToken(c *gin.Context) {
	id := c.Param("id")
	var fantoken models.FanToken
	if err := db.DB.First(&fantoken, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FanToken not found"})
		return
	}

	if err := c.ShouldBindJSON(&fantoken); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&fantoken).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, fantoken)
}

func DeleteFanToken(c *gin.Context) {
	id := c.Param("id")
	if err := db.DB.Delete(&models.FanToken{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "FanToken deleted successfully"})
}