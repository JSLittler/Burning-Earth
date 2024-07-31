import rootReducer from "./rootReducer";
import {
    fetchAnnualWarmingDataError,
    fetchAnnualWarmingDataPending,
    fetchAnnualWarmingDataSuccess,
    setCountryToView,
    setTemperatureRange
} from './actions/creators';
import { TEMPERATURE_RANGE } from "../../constants";

import mockProjectedWarmingData from '../../__mocks__/mockProjectedWarmingData';
import mockProjectedAnnualWarmingData from "../../__mocks__/mockProjectedWarmingData";

describe('root reducer', () => {
    const initialState = {
        countryView: {
            view0: null,
            view1: null,
            view2: null,
            view3: null,
            view4: null
        },
        loading: 'false',
        projectedAnnualWarmingData: [],
        temperatureRange: 'medianProjections',
        error: ''
    };

    it('sets initial state on load', () => {
        expect(rootReducer()).toEqual(initialState);
    });

    it('sets loading to true when fetchAnnualWarmingDataPending action is dispatched', () => {
        const updatedState = {
            ...initialState,
            loading: true
        };

        expect(rootReducer(initialState, fetchAnnualWarmingDataPending())).toEqual(updatedState);
    });
    
    it('correctly sets projected warming data when fetchAnnualWarmingDataSuccess action is dispatched', () => {
        const updatedState = rootReducer(initialState, fetchAnnualWarmingDataSuccess(mockProjectedWarmingData));

        expect(updatedState.loading).toEqual(false);
        // should really map the data properly
        expect(updatedState.projectedGlobalWarmingData).toEqual(mockProjectedAnnualWarmingData.filter(c => c.code === 'GLO'));
        expect(updatedState.projectedAnnualWarmingData).toEqual(mockProjectedAnnualWarmingData.filter(c => c.code !== 'GLO'));
    });

    it('sets error when fetchAnnualWarmingDataError action is dispatched', () => {
        const mockError = new Error('mock error');
        const updatedState = {
            ...initialState,
            loading: false,
            error: mockError
        };

        expect(rootReducer(initialState, fetchAnnualWarmingDataError(mockError))).toEqual(updatedState);
    });

    it('sets correct countryView data when setCountryToView action is dispatched', () => {
        const country = mockProjectedAnnualWarmingData[0];
        const updatedState = {
            ...initialState,
            loading: false,
            countryView: {
                ...initialState.countryView,
                view0: country
            }
        };

        expect(rootReducer(initialState, setCountryToView(country, "view0"))).toEqual(updatedState);
    });

    it('sets correct multiple countries to view', () => {
        const country1 = mockProjectedAnnualWarmingData[0];
        const country2 = mockProjectedAnnualWarmingData[1];
        const country3 = mockProjectedAnnualWarmingData[2];
        const country4 = mockProjectedAnnualWarmingData[3];
        const country5 = mockProjectedAnnualWarmingData[4];

        const oneCountryViewState = rootReducer(initialState, setCountryToView(country1, "view0"));
        const twoCountryViewState = rootReducer(oneCountryViewState, setCountryToView(country2, "view1"));
        const threeCountryViewState = rootReducer(twoCountryViewState, setCountryToView(country3, "view2"));
        const fourCountryViewState = rootReducer(threeCountryViewState, setCountryToView(country4, "view3"));
        const fiveCountryViewState = rootReducer(fourCountryViewState, setCountryToView(country5, "view4"));

        expect(oneCountryViewState.countryView).toEqual({ "view0": country1, "view1": null, "view2": null, "view3": null, "view4": null });
        expect(twoCountryViewState.countryView).toEqual({ "view0": country1, "view1": country2, "view2": null, "view3": null, "view4": null });
        expect(threeCountryViewState.countryView).toEqual({ "view0": country1, "view1": country2, "view2": country3, "view3": null, "view4": null });
        expect(fourCountryViewState.countryView).toEqual({ "view0": country1, "view1": country2, "view2": country3, "view3": country4, "view4": null });
        expect(fiveCountryViewState.countryView).toEqual({ "view0": country1, "view1": country2, "view2": country3, "view3": country4, "view4": country5 });
    });

    it('sets updates countryView data when setCountryToView action is dispatched', () => {
        const country1 = mockProjectedAnnualWarmingData[0];
        const country2 = mockProjectedAnnualWarmingData[1];
        const state2 = {
            ...initialState,
            loading: false,
            countryView: {
                ...initialState.countryView,
                view0: country2
            }
        };

        const state1 = rootReducer(initialState, setCountryToView(country1, "view0"));
        
        expect(rootReducer(state1, setCountryToView(country2, "view0"))).toEqual(state2);
    });

    it.each([TEMPERATURE_RANGE.LOWER_PROJECTIONS, TEMPERATURE_RANGE.MEDIAN_PROJECTIONS, TEMPERATURE_RANGE.UPPER_PROJECTIONS])
    ('sets loading to true when fetchAnnualWarmingDataPending action is dispatched', (temp) => {
        const updatedState = {
            ...initialState,
            loading: false,
            temperatureRange: temp
        };

        expect(rootReducer(initialState, setTemperatureRange(temp))).toEqual(updatedState);
    });
});