package routes

import (
	"net/http"
	"uniswap-api-graphql/models"

	"github.com/gin-gonic/gin"
)

func NotFound(router *gin.Engine) {
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, models.ErrorResponse{Status: "error", Message: "Page not found"})
	})
}
