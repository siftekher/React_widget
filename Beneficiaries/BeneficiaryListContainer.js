import { connect } from "react-redux";
import BeneficiaryList from "./BeneficiaryList";
import {
  fetchBeneficiaryList,
  setBeneficiarySelectId
} from "../../redux/actions/beneficiaries";

const mapStateToProps = state => {
  return {
    app_state: state.app_state,
    beneficiaries: state.beneficiaries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBeneficiaryList: () => {
      dispatch(fetchBeneficiaryList())
    },
    setBeneficiarySelectId: (id) => {
      dispatch(setBeneficiarySelectId(id))
    }
  }
}

const BeneficiaryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BeneficiaryList);

export default BeneficiaryListContainer;
