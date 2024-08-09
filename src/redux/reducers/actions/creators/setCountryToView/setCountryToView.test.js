import { RESET_COUNTRY_VIEW, SET_COUNTRY_TO_VIEW } from "../../types";
import { resetCountryView, setCountryToView } from "./";
import mockProjectedAnnualWarmingData from '../../../../../__mocks__/mockProjectedWarmingData';

describe('setCountryToView', () => {
    it('raises RESET_COUNTRY_VIEW event', () => {
        expect(resetCountryView().type).toEqual(RESET_COUNTRY_VIEW);
    });

    it('raises SET_COUNTRY_TO_VIEW event', () => {
        expect(setCountryToView({}, 0).type).toEqual(SET_COUNTRY_TO_VIEW);
    });

    it('raises SET_COUNTRY_TO_VIEW event with country data and specified position', () => {
        const countryData = mockProjectedAnnualWarmingData[0];
        const position = 1;

        expect(setCountryToView(countryData, position).payload).toEqual({ countryData, position });
    });
});
