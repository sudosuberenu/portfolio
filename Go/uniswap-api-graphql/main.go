package main

import (
	"uniswap-api-graphql/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	const port = ":8080"

	router := gin.Default()

	routes.AssetsRoute(router)
	routes.BlocksRoute(router)
	routes.NotFound(router)

	router.Run(port)
}
