import { RESET_COUNTRY_VIEW, SET_COUNTRY_TO_VIEW } from "../../types";

const resetCountryView = () => {
  return {
    type: RESET_COUNTRY_VIEW,
    payload: {}
  };
}

const setCountryToView = (countryData, position) => {
  return {
    type: SET_COUNTRY_TO_VIEW,
    payload: { countryData, position }
  };
};

export {
  resetCountryView,
  setCountryToView
};