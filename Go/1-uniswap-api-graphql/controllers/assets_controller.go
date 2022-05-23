package controllers

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"time"
	"uniswap-api-graphql/models"
	"uniswap-api-graphql/repositories"

	"golang.org/x/sync/errgroup"
)

func GetPoolsFromAssetId(id string) (models.PoolResponse, error, int) {
	queryToken0 := fmt.Sprintf("{ pools (where: { token0: %q }) { id } }", id)
	queryToken1 := fmt.Sprintf("{ pools (where: { token1: %q }) { id } }", id)

	var poolsToken0 models.PoolResponse
	var poolsToken1 models.PoolResponse

	var repositoryResponse0 models.PoolTheGraphResponse
	var repositoryResponse1 models.PoolTheGraphResponse

	g := new(errgroup.Group)
	g.Go(func() error {
		return repositories.Execute(queryToken0, &repositoryResponse0)
	})
	g.Go(func() error {
		return repositories.Execute(queryToken1, &repositoryResponse0)
	})
	err := g.Wait()

	if err != nil {
		return models.PoolResponse{}, err, http.StatusInternalServerError
	}

	// TODO! Move this mapping to a ResponseBuilder
	poolsToken0.Pools = repositoryResponse0.Data.Pools
	poolsToken1.Pools = repositoryResponse1.Data.Pools

	pools := append(poolsToken0.Pools, poolsToken1.Pools...)
	poolResponse := models.PoolResponse{Pools: pools}

	return poolResponse, err, http.StatusInternalServerError
}

func GetVolumeFromAssetIdWithRangeTime(id string, startAt string, endAt string) (models.SwapResponse, error, int) {
	errCheck, errStatus := checkParams(startAt, endAt)

	if errCheck != nil {
		return models.SwapResponse{}, errCheck, errStatus
	}

	queryToken0 := fmt.Sprintf("{ swaps (where: { token0: %q timestamp_gte: %s timestamp_lte: %s }) { amountUSD } }", id, startAt, endAt)
	queryToken1 := fmt.Sprintf("{ swaps (where: { token0: %q timestamp_gte: %s timestamp_lte: %s }) { amountUSD } }", id, startAt, endAt)

	var repositoryResponse0 models.SwapTheGraphResponse
	var repositoryResponse1 models.SwapTheGraphResponse

	g := new(errgroup.Group)
	g.Go(func() error {
		return repositories.Execute(queryToken0, &repositoryResponse0)
	})
	g.Go(func() error {
		return repositories.Execute(queryToken1, &repositoryResponse0)
	})
	err := g.Wait()

	if err != nil {
		return models.SwapResponse{}, err, errStatus
	}

	totalAmount := 0.0

	for _, field := range repositoryResponse0.Data.Swaps {
		amount, _ := strconv.ParseFloat(field.AmountUSD, 32)
		totalAmount += amount
	}

	for _, field := range repositoryResponse1.Data.Swaps {
		amount, _ := strconv.ParseFloat(field.AmountUSD, 32)
		totalAmount += amount
	}

	swapsResponse := models.SwapResponse{Amount: totalAmount, Currency: "USD"}

	return swapsResponse, err, errStatus
}

func checkParams(startAt string, endAt string) (error, int) {
	if startAt == "" {
		return errors.New("Start date is required"), http.StatusBadRequest
	}

	if endAt == "" {
		return errors.New("End date is required"), http.StatusBadRequest
	}

	start, err_start := strconv.ParseInt(startAt, 10, 64)
	end, err_end := strconv.ParseInt(endAt, 10, 64)

	if err_start != nil {
		return errors.New("Start date is not valid. Please modify it"), http.StatusBadRequest
	}

	if err_end != nil {
		return errors.New("End date is not valid. Please modify it"), http.StatusBadRequest
	}

	unix_start := time.Unix(start, 0)
	unix_end := time.Unix(end, 0)

	if unix_start.After(unix_end) {
		return errors.New("Start date is greater than End Date. Please modify it"), http.StatusBadRequest
	}

	return nil, 0
}
