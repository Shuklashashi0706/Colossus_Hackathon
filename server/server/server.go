package server

import (
	"os"

	"app.myriadflow.com/controllers"
	"app.myriadflow.com/middleware"
	"github.com/gin-gonic/gin"
)

func Router() {
	router := gin.Default()
	if len(os.Getenv("GIN_MODE")) == 0 {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}

	// adding middleware server
	router.Use(middleware.CORSMiddleware())

	// health check
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	Routes(router)
	router.Run(":9090") // listen and serve on 0.0.0.0:808
}

func Routes(r *gin.Engine) {
	// User routes
	r.POST("/users", controllers.CreateUser)
	r.GET("/users/:id", controllers.GetUser)
	r.GET("/users/all", controllers.GetAllUsers)
	r.GET("/users/all/:chaintype_id", controllers.GetAllUsersByChainType)
	r.PUT("/users/:id", controllers.UpdateUser)
	r.DELETE("/users/:id", controllers.DeleteUser)

	// Brand routes
	r.POST("/brands", controllers.CreateBrand)
	r.GET("/brands/:id", controllers.GetBrand)
	r.GET("/brands/all/:chaintype_id", controllers.GetAllBrandsByChainType)
	r.GET("/brands/all", controllers.GetAllBrands)
	r.PUT("/brands/:id", controllers.UpdateBrand)
	r.DELETE("/brands/:id", controllers.DeleteBrand)
	r.GET("/brands/manager/:manager_id", controllers.GetBrandsByManager)


	// Collection routes
	r.POST("/collections", controllers.CreateCollection)
	r.GET("/collections/:id", controllers.GetCollection)
	r.GET("/collections/brand-id/:brandId", controllers.GetCollectionByBrandId)
	r.GET("/collections/all/:chaintype_id", controllers.GetAllCollectionsByChainType)
	r.GET("/collections/all", controllers.GetAllCollections)
	r.PUT("/collections/:id", controllers.UpdateCollection)
	r.PUT("/collections/brand-id/:brandId", controllers.UpdateCollectionByBrandId)
	r.DELETE("/collections/:id", controllers.DeleteCollection)

	// Phygital routes
	r.POST("/phygitals", controllers.CreatePhygital)
	r.GET("/phygitals/:id", controllers.GetPhygital)
	r.GET("/phygitals/all/:chaintype_id", controllers.GetAllPhygitalByChainType)
	r.GET("/phygitals/all", controllers.GetAllPhygital)
	r.PUT("/phygitals/:id", controllers.UpdatePhygital)
	r.DELETE("/phygitals/:id", controllers.DeletePhygital)

	// WebXR routes
	r.POST("/webxr", controllers.CreateWebXR)
	r.GET("/webxr/:id", controllers.GetWebXR)
	r.GET("/webxr/all/:chaintype_id", controllers.GetAllWebXRByChainType)
	r.GET("/webxr/all", controllers.GetAllWebXR)
	r.PUT("/webxr/:id", controllers.UpdateWebXR)
	r.DELETE("/webxr/:id", controllers.DeleteWebXR)
	r.GET("/webxr/phygital/:phygital_id", controllers.GetWebXRByPhygitalID)

	// Avatar routes
	r.POST("/avatars", controllers.CreateAvatar)
	r.GET("/avatars/:id", controllers.GetAvatar)
	r.GET("/avatars/all/:chaintype_id", controllers.GetAllAvatarsByChainType)
	r.GET("/avatars/all", controllers.GetAllAvatars)
	r.PUT("/avatars/:id", controllers.UpdateAvatar)
	r.DELETE("/avatars/:id", controllers.DeleteAvatar)
	r.GET("/avatars/phygital/:phygital_id", controllers.GetAvatarByPhygitalID)

	// Variant routes
	r.POST("/variants", controllers.CreateVariant)
	r.GET("/variants/:id", controllers.GetVariant)
	r.GET("/variants/all/:chaintype_id", controllers.GetAllVariantByChainType)
	r.GET("/variants/all", controllers.GetAllVariant)
	r.PUT("/variants/:id", controllers.UpdateVariant)
	r.DELETE("/variants/:id", controllers.DeleteVariant)

	//FanToken routes
	r.POST("/fantoken", controllers.CreateFanToken)
	r.GET("/fantoken/:id" , controllers.GetFanToken)
	r.GET("fantoken/all/:chaintype_id" , controllers.GetAllFanTokenByChainType)
	r.GET("fantoken/all" , controllers.GetAllFanToken)
	r.PUT("fantoken/:id" , controllers.UpdateFanToken)
	r.DELETE("fantoken/:id" , controllers.DeleteFanToken)

	//ChainType routes
	r.POST("/chains", controllers.CreateChain)
    r.GET("/chains/:id", controllers.GetChain)
    r.PUT("/chains/:id", controllers.UpdateChain)
    r.DELETE("/chains/:id", controllers.DeleteChain)
    r.GET("/chains", controllers.GetChains)

	// NftEntries routes
	r.POST("/nftentries", controllers.CreateNftEntries)
	r.GET("/nftentries/:id", controllers.GetNftEntriesById)
	r.GET("/nftentries/phygital/:phygital_id", controllers.GetNftEntriesByPhygitalID)
	r.GET("/nftentries/all/:chaintype_id", controllers.GetAllNftEntriesByChainType)
	r.GET("/nftentries/owner/:phygital_id/:copy_number", controllers.GetOwnerByPhygitalAndCopyNumber)
	r.PUT("/nftentries/:id", controllers.UpdateNftEntries)
	r.DELETE("/nftentries/:id", controllers.DeleteNftEntries)

	//Profile routes
	r.POST("/profiles", controllers.CreateProfile)
	r.GET("/profiles/:id", controllers.GetProfile)
	r.GET("/profiles/all", controllers.GetAllProfiles)
	r.GET("/profiles/all/:chaintype_id", controllers.GetAllProfilesByChainType)
	r.GET("/profiles/email/:walletAddress", controllers.GetEmailByWalletAddress)
	r.GET("/profiles/wallet/:walletAddress", controllers.GetProfileByWalletAddress)
	r.GET("/profiles/username/:username", controllers.GetProfileByUsername)
	r.PUT("/profiles/:walletAddress", controllers.UpdateProfile)
	r.DELETE("/profiles/:id", controllers.DeleteProfile)
	r.DELETE("/profiles/walletandemail/:walletAddress/:email", controllers.DeleteProfileByWalletAndEmail)

	// Cart routes
	r.POST("/cart", controllers.AddToCart)
	r.DELETE("/cart/:wallet_address/:phygital_id", controllers.RemoveFromCart)
	r.GET("/cart/:wallet_address", controllers.GetCartItems)

}


