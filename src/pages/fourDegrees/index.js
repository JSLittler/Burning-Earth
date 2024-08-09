import { connect } from "react-redux";

import FourDegress from "./fourDegress";
import { resetCountryView } from "../../redux/reducers/actions/creators";

const mapStateToProps = (state) => {
    return {};
};
  
const mapDispatchToProps = dispatch => ({
    clearCountryView: () => dispatch(resetCountryView())
});

export default connect(mapStateToProps, mapDispatchToProps)(FourDegress);
