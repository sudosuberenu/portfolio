package routes

import (
	"uniswap-api-graphql/handlers"

	"github.com/gin-gonic/gin"
)

func AssetsRoute(router *gin.Engine) {
	assets := router.Group("/v1/assets")
	assets.GET("/:id/pools", handlers.GetPoolsFromAssetId)
	assets.GET("/:id/volume", handlers.GetVolumeFromAssetIdWithRangeTime)
}
