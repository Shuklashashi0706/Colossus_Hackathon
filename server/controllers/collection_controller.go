package controllers

import (
	"net/http"

	"app.myriadflow.com/db"
	"app.myriadflow.com/models"
	"github.com/gin-gonic/gin"
)

func CreateCollection(c *gin.Context) {
	var collection models.Collection
	if err := c.ShouldBindJSON(&collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Create(&collection).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, collection)
}

func GetCollection(c *gin.Context) {
	id := c.Param("id")
	var collection models.Collection
	if err := db.DB.First(&collection, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Collection not found"})
		return
	}
	c.JSON(http.StatusOK, collection)
}

func GetCollectionByBrandId(c *gin.Context) {
	brand_id := c.Param("brandId")
	var collection models.Collection
	if err := db.DB.First(&collection, "brand_id = ?", brand_id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Collection not found"})
		return
	}
	c.JSON(http.StatusOK, collection)
}

// get all connection api
func GetAllCollectionsByChainType(c *gin.Context) {
	chaintypeId := c.Param("chaintype_id")
	var collections []models.Collection
	if err := db.DB.Where("chaintype_id = ?", chaintypeId).Find(&collections).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, collections)
}

func GetAllCollections(c *gin.Context) {
	var collections []models.Collection
	if err := db.DB.Find(&collections).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, collections)
}

func UpdateCollection(c *gin.Context) {
	id := c.Param("id")
	var collection models.Collection
	if err := db.DB.First(&collection, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Collection not found"})
		return
	}

	if err := c.ShouldBindJSON(&collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&collection).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, collection)
}

func UpdateCollectionByBrandId(c *gin.Context) {
	id := c.Param("brandId")
	var collection models.Collection
	if err := db.DB.First(&collection, "brand_id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Collection not found"})
		return
	}

	var input models.Collection

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Model(&collection).Updates(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, collection)
}

func DeleteCollection(c *gin.Context) {
	id := c.Param("id")
	if err := db.DB.Delete(&models.Collection{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Collection deleted successfully"})
}
