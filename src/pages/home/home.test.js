import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import HomePage from './home';
import mockProjectedWarmingData from '../../__mocks__/mockProjectedWarmingData';
import { TEMPERATURE_RANGE } from '../../constants';

const { LOWER_PROJECTIONS, MEDIAN_PROJECTIONS, UPPER_PROJECTIONS } = TEMPERATURE_RANGE;

const mockNoneSelectedCountryView = {
    view0: null,
    view1: null,
    view2: null,
    view3: null,
    view4: null
};

const mockOneSelectedCountryView = {
    view0: mockProjectedWarmingData[1],
    view1: null,
    view2: null,
    view3: null,
    view4: null
};

const mockProjectedAnnualWarmingData = mockProjectedWarmingData.filter(c => c.code !== 'GLO');
const mockProjectedGlobalWarmingData = mockProjectedWarmingData.filter(c => c.code === 'GLO');

const mockSetCountryToView = jest.fn();
const mockSetTemperatureRange = jest.fn();

describe('<homePage />', () => {
    it('renders page, large warming table, chart and source', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <HomePage
                    countryView={mockOneSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setCountryToView={mockSetCountryToView}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            </BrowserRouter>
        );

        expect(getByTestId('page')).toBeInTheDocument();
        expect(getByTestId('warmingTable-large')).toBeInTheDocument();
        expect(getByTestId('warmingChart')).toBeInTheDocument();
        expect(getByTestId('source')).toBeInTheDocument();
    });

    it('renders page, small warming table, chart and source', () => {
        global.window.innerWidth = '719';
        global.window.dispatchEvent(new Event('resize'));
        
        const { getByTestId } = render(
            <BrowserRouter>
                <HomePage
                    countryView={mockOneSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setCountryToView={mockSetCountryToView}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            </BrowserRouter>
        );

        expect(getByTestId('page')).toBeInTheDocument();
        expect(getByTestId('warmingTable-small')).toBeInTheDocument();
        expect(getByTestId('warmingChart')).toBeInTheDocument();
        expect(getByTestId('source')).toBeInTheDocument();
    });

    it('does not renders chart when no country is selected', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <HomePage
                    countryView={mockNoneSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setCountryToView={mockSetCountryToView}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            </BrowserRouter>
        );

        expect(queryByTestId('warmingChart')).not.toBeInTheDocument();
    });
});
