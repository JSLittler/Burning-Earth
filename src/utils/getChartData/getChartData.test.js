import getChartData from '.';
import mockProjectedWarmingData from '../../__mocks__/mockProjectedWarmingData';
import { TEMPERATURE_RANGE } from '../../constants';

const { LOWER_PROJECTIONS, MEDIAN_PROJECTIONS, UPPER_PROJECTIONS } = TEMPERATURE_RANGE;

const mockAfghanistanSelectedCountryView = {
    view0: mockProjectedWarmingData[0],
    view1: null,
    view2: null,
    view3: null,
    view4: null
};

const mockAllSelectedCountryView = {
    view0: mockProjectedWarmingData[0],
    view1: mockProjectedWarmingData[1],
    view2: mockProjectedWarmingData[0],
    view3: mockProjectedWarmingData[1],
    view4: mockProjectedWarmingData[1]
};

const globalTarget = 1.5;

const globalMedian2020 = 1.49;
const globalMedian2030 = 1.51;
const globalMedian2040 = 1.7;
const globalMedian2050 = 1.9;
const globalMedian2060 = 2.1;
const globalMedian2070 = 2.3;
const globalMedian2080 = 2.5;
const globalMedian2090 = 2.7;
const globalMedian2100 = 2.8;

const AFGMedian2020 = "0.96";
const AFGMedian2030 = "1.44";
const AFGMedian2040 = "1.76";
const AFGMedian2050 = "2.08";
const AFGMedian2060 = "2.44";
const AFGMedian2070 = "2.79";
const AFGMedian2080 = "3.14";
const AFGMedian2090 = "3.44";
const AFGMedian2100 = "3.61";

const AntMedian2020 =  "0.41";
const AntMedian2030 = "0.65";
const AntMedian2040 = "0.84";
const AntMedian2050 = "1.02";
const AntMedian2060 = "1.18";
const AntMedian2070 = "1.29";
const AntMedian2080 = "1.39";
const AntMedian2090 = "1.49";
const AntMedian2100 = "1.53";

const getRowLabels = (country) => [
    "Year",
    {"label": "1.5°C Target", "type": "number"},
    {"label": "Global Median", "type": "number"},
    {"label": country, "type": "number"}
];

describe('getChartData', () => {
    it('returns country, median and target data when one country is selected with LOWER_PROJECTIONS', () => {
        const expectedAfghanistanLowerData = [
            [
                ...getRowLabels('Afghanistan')
            ],
            ["2020", globalTarget, globalMedian2020, "0.59"],
            ["2030", globalTarget, globalMedian2030, "0.68"],
            ["2040", globalTarget, globalMedian2040, "0.97"],
            ["2050", globalTarget, globalMedian2050, "1.24"],
            ["2060", globalTarget, globalMedian2060, "1.38"],
            ["2070", globalTarget, globalMedian2070, "1.51"],
            ["2080", globalTarget, globalMedian2080, "1.64"],
            ["2090", globalTarget, globalMedian2090, "1.78"],
            ["2100", globalTarget, globalMedian2100, "1.94"]
        ];

        const chartData = getChartData({
            countryView: mockAfghanistanSelectedCountryView,
            projectedGlobalWarmingData: mockProjectedWarmingData,
            temperatureRange: LOWER_PROJECTIONS
        });

        expect(chartData).toEqual(expectedAfghanistanLowerData);
    });

    it('returns country, median and target data when one country is selected with MEDIAN_PROJECTIONS', () => {
        const expectedAfghanistanMedianData = [
            [
                ...getRowLabels('Afghanistan')
            ],
            ["2020", globalTarget, globalMedian2020, AFGMedian2020],
            ["2030", globalTarget, globalMedian2030, AFGMedian2030],
            ["2040", globalTarget, globalMedian2040, AFGMedian2040],
            ["2050", globalTarget, globalMedian2050, AFGMedian2050],
            ["2060", globalTarget, globalMedian2060, AFGMedian2060],
            ["2070", globalTarget, globalMedian2070, AFGMedian2070],
            ["2080", globalTarget, globalMedian2080, AFGMedian2080],
            ["2090", globalTarget, globalMedian2090, AFGMedian2090],
            ["2100", globalTarget, globalMedian2100, AFGMedian2100]
        ];

        const chartData = getChartData({
            countryView: mockAfghanistanSelectedCountryView,
            projectedGlobalWarmingData: mockProjectedWarmingData,
            temperatureRange: MEDIAN_PROJECTIONS
        });

        expect(chartData).toEqual(expectedAfghanistanMedianData);
    });

    it('returns country, median and target data when one country is selected with UPPER_PROJECTIONS', () => {
        const expectedAfghanistanUpperData = [
            [
                ...getRowLabels('Afghanistan')
            ],
            ["2020", globalTarget, globalMedian2020, "1.49"],
            ["2030", globalTarget, globalMedian2030, "2.15"],
            ["2040", globalTarget, globalMedian2040, "2.89"],
            ["2050", globalTarget, globalMedian2050, "3.58"],
            ["2060", globalTarget, globalMedian2060, "4.09"],
            ["2070", globalTarget, globalMedian2070, "4.56"],
            ["2080", globalTarget, globalMedian2080, "4.92"],
            ["2090", globalTarget, globalMedian2090, "5.34"],
            ["2100", globalTarget, globalMedian2100, "5.77"]
        ];

        const chartData = getChartData({
            countryView: mockAfghanistanSelectedCountryView,
            projectedGlobalWarmingData: mockProjectedWarmingData,
            temperatureRange: UPPER_PROJECTIONS
        });

        expect(chartData).toEqual(expectedAfghanistanUpperData);
    });

    it('returns data for up to than five countries', () => {
        const expectedAllCountrySelectedMedianData = [
            [
                ...getRowLabels('Afghanistan'), 
                {"label": "Antarctica", "type": "number"}, 
                {"label": "Afghanistan", "type": "number"}, 
                {"label": "Antarctica", "type": "number"}, 
                {"label": "Antarctica", "type": "number"}
            ],
            ["2020", globalTarget, globalMedian2020, AFGMedian2020, AntMedian2020, AFGMedian2020, AntMedian2020, AntMedian2020],
            ["2030", globalTarget, globalMedian2030, AFGMedian2030, AntMedian2030, AFGMedian2030, AntMedian2030, AntMedian2030],
            ["2040", globalTarget, globalMedian2040, AFGMedian2040, AntMedian2040, AFGMedian2040, AntMedian2040, AntMedian2040],
            ["2050", globalTarget, globalMedian2050, AFGMedian2050, AntMedian2050, AFGMedian2050, AntMedian2050, AntMedian2050],
            ["2060", globalTarget, globalMedian2060, AFGMedian2060, AntMedian2060, AFGMedian2060, AntMedian2060, AntMedian2060],
            ["2070", globalTarget, globalMedian2070, AFGMedian2070, AntMedian2070, AFGMedian2070, AntMedian2070, AntMedian2070],
            ["2080", globalTarget, globalMedian2080, AFGMedian2080, AntMedian2080, AFGMedian2080, AntMedian2080, AntMedian2080],
            ["2090", globalTarget, globalMedian2090, AFGMedian2090, AntMedian2090, AFGMedian2090, AntMedian2090, AntMedian2090],
            ["2100", globalTarget, globalMedian2100, AFGMedian2100, AntMedian2100, AFGMedian2100, AntMedian2100, AntMedian2100]
        ];

        const chartData = getChartData({
            countryView: mockAllSelectedCountryView,
            projectedGlobalWarmingData: mockProjectedWarmingData,
            temperatureRange: MEDIAN_PROJECTIONS
        });

        expect(chartData).toEqual(expectedAllCountrySelectedMedianData);
    });
});
