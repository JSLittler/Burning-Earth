import { YEARS_TO_DISPLAY } from '../../constants';

const getChartData = ({ countryView, projectedGlobalWarmingData, temperatureRange }) => {
    const global = projectedGlobalWarmingData.find(data => data.code === 'GLO');
    const iterator = Object.values(countryView).map((cv, i) => {
      if (cv) {
        return i
      }
    }).filter(i => i !== undefined);
  
    const getGlobalMedian = (year) => Object.values(global.medianProjections.find(yearData => `${year}` in yearData));
    const getViewTemp = (year) => iterator.map(i => Object.values(countryView[`view${i}`][temperatureRange].find(yearData => `${year}` in yearData))).flat();
    const getCountryHeaders = () => {
      return iterator.map(i => {
        return { 
          label: `${countryView[`view${i}`].name}`, type: "number"
        };
      });
    };
  
    return [
      [
        "Year", { label: "1.5\u{00B0}C Target", type: "number" }, { label: "Global Median", type: "number" }, ...getCountryHeaders()
      ],
      ...YEARS_TO_DISPLAY.map(year => [ `${year}`, 1.5, ...getGlobalMedian(year), ...getViewTemp(year) ])
    ];
  };

  export default getChartData;
