import { connect } from "react-redux";

import HomePage from "./home";
import { setCountryToView, setTemperatureRange } from "../../redux/reducers/actions/creators";
import mockProjectedAnnualWarmingData from "../../__mocks__/mockProjectedWarmingData";


const mapStateToProps = (state) => {
    return {
        countryView: state.countryView,
        projectedAnnualWarmingData: state.projectedAnnualWarmingData,
        projectedGlobalWarmingData: state.projectedGlobalWarmingData,
        temperatureRange: state.temperatureRange,
        error: state.error
    };
};
  
const mapDispatchToProps = dispatch => ({
    setCountryToView: (countryData, position) => dispatch(setCountryToView(countryData, position)),
    setTemperatureRange: (range) => dispatch(setTemperatureRange(range))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
