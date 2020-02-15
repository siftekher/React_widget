import { connect } from "react-redux";
import BeneficiaryEdit from "./BeneficiaryEdit";
import {
  // fetchClientDetails,
  // fetchBeneficiaryList,
  loadBeneficiaryDetailsRequest,
  loadBeneficiaryDetailsSuccess
} from "../../redux/actions/beneficiaries";

const mapStateToProps = state => {
  return {
    app_state: state.app_state,
    beneficiaries: state.beneficiaries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBeneficiaryDetailsRequest: () => {
      dispatch(loadBeneficiaryDetailsRequest())
    },
    loadBeneficiaryDetailsSuccess: () => {
      dispatch(loadBeneficiaryDetailsSuccess())
    },
  }
}

const BeneficiaryEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BeneficiaryEdit);

export default BeneficiaryEditContainer;
