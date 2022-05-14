package models

type PoolTheGraphResponse struct {
	Data struct {
		Pools []map[string]interface{} `json:"pools"`
	} `json:"data"`
}

type SwapTheGraphResponse struct {
	Data struct {
		Swaps []struct {
			AmountUSD string `json:"amountUSD"`
		} `json:"swaps"`
	} `json:"data"`
}
