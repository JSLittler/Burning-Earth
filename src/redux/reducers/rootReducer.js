import {
    FETCH_ANNUAL_WARMING_DATA_PENDING,
    FETCH_ANNUAL_WARMING_DATA_SUCCESS,
    FETCH_ANNUAL_WARMING_DATA_ERROR,
    RESET_COUNTRY_VIEW,
    SET_COUNTRY_TO_VIEW,
    SET_TEMPERATURE_RANGE
} from './actions/types';

const initialCountryView = {
    view0: null,
    view1: null,
    view2: null,
    view3: null,
    view4: null
};

const initialState = {
    countryView: initialCountryView,
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
        case RESET_COUNTRY_VIEW:
            return {
                ...state,
                loading: false,
                countryView: initialCountryView
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
