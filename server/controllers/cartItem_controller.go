package controllers

import (
	"net/http"

	"app.myriadflow.com/db"
	"app.myriadflow.com/models"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func AddToCart(c *gin.Context) {
	var cartItem models.CartItem
	if err := c.ShouldBindJSON(&cartItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var existingItem models.CartItem
	if err := db.DB.Where("wallet_address = ? AND phygital_id = ?", cartItem.WalletAddress, cartItem.PhygitalID).First(&existingItem).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// If the item doesn't exist, create it
			if err := db.DB.Create(&cartItem).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {
		// If the item exists, update the quantity
		existingItem.Quantity += 1
		if err := db.DB.Save(&existingItem).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item added to cart or updated successfully"})
}

// RemoveFromCart removes an item from the cart
func RemoveFromCart(c *gin.Context) {
	walletAddress := c.Param("wallet_address")
	phygitalID := c.Param("phygital_id")

	if err := db.DB.Where("wallet_address = ? AND phygital_id = ?", walletAddress, phygitalID).Delete(&models.CartItem{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item removed from cart successfully"})
}

// GetCartItems retrieves all items in the cart for a specific wallet address
func GetCartItems(c *gin.Context) {
	walletAddress := c.Param("wallet_address")
	var cartItems []models.CartItem
	if err := db.DB.Where("wallet_address = ?", walletAddress).Find(&cartItems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cartItems)
}