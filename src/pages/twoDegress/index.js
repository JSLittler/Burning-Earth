import { connect } from "react-redux";

import TwoDegrees from "./twoDegrees";
import { resetCountryView } from "../../redux/reducers/actions/creators";

const mapStateToProps = (state) => {
    return {};
};
  
const mapDispatchToProps = dispatch => ({
    clearCountryView: () => dispatch(resetCountryView())
});

export default connect(mapStateToProps, mapDispatchToProps)(TwoDegrees);
