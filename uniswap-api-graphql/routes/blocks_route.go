package routes

import (
	"uniswap-api-graphql/handlers"

	"github.com/gin-gonic/gin"
)

// TODO!
func BlocksRoute(router *gin.Engine) {
	block := router.Group("/v1/blocks")
	block.GET("/:number/swaps", handlers.GetSwapsFromBlockNumber) // What swaps occurred during that specific block?
	// block.GET("/:number/assets", nil) // List all assets swapped during that specific block
}
