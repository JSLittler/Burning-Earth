import {
  FETCH_ANNUAL_WARMING_DATA_PENDING,
  FETCH_ANNUAL_WARMING_DATA_SUCCESS,
  FETCH_ANNUAL_WARMING_DATA_ERROR
} from "../../types";

const fetchAnnualWarmingDataPending = () => {
  return {
    type: FETCH_ANNUAL_WARMING_DATA_PENDING
  };
};

const fetchAnnualWarmingDataSuccess = (data) => {
  return {
    type: FETCH_ANNUAL_WARMING_DATA_SUCCESS,
    payload: data
  };
};

const fetchAnnualWarmingDataError = (error) => {
  return {
    type: FETCH_ANNUAL_WARMING_DATA_ERROR,
    payload: error
  };
};

export {
  fetchAnnualWarmingDataPending,
  fetchAnnualWarmingDataSuccess,
  fetchAnnualWarmingDataError
};
