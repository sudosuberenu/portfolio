package controllers

import (
	"fmt"
	"net/http"
	"uniswap-api-graphql/models"
	"uniswap-api-graphql/repositories"
)

func GetSwapsFromBlockNumber(blockNumber string) (models.SwapsResponse, error, int) {
	// number, _ := strconv.ParseInt(blockNumber, 10, 64)
	// querySwaps := fmt.Sprintf("{ transactions (where: { blockNumber: %s }) { swaps { id } } }", blockNumber)

	querySwaps := "{ transactions (where: { blockNumber: 14674542 }) { swaps { id AmountUSD} } }"

	var repositoryResponse models.TransactionsTheGraphResponse

	go repositories.Execute(querySwaps, &repositoryResponse)

	var swapResponse models.SwapsResponse

	fmt.Println(repositoryResponse)

	// for _, field := range repositoryResponse.Data.Transactions {
	// 	fmt.Println(field)
	// 	// amount, _ := strconv.ParseFloat(field.swaps, 32)
	// }

	// swapResponse := models.SwapsResponse{Swaps: swaps}

	return swapResponse, nil, http.StatusInternalServerError
}
