import { connect } from "react-redux";
import Step3Bank from "./Step3Bank";
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
    },
    */
   updateNewBeneficiaryCreation: (key, value) => {
      dispatch(updateNewBeneficiaryCreation(key, value))
    }
  }
}

const Step3BankContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3Bank);

export default Step3BankContainer;
