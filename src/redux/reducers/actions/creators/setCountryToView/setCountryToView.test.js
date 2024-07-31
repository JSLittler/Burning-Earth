import { SET_COUNTRY_TO_VIEW } from "../../types";
import { setCountryToView } from "./";
import mockProjectedAnnualWarmingData from '../../../../../__mocks__/mockProjectedWarmingData';

describe('setCountryToView', () => {
    it('raises SET_COUNTRY_TO_VIEW event', () => {
        expect(setCountryToView({}, 0).type).toEqual(SET_COUNTRY_TO_VIEW);
    });

    it('raises SET_COUNTRY_TO_VIEW event with country data and specified position', () => {
        const countryData = mockProjectedAnnualWarmingData[0];
        const position = 1;

        expect(setCountryToView(countryData, position).payload).toEqual({ countryData, position });
    });
});
