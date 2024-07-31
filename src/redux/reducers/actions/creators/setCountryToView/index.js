import { SET_COUNTRY_TO_VIEW } from "../../types";

const setCountryToView = (countryData, position) => {
    return {
      type: SET_COUNTRY_TO_VIEW,
      payload: { countryData, position }
    };
};

export {
    setCountryToView
};