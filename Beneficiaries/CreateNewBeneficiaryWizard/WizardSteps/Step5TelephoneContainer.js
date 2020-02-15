import { connect } from "react-redux";
import Step5Telephone from "./Step5Telephone";
import {
  updateNewBeneficiaryCreation
  //updateNewClientCreation

} from "../../../../redux/actions/beneficiaries";


const mapStateToProps = state => {
  return {
    // app_state: state.app_state,
    beneficiaries: state.beneficiaries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /*
    updateNewClientCreationClientType: (client_type) => {
      dispatch(updateNewClientCreationClientType(client_type))
    },*/
    updateNewBeneficiaryCreation: (key, value) => {
      dispatch(updateNewBeneficiaryCreation(key, value))
    }
  }
}

const Step5TelephoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step5Telephone);

export default Step5TelephoneContainer;
