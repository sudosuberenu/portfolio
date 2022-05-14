package repositories

import (
	"bytes"
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"uniswap-api-graphql/models"
)

func getRepositoryUrl() string {
	return "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-alt"
}

func buildRequest(requestParams models.RequestParams) bytes.Buffer {
	var requestBody bytes.Buffer

	if error := json.NewEncoder(&requestBody).Encode(requestParams); error != nil {
		panic(error)
	}

	return requestBody
}

func Execute(query string, response interface{}) error {
	var requestParams = models.RequestParams{Query: query}
	var request bytes.Buffer = buildRequest(requestParams)

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodPost, getRepositoryUrl(), &request)

	if err != nil {
		log.Printf("[ERROR] Request object failted. %+v", err)
		return errors.New("Unable to reach data")
	}

	res, err := client.Do(req)

	if err != nil {
		log.Printf("[ERROR] Request object failted. %+v", err)
		return errors.New("Unable to reach data")
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		log.Printf("[ERROR] Read body response failed. %+v", err)
		return errors.New("Unable to reach data")
	}

	json.Unmarshal([]byte(body), &response)

	return nil
}
