package handlers

import (
	"net/http"
	"uniswap-api-graphql/controllers"
	"uniswap-api-graphql/models"

	"github.com/gin-gonic/gin"
)

func GetSwapsFromBlockNumber(c *gin.Context) {
	blockNumber := c.Param("number")

	swaps, error, errorStatusCode := controllers.GetSwapsFromBlockNumber(blockNumber)

	if error != nil {
		c.JSON(errorStatusCode, models.ErrorResponse{Status: "error", Message: error.Error()})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{Status: "success", Data: swaps})
}
