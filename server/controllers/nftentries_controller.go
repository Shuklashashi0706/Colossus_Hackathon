package controllers

import (
	"app.myriadflow.com/db"

	"net/http"

	"app.myriadflow.com/models"

	"github.com/gin-gonic/gin"
)

func CreateNftEntries(c *gin.Context) {
	var nftentries models.NftEntries
	if err := c.ShouldBindJSON(&nftentries); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Create(&nftentries).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, nftentries)
}

func GetNftEntriesById(c *gin.Context) {
	id := c.Param("id")
	var nftentries models.NftEntries
	if err := db.DB.First(&nftentries, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "nftentries not found"})
		return
	}

	c.JSON(http.StatusOK, nftentries)
}

func GetNftEntriesByPhygitalID(c *gin.Context) {
	phygitalID := c.Param("phygital_id")
	var nftentries models.NftEntries
	if err := db.DB.First(&nftentries, "phygital_id = ?", phygitalID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "nftentries not found"})
		return
	}

	c.JSON(http.StatusOK, nftentries)
}

func GetAllNftEntriesByChainType(c *gin.Context) {
	chaintypeId := c.Param("chaintype_id")
	var nftentries []models.NftEntries
	if err := db.DB.Where("chaintype_id = ?" , chaintypeId).Find(&nftentries).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, nftentries)
}

func GetOwnerByPhygitalAndCopyNumber(c *gin.Context) {
	phygitalID := c.Param("phygital_id")
	copyNumber := c.Param("copy_number")

	var nftentries models.NftEntries
	if err := db.DB.First(&nftentries, "phygital_id = ? AND copy_number = ?", phygitalID, copyNumber).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Owner not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"wallet_address": nftentries.WalletAddress})
}


func UpdateNftEntries(c *gin.Context) {
	id := c.Param("id")
	var nftentries models.NftEntries
	if err := db.DB.First(&nftentries, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "nftentries not found"})
		return
	}

	if err := c.ShouldBindJSON(&nftentries); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&nftentries).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, nftentries)
}

func DeleteNftEntries(c *gin.Context) {
	id := c.Param("id")
	if err := db.DB.Delete(&models.NftEntries{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "nftentries deleted successfully"})
}