import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WarmingTable from './warmingTable';
import mockProjectedWarmingData from '../../__mocks__/mockProjectedWarmingData';
import { TEMPERATURE_RANGE } from '../../constants';

const { LOWER_PROJECTIONS, MEDIAN_PROJECTIONS, UPPER_PROJECTIONS } = TEMPERATURE_RANGE;

const mockClearCountryView = jest.fn();

const mockCountryView = {
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

const mockAllSelectedCountryView = {
    view0: mockProjectedWarmingData[0],
    view1: mockProjectedWarmingData[0],
    view2: mockProjectedWarmingData[0],
    view3: mockProjectedWarmingData[0],
    view4: mockProjectedWarmingData[0]
};

const mockProjectedAnnualWarmingData = mockProjectedWarmingData.filter(c => c.code !== 'GLO');
const mockProjectedGlobalWarmingData = mockProjectedWarmingData.filter(c => c.code === 'GLO');

const mockSetCountryToView = jest.fn();
const mockSetTemperatureRange = jest.fn();

describe('<WarmingTable />', () => {
    it('renders title and text', () => {
        const { getByText } = render(
            <WarmingTable 
                clearCountryView={mockClearCountryView}
                countryView={mockCountryView}
                projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                setCountryToView={mockSetCountryToView}
                temperatureRange={MEDIAN_PROJECTIONS}
                setTemperatureRange={mockSetTemperatureRange}
            />
        );

        expect(getByText('Future Warming')).toBeInTheDocument();
        expect(getByText('Select a country to see how much it is expected to warm up to the year 2100, with current climate policies in place.')).toBeInTheDocument();
    });

    describe('Global Median Warming', () => {
        it('renders global median warming with red text only when 1.5°C target is breached', () => {
            const { getByText } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={LOWER_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );

            const globalMedianTitle = getByText('Global Median Warming', { exact: false });
            const lowestMedianTemperature = getByText('1.49', { exact: false });
            const firstMedianRedTemperature = getByText('1.51', { exact: false });
            const highestMedianTemperature = getByText('2.8', { exact: false });

            expect(globalMedianTitle).toBeInTheDocument();

            expect(lowestMedianTemperature.textContent).toEqual('1.49°C');
            expect(firstMedianRedTemperature.textContent).toEqual('1.51°C');
            expect(highestMedianTemperature.textContent).toEqual('2.8°C');
    
            expect(lowestMedianTemperature).toHaveAttribute('class', 'median-cell');
            expect(firstMedianRedTemperature).toHaveAttribute('class', 'median-cell red-text');
            expect(highestMedianTemperature).toHaveAttribute('class', 'median-cell red-text');
        });
    });

    describe('Selecting countries to view warming data for', () => {
        it('renders a single country select on load', () => {
            const { getByTestId } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );
    
            expect(getByTestId('global-median-row'));
            expect(getByTestId('country1-row')).toBeVisible();
            expect(getByTestId('country2-row')).not.toBeVisible();
        });
    
        it('renders a second country select when the first country is selected', async () => {
            const { getByTestId } = render(
                <WarmingTable 
                    countryView={mockOneSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );
    
            expect(getByTestId('global-median-row'));
            expect(getByTestId('country1-row')).toBeVisible();
            expect(getByTestId('country2-row')).toBeVisible();
            expect(getByTestId('country3-row')).not.toBeVisible();
        });
    
        it('renders up to five country selects when all are set', () => {
            const { getByTestId, getAllByText } = render(
                <WarmingTable 
                    countryView={mockAllSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );
    
            expect(getByTestId('global-median-row'));

            expect(getAllByText('Afghanistan').length).toEqual(5);
            expect(getByTestId('country1-row')).toBeVisible();
            expect(getByTestId('country2-row')).toBeVisible();
            expect(getByTestId('country3-row')).toBeVisible();
            expect(getByTestId('country4-row')).toBeVisible();
            expect(getByTestId('country5-row')).toBeVisible();
        });
    
        it('sets a country to view', async () => {
            const { getByTestId, getAllByText } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );
    
            const countrySelect = getByTestId('country1');
            await waitFor(() => userEvent.selectOptions(countrySelect, getAllByText('Afghanistan')[0]));
            
            expect(mockSetCountryToView).toHaveBeenCalledTimes(1);
            expect(mockSetCountryToView).toHaveBeenCalledWith(mockProjectedWarmingData[0], 'view0');
        });

        it('calls clearCountryView', async () => {
            const { getByTestId, getAllByText } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );
    
            const clearCountryViewButton = getByTestId('clearCountryView-button');
            await waitFor(() => userEvent.click(clearCountryViewButton));
            
            expect(mockClearCountryView).toHaveBeenCalledTimes(1);
        });
    });

    describe('Selecting lower, median or upper temperature projections', () => {
        beforeEach(() => {
            jest.clearAllMocks();

            global.window.innerWidth = 720;
            global.window.dispatchEvent(new Event('resize'));
        });
          
        it('renders lower, median and upper projections buttons', () => {
            const { getByTestId } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );

            expect(getByTestId('lowerProjections-button')).toBeVisible();
            expect(getByTestId('medianProjections-button')).toBeVisible();
            expect(getByTestId('upperProjections-button')).toBeVisible();
        });

        it('renders correct data LOWER_PROJECTIONS', () => {
            const { getByText } = render(
                <WarmingTable 
                    countryView={mockOneSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={LOWER_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );


            const lowestTemperature = getByText('0.04', { exact: false });
            const highestTemperature = getByText('0.74', { exact: false });
            
            expect(lowestTemperature.textContent).toEqual('0.04°C');
            expect(highestTemperature.textContent).toEqual('0.74°C');
        });

        it('renders correct data for MEDIAN_PROJECTIONS', () => {
            const { getByText } = render(
                <WarmingTable 
                    countryView={mockOneSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );

            const lowestTemperature = getByText('0.41', { exact: false });
            const highestTemperature = getByText('1.53', { exact: false });
            
            expect(lowestTemperature.textContent).toEqual('0.41°C');
            expect(highestTemperature.textContent).toEqual('1.53°C');
        });

        it('renders correct data for UPPER_PROJECTIONS', () => {

            const { getByText } = render(
                <WarmingTable 
                    countryView={mockOneSelectedCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={UPPER_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );

            const lowestTemperature = getByText('0.83', { exact: false });
            const highestTemperature = getByText('3.78', { exact: false });
            
            expect(lowestTemperature.textContent).toEqual('0.83°C');
            expect(highestTemperature.textContent).toEqual('3.78°C');
        });

        it('set temperature range when Lower Warning Estimates are selected', async () => {
            const { getByTestId } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={LOWER_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );

            const lowerTemperatureButton = getByTestId('lowerProjections-button');

            await waitFor(() => lowerTemperatureButton.click());
    
            expect(mockSetTemperatureRange).toHaveBeenCalledTimes(1);
            expect(mockSetTemperatureRange).toHaveBeenCalledWith('lowerProjections');

            expect(getByTestId('lowerProjections-button')).toHaveAttribute('class', 'selected-button');
            expect(getByTestId('medianProjections-button')).toHaveAttribute('class', 'estimate-button');
            expect(getByTestId('upperProjections-button')).toHaveAttribute('class', 'estimate-button');
        });

        it('sets temperature range when Median Warning Estimates are selected', async () => {
            const { getByTestId } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={MEDIAN_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );

            const medianTemperatureButton = getByTestId('medianProjections-button');

            await waitFor(() => medianTemperatureButton.click());
    
            expect(mockSetTemperatureRange).toHaveBeenCalledTimes(1);
            expect(mockSetTemperatureRange).toHaveBeenCalledWith('medianProjections');

            expect(getByTestId('lowerProjections-button')).toHaveAttribute('class', 'estimate-button');
            expect(getByTestId('medianProjections-button')).toHaveAttribute('class', 'selected-button');
            expect(getByTestId('upperProjections-button')).toHaveAttribute('class', 'estimate-button');
        });

        it('sets temperature range when Median Warning Estimates are selected', async () => {
            const { getByTestId } = render(
                <WarmingTable 
                    clearCountryView={mockClearCountryView}
                    countryView={mockCountryView}
                    projectedAnnualWarmingData={mockProjectedAnnualWarmingData}
                    projectedGlobalWarmingData={mockProjectedGlobalWarmingData}
                    setCountryToView={mockSetCountryToView}
                    temperatureRange={UPPER_PROJECTIONS}
                    setTemperatureRange={mockSetTemperatureRange}
                />
            );

            const upperTemperatureButton = getByTestId('upperProjections-button');

            await waitFor(() => upperTemperatureButton.click());
    
            expect(mockSetTemperatureRange).toHaveBeenCalledTimes(1);
            expect(mockSetTemperatureRange).toHaveBeenCalledWith('upperProjections');

            expect(getByTestId('lowerProjections-button')).toHaveAttribute('class', 'estimate-button');
            expect(getByTestId('medianProjections-button')).toHaveAttribute('class', 'estimate-button');
            expect(getByTestId('upperProjections-button')).toHaveAttribute('class', 'selected-button');
        });
    });
});