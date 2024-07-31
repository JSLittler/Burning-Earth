import { setTemperatureRange } from ".";
import { SET_TEMPERATURE_RANGE } from "../../types";
import { TEMPERATURE_RANGE } from "../../../../../constants";

describe('setTemperatureRange', () => {
    it('raises SET_TEMPERATURE_RANGE event', () => {
        expect(setTemperatureRange()).toEqual({ type: SET_TEMPERATURE_RANGE });
    });

    it('raises SET_TEMPERATURE_RANGE event with specified temperature range as payload', () => {
        const { UPPER_PROJECTIONS } = TEMPERATURE_RANGE;

        expect(setTemperatureRange(UPPER_PROJECTIONS)).toEqual({ type: SET_TEMPERATURE_RANGE, payload: UPPER_PROJECTIONS });
    });
});