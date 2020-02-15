import { connect } from "react-redux";
import Step6Confirm from "./Step6Confirm";

import {
  updateNewBeneficiaryCreation

} from "../../../../redux/actions/beneficiaries";

const mapStateToProps = state => {
  return {
    // app_state: state.app_state,
    beneficiaries: state.beneficiaries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //updateNewClientCreation: (key, value) => {
    //  dispatch(updateNewClientCreation(key, value))
    //}
    updateNewBeneficiaryCreation: (key, value) => {
      dispatch(updateNewBeneficiaryCreation(key, value))
    }
  }
}

const Step6ConfirmContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step6Confirm);

export default Step6ConfirmContainer;