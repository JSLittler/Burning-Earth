import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
    fetchAnnualWarmingDataPending,
    fetchAnnualWarmingDataSuccess,
    fetchAnnualWarmingDataError
  } from '../../redux/reducers/actions/creators';
import { PAGES } from '../../constants';
import HomePage from '../../pages/home';
import TwoDegress from '../../pages/twoDegress';
import FourDegress from '../../pages/fourDegrees';

const alphabeticalSort = (a, b) => {
    if ( a.name < b.name ){
      return -1;
    }
  
    return 1;
};
  
const getAnnualWarmingData = () => (dispatch) => {
    dispatch(fetchAnnualWarmingDataPending());
    fetch('./data/projectedWarmingData.json')
    .then(res => res.json())
    .then(res => {
      if(res.error) {
        throw(res.error)
      }
      const rawData = res.filter(country => country.ProjectedWarmingData);
      const data = rawData.sort(alphabeticalSort);
      dispatch(fetchAnnualWarmingDataSuccess(data));
    })
    .catch(error => {
      dispatch(fetchAnnualWarmingDataError(error));
    });
};

const App = ({
    dispatch,
}) => {
    dispatch(getAnnualWarmingData());
  
    return (
      <Router>
        <Routes>
          <Route path={PAGES.HOME_PAGE.path} element={<HomePage />} ></Route>
          <Route path={PAGES.TWO_DEGREES.path} element={<TwoDegress />}></Route>
          <Route path={PAGES.FOUR_DEGREES.path} element={<FourDegress />}></Route>
        </Routes>
      </Router>
    );
};

export default App;