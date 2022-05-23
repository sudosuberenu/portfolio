package models

type SwapResponse struct {
	Amount   float64 `json:"amount,omitempty"`
	Currency string  `json:"currency,omitempty"`
}
