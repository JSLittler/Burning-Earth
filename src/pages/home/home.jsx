import React from 'react';
import { Chart } from "react-google-charts";

import Page from '../../components/page';
import WarmingTable from '../../components/warmingTable/warmingTable';
import getChartData from '../../utils/getChartData';

import './styles.module.scss';

const HomePage = ({
  countryView,
  projectedAnnualWarmingData,
  projectedGlobalWarmingData,
  temperatureRange,
  setCountryToView,
  setTemperatureRange
}) => {
  const isTableDataReady = projectedGlobalWarmingData?.length && countryView?.view0;

  const getChart = () => {
    if (!isTableDataReady) {
      return <p>Comparison Table will appear here, once a country is selected</p>;
    }

    const data = getChartData({countryView, projectedGlobalWarmingData, temperatureRange});
    const options = {
      title: `Estimated Warming by Country Up To The Year 2100: ${temperatureRange.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2").toLowerCase()}`,
      vAxis: { title: "Estimated Temperature Increase \u{00B0}C" },
      hAxis: { title: "Year" },
      curveType: "function",
      seriesType: "lines",
    };

    return (
      <div className="chart" data-testid="warmingChart">
        <Chart
          chartType="ComboChart"
          data={data}
          height="400px"
          options={options}
          width="100%"
        />
      </div>
    );
  };
  
  return (
    <Page>
      <div className="home-container">
        <WarmingTable 
          countryView={countryView}
          projectedAnnualWarmingData={projectedAnnualWarmingData}
          projectedGlobalWarmingData={projectedGlobalWarmingData}
          setCountryToView={setCountryToView}
          temperatureRange={temperatureRange}
          setTemperatureRange={setTemperatureRange}
        />
        {getChart()}
        <p data-testid="source">source: https://climateanalytics.org/</p>
      </div>
    </Page>
  );
};

export default HomePage;
