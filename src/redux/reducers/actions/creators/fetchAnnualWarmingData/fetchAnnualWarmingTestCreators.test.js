import {
    fetchAnnualWarmingDataPending,
    fetchAnnualWarmingDataSuccess,
    fetchAnnualWarmingDataError
} from './index';

import {
    FETCH_ANNUAL_WARMING_DATA_PENDING,
    FETCH_ANNUAL_WARMING_DATA_SUCCESS,
    FETCH_ANNUAL_WARMING_DATA_ERROR
} from "../../types";

import mockProjectedAnnualWarmingData from '../../../../../__mocks__/mockProjectedWarmingData';

describe('fetchAnnualWarmingDataPending', () => {
    it('raises FETCH_ANNUAL_WARMING_DATA_PENDING event', () => {
        expect(fetchAnnualWarmingDataPending()).toEqual({ type: FETCH_ANNUAL_WARMING_DATA_PENDING });
    });
});

describe('fetchAnnualWarmingDataSuccess', () => {
    it('raises FETCH_ANNUAL_WARMING_DATA_SUCCESS event', () => {
        expect(fetchAnnualWarmingDataSuccess()).toEqual({ type: FETCH_ANNUAL_WARMING_DATA_SUCCESS });
    });

    it('raises FETCH_ANNUAL_WARMING_DATA_SUCCESS event with projected warming data as payload', () => {
        expect(fetchAnnualWarmingDataSuccess(mockProjectedAnnualWarmingData)).toEqual({ type: FETCH_ANNUAL_WARMING_DATA_SUCCESS, payload: mockProjectedAnnualWarmingData });
    });
});

describe('fetchAnnualWarmingDataError', () => {
    it('raises FETCH_ANNUAL_WARMING_DATA_ERROR event', () => {
        expect(fetchAnnualWarmingDataError()).toEqual({ type: FETCH_ANNUAL_WARMING_DATA_ERROR });
    });

    it('raises FETCH_ANNUAL_WARMING_DATA_ERROR event with error as payload', () => {
        const mockError = new Error('mock error');

        expect(fetchAnnualWarmingDataError(mockError)).toEqual({ type: FETCH_ANNUAL_WARMING_DATA_ERROR, payload: mockError });
    });
});
