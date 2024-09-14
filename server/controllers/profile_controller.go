package controllers

import (
	"app.myriadflow.com/db"
	"app.myriadflow.com/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// CreateProfile creates a new profile
func CreateProfile(c *gin.Context) {
	var profile models.Profile
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Create(&profile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, profile)
}

// GetProfile retrieves a profile by ID
func GetProfile(c *gin.Context) {
	id := c.Param("id")
	var profile models.Profile
	if err := db.DB.First(&profile, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, profile)
}

// GetAllProfiles retrieves all profiles
func GetAllProfiles(c *gin.Context) {
	var profiles []models.Profile
	if err := db.DB.Find(&profiles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, profiles)
}

// GetAllProfilesByChainType retrieves all profiles by ChaintypeID
func GetAllProfilesByChainType(c *gin.Context) {
	chaintypeId := c.Param("chaintype_id")
	var profiles []models.Profile
	if err := db.DB.Where("chaintype_id = ?", chaintypeId).Find(&profiles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, profiles)
}

// UpdateProfile updates a profile by walletAddress
func UpdateProfile(c *gin.Context) {
	walletAddress := c.Param("walletAddress")
	var profile models.Profile
	if err := db.DB.First(&profile, "wallet_address = ?", walletAddress).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&profile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, profile)
}

// DeleteProfile deletes a profile by ID
func DeleteProfile(c *gin.Context) {
	id := c.Param("id")
	if err := db.DB.Delete(&models.Profile{}, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile deleted"})
}

func DeleteProfileByWalletAndEmail(c *gin.Context) {
	walletAddress := c.Param("walletAddress")
	email := c.Param("email")

	// Check if both walletAddress and email are provided
	if walletAddress == "" || email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wallet address and email are required"})
		return
	}

	// Attempt to delete the profile based on walletAddress and email
	if err := db.DB.Where("wallet_address = ? AND email = ?", walletAddress, email).Delete(&models.Profile{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile deleted successfully"})
}

func GetEmailByWalletAddress(c *gin.Context) {
	walletAddress := c.Param("walletAddress")
	var profile models.Profile
	if err := db.DB.Select("email").Where("wallet_address = ?", walletAddress).First(&profile).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"email": profile.Email})
}

func GetProfileByWalletAddress(c *gin.Context) {
	walletAddress := c.Param("walletAddress")
	var profile models.Profile
	if err := db.DB.Where("wallet_address = ?", walletAddress).First(&profile).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, profile)
}

func GetProfileByUsername(c *gin.Context) {
	Username := c.Param("username")
	var profile models.Profile
	if err := db.DB.Where("username = ?", Username).First(&profile).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, profile)
}
