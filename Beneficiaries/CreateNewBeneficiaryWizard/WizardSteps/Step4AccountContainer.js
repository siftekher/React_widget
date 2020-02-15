import { connect } from "react-redux";
import Step4Account from "./Step4Account";
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

const Step4AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4Account);

export default Step4AccountContainer;
