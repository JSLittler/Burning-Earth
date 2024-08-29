import React, { useState } from 'react';

import { POSITIONAL_TERMS, YEARS_TO_DISPLAY } from '../../constants';

import './styles.module.scss';

const WarmingTable = ({
    clearCountryView,
    countryView,
    projectedAnnualWarmingData,
    projectedGlobalWarmingData = [],
    isSmallScreen,
    setCountryToView,
    temperatureRange,
    setTemperatureRange
}) => {
    const isTableDataReady = projectedGlobalWarmingData?.length && countryView?.view0;

    const clearCountries = () => {
        const firstCountry = document.getElementById('country1');
    
        if(firstCountry) {
          firstCountry.value = "";
        }
    
        clearCountryView();
    };

    const setCountryData = (event) => {
        const { target: { value }} = event;
        const [ countryCode, position ] = value.split('-');
        const [ country ] = projectedAnnualWarmingData.filter(c => c.code === countryCode);

        if (!country || !position) {
            return
        }

        return setCountryToView(country, position);
    };

    const getYearGlobalMedian = (year) => {
        if (!projectedGlobalWarmingData.length) {
            return '-';
        }

        const [globalData] = projectedGlobalWarmingData;
        const { medianProjections } = globalData;
        const [warmingObject] = medianProjections?.filter((yearData) => year in yearData);
        const [warmingValue] = Object.values(warmingObject);
    
        return `${warmingValue}`;
    };

    const getYearWarmingValue = (position, year) => {
        const countryData = countryView[`view${position}`];

        if (!countryData) {
            return '-';
        }

        const [warmingObject] = countryData[temperatureRange].filter((yearData) => year in yearData);
        const [warmingValue] = Object.values(warmingObject);
    
        return `${warmingValue}`;
    };

    const getDefaultView = (index) => countryView[`view${index}`] ? `${countryView[`view${index}`].code}-view${index}` : '';
    const getWarmingTableCells = (index) => isSmallScreen ? '' : YEARS_TO_DISPLAY.map((y) => <td key={`view${index - 1}-${y}`} className={getYearWarmingValue(index - 1, y) > 1.5 ? 'red-text' : ''}>{getYearWarmingValue(index - 1, y)}<span>&deg;C</span></td>)

    const getTableRow = (index) => (
        <tr data-testid={`country${index}-row`}>
            <td>
                <select id={`country${index}`} data-testid={`country${index}`} name={`country${index}`} defaultValue={getDefaultView(index - 1)} onChange={e => setCountryData(e)} className='select'>
                    <option value="" disabled hidden>Select Country</option>
                    {projectedAnnualWarmingData?.map((c, i) => {
                        return <option key={i} value={`${c.code}-view${index - 1}`}>{c.name}</option>
                    })}
                </select>
                <br></br>
                <label htmlFor={`country${index}`}>Select {POSITIONAL_TERMS[index]} country to compare</label>
            </td>
            {getWarmingTableCells(index)}
        </tr>
    );

    const tableHead = (
        <thead className="no-background">
            <tr>
                <th colSpan="10">
                    <h2 className="text-size">Future Warming</h2>
                    <p className="text-size">
                        Select a country to see how much it is expected to warm up to the year 2100, with current climate policies in place.
                    </p>
                    <div className="range-container">
                        <button data-testid="lowerProjections-button" className={temperatureRange === "lowerProjections" ? "selected-button" : "estimate-button"} onClick={() => setTemperatureRange('lowerProjections')}><strong>lower</strong> warming estimates</button>
                        <button data-testid="medianProjections-button" className={temperatureRange === "medianProjections" ? "selected-button" : "estimate-button"} onClick={() => setTemperatureRange('medianProjections')}><strong>median</strong> warming estimates</button>
                        <button data-testid="upperProjections-button" className={temperatureRange === "upperProjections" ? "selected-button" : "estimate-button"} onClick={() => setTemperatureRange('upperProjections')}><strong>upper</strong> warming estimates</button>
                    </div>
                </th>
            </tr>
            <tr>
                <th>Country</th>
                {!isSmallScreen && YEARS_TO_DISPLAY.map(y => <th key={y}>{y}</th>)}
            </tr>
        </thead>
    );

    return (
        <table data-testid="warmingTable" className={isTableDataReady ? "table-ready warming-table" : "warming-table"}>
            {tableHead}
            <tbody>
                {!isSmallScreen && <tr data-testid="global-median-row">
                    <td className="median-cell">
                        <strong>Global Median Warming</strong>
                    </td>
                    {YEARS_TO_DISPLAY.map((y) => <td key={`global-${y}`} className={getYearGlobalMedian(y) > 1.5 ? 'median-cell red-text' : 'median-cell'}>{getYearGlobalMedian(y)}<span>&deg;C</span></td>)}
                </tr>}
                {getTableRow(1)}
                {countryView.view0 && getTableRow(2)}
                {countryView.view1 && getTableRow(3)}
                {countryView.view2 && getTableRow(4)}
                {countryView.view3 && getTableRow(5)}
            </tbody>
            <tfoot>
                <tr className="no-background">
                    <td colSpan={10}>
                        <button
                            data-testid="clearCountryView-button"
                            className={isTableDataReady ? "estimate-button" : "selected-button"}
                            onClick={() => clearCountries()}
                        >
                            Clear Country Selection
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default WarmingTable;
