package handlers

import (
	"net/http"
	"uniswap-api-graphql/controllers"
	"uniswap-api-graphql/models"

	"github.com/gin-gonic/gin"
)

func GetPoolsFromAssetId(c *gin.Context) {
	assetId := c.Param("id")

	pools, error := controllers.GetPoolsFromAssetId(assetId)

	if error != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Status: "error", Message: error.Error()})
		return
	}

	c.JSON(http.StatusOK, models.SuccessResponse{Status: "success", Data: pools})
}

func GetVolumeFromAssetIdWithRangeTime(c *gin.Context) {
	assetId := c.Param("id")
	startAt, _ := c.GetQuery("startAt")
	endAt, _ := c.GetQuery("endAt")

	volume, error := controllers.GetVolumeFromAssetIdWithRangeTime(assetId, startAt, endAt)

	if error != nil {
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{Status: "error", Message: error.Error()})
		return
	}
	c.JSON(http.StatusOK, models.SuccessResponse{Status: "success", Data: volume})
}
