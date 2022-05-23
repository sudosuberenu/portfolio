package models

type PoolTheGraphResponse struct {
	Data struct {
		Pools []map[string]interface{} `json:"pools"`
	} `json:"data"`
}

type SwapTheGraphResponse struct {
	Data struct {
		SwapsResponse
	} `json:"data"`
}

type TransactionsTheGraphResponse struct {
	Data interface{} `json:"data"`
}
