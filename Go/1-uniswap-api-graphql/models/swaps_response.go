package models

type SwapsResponse struct {
	Swaps []struct {
		AmountUSD string `json:"amountUSD,omitempty"`
		Id        string `json:"id,omitempty"`
	} `json:"swaps"`
}
