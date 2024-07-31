import React from 'react';

import { YEARS_TO_DISPLAY } from '../../constants';

import './styles.module.scss';

const WarmingTable = ({
    countryView,
    projectedAnnualWarmingData,
    projectedGlobalWarmingData = [],
    setCountryToView,
    temperatureRange,
    setTemperatureRange
}) => {

    const isTableDataReady = projectedGlobalWarmingData?.length && countryView?.view0;

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

    return (
        <table data-testid="warmingTable" className={isTableDataReady ? "table-ready warming-table" : "warming-table"}>
            <thead>
                <tr>
                    <th colSpan={10}>
                        <h2>Future Warming</h2>
                        <p>
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
                    {YEARS_TO_DISPLAY.map(y => <th key={y}>{y}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr data-testid="global-median-row">
                    <td className="median-cell">
                        <strong>Global Median Warming</strong>
                    </td>
                    {YEARS_TO_DISPLAY.map((y) => <td key={`global-${y}`} className={getYearGlobalMedian(y) > 1.5 ? 'median-cell red-text' : 'median-cell'}>{getYearGlobalMedian(y)}<span>&deg;C</span></td>)}
                </tr>
                <tr data-testid="country1-row">
                    <td>
                        <select id="country1" data-testid="country1" name="country1" defaultValue={""} onChange={e => setCountryData(e)} className='select' autoFocus>
                            <option value="" disabled hidden>Select Country</option>
                            {projectedAnnualWarmingData?.map((c, i) => {
                                return <option key={i} value={`${c.code}-view${0}`}>{c.name}</option>
                            })}
                        </select>
                        <br></br>
                        <label htmlFor="country1">Select first country to compare</label>
                    </td>
                    {YEARS_TO_DISPLAY.map((y) => <td key={`view0-${y}`} className={getYearWarmingValue(0, y) > 1.5 ? 'red-text' : ''}>{getYearWarmingValue(0, y)}<span>&deg;C</span></td>)}
                </tr>
                <tr data-testid="country2-row" style={!countryView?.view0 ? {display: "none"} : {}}>
                    <td>
                        <select id="country2" data-testid="country2" name="country2" defaultValue={""} onChange={e => setCountryData(e)} className='select'>
                            <option value="" disabled hidden>Select Country</option>
                            {projectedAnnualWarmingData?.map((c, i) => {
                                return <option key={i} value={`${c.code}-view${1}`}>{c.name}</option>
                            })}
                        </select>
                        <br></br>
                        <label htmlFor="country2">Select second country to compare</label>
                    </td>
                    {YEARS_TO_DISPLAY.map((y) => <td key={`view1-${y}`} className={getYearWarmingValue(1, y) > 1.5 ? 'red-text' : ''}>{getYearWarmingValue(1, y)}<span>&deg;C</span></td>)}
                </tr>
                <tr data-testid="country3-row" style={!countryView?.view1 ? {display: "none"} : {}}>
                    <td>
                        <select id="country3" data-testid="country3" name="country3" defaultValue={""} onChange={e => setCountryData(e)} className='select'>
                            <option value="" disabled hidden>Select Country</option>
                            {projectedAnnualWarmingData?.map((c, i) => {
                                return <option key={i} value={`${c.code}-view${2}`}>{c.name}</option>
                            })}
                        </select>
                        <br></br>
                        <label htmlFor="country3">Select third country to compare</label>
                    </td>
                    {YEARS_TO_DISPLAY.map((y) => <td key={`view2-${y}`} className={getYearWarmingValue(2, y) > 1.5 ? 'red-text' : ''}>{getYearWarmingValue(2, y)}<span>&deg;C</span></td>)}
                </tr>
                <tr data-testid="country4-row" style={!countryView?.view2 ? {display: "none"} : {}}>
                    <td>
                        <select id="country4" data-testid="country4" name="country4" defaultValue={""} onChange={e => setCountryData(e)} className='select'>
                            <option value="" disabled hidden>Select Country</option>
                            {projectedAnnualWarmingData?.map((c, i) => {
                                return <option key={i} value={`${c.code}-view${3}`}>{c.name}</option>
                            })}
                        </select>
                        <br></br>
                        <label htmlFor="country4">Select fourth country to compare</label>
                    </td>
                    {YEARS_TO_DISPLAY.map((y) => <td key={`view3-${y}`} className={getYearWarmingValue(3, y) > 1.5 ? 'red-text' : ''}>{getYearWarmingValue(3, y)}<span>&deg;C</span></td>)}
                </tr>
                <tr data-testid="country5-row" style={!countryView?.view3 ? {display: "none"} : {}}>
                    <td>
                        <select id="country5" data-testid="country5" name="country5" defaultValue={""} onChange={e => setCountryData(e)} className='select'>
                            <option value="" disabled hidden>Select Country</option>
                            {projectedAnnualWarmingData?.map((c, i) => {
                                return <option key={i} value={`${c.code}-view${4}`}>{c.name}</option>
                            })}
                        </select>
                        <br></br>
                        <label htmlFor="country5">Select final country to compare</label>
                    </td>
                    {YEARS_TO_DISPLAY.map((y) => <td key={`view4-${y}`} className={getYearWarmingValue(4, y) > 1.5 ? 'red-text' : ''}>{getYearWarmingValue(4, y)}<span>&deg;C</span></td>)}
                </tr>
            </tbody>
        </table>
    );
};

export default WarmingTable;
