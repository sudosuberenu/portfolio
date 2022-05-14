package models

type SwapResponse struct {
	Amount   float64 `json:"amount"`
	Currency string  `json:"currency"`
}
