import { SET_TEMPERATURE_RANGE } from "../../types";

const setTemperatureRange = (range) => {
    return {
      type: SET_TEMPERATURE_RANGE,
      payload: range
    };
};

export {
    setTemperatureRange
};