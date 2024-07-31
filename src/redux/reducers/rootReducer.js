import {
    FETCH_ANNUAL_WARMING_DATA_PENDING,
    FETCH_ANNUAL_WARMING_DATA_SUCCESS,
    FETCH_ANNUAL_WARMING_DATA_ERROR,
    SET_COUNTRY_TO_VIEW,
    SET_TEMPERATURE_RANGE
} from './actions/types';

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
  
const rootReducer = (state = initialState, action) => {
    switch(action?.type) {
        case FETCH_ANNUAL_WARMING_DATA_PENDING:
            return {
                ...state,
                loading: true
            }
        case FETCH_ANNUAL_WARMING_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                projectedAnnualWarmingData: action.payload.filter(c => c.code !== 'GLO'),
                projectedGlobalWarmingData: action.payload.filter(c => c.code === 'GLO')
            }
        case FETCH_ANNUAL_WARMING_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_COUNTRY_TO_VIEW:
            return {
                ...state,
                loading: false,
                countryView: {
                    ...state.countryView,
                    [action.payload.position]: action.payload.countryData
                }
            }
        case SET_TEMPERATURE_RANGE:
            return {
                ...state,
                loading: false,
                temperatureRange: action.payload
            }
        default:
            return state
    };
};
  
export default rootReducer;
