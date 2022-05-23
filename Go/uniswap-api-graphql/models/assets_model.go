package models

type Assets struct {
	Pools []struct {
		Id string `json:"id"`
	} `json:"pools"`
}
