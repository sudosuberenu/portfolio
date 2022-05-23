package models

type PoolResponse struct {
	Pools []map[string]interface{} `json:"pools"`
}
