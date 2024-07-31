import { connect } from "react-redux";

import App from "./app";

const mapStateToProps = state => {
  return {}
};
  
const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);