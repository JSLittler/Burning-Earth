const getAnnualWarmingProjections = async (countryCode) => {
    const annualTempData = `https://cie-api.climateanalytics.org/api/timeseries/?iso=${countryCode}&region=${countryCode}&scenario=h_cpol&var=tasAdjust&season=annual&aggregation_spatial=area&format=json`

    const data = await fetch(annualTempData)
    .then(function(res) {
        return res.text()
    });

    try {
        return JSON.parse(data);
    } catch (err) {
        return {
            year: [],
            warming_level: []
        };
    };
};

export default getAnnualWarmingProjections;