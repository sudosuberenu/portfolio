package models

type SuccessResponse struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

type FailResponse struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

type ErrorResponse struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Code    string      `json:"code,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}
