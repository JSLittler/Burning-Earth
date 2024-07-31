import { writeFileSync } from 'fs';

import countries from "../public/data/countryAlpha3Codes.js";
import getAnnualWarmingProjections from "./getAnnualWarmingProjections.js";

const getProjectedWarmingData = () => {
    console.log('Attempting data build...');
    const cleanedData = [];

    countries.forEach(async (c) => {
        getAnnualWarmingProjections(c.code)
        .then((data) => {
            const { year, warming_levels, median, upper, lower } = data;

            if (!year?.length || !warming_levels?.length || !median) {
                cleanedData.push({
                    ...c,
                    projectedWarmingData: false
                });
            } else {
                cleanedData.push({
                    ...c,
                    ProjectedWarmingData: true,
                    upperProjections: year.map((v, i) => {
                        return {
                            [v]: upper[i].toFixed(2)
                        };
                    }),
                    medianProjections: year.map((v, i) => {
                        return {
                            [v]: median[i].toFixed(2)
                        };
                    }),
                    lowerProjections: year.map((v, i) => {
                        return {
                            [v]: lower[i].toFixed(2)
                        };
                    })
                });

                if (!cleanedData.filter(country => country.name === 'Global Median').length) {
                    const globalAverage = {
                        code: 'GLO',
                        name: 'Global Median',
                        eu: false,
                        ProjectedWarmingData: true,
                        medianProjections: year.map((v, i) => {
                            return {
                                [v]: warming_levels[i]
                            };
                        }),
                    }
                    
                    cleanedData.push(globalAverage);
                }
            }
        });
    });
    
    setTimeout(() => {
        writeFileSync(`./public/data/projectedWarmingData.json`, JSON.stringify(cleanedData, null, 2));
        console.log('Success: Data build completed');
    }, 20000);
};

getProjectedWarmingData();
