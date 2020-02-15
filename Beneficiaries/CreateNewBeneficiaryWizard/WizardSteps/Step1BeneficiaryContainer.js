import { connect } from "react-redux";
import Step1Beneficiary from "./Step1Beneficiary";
import {
  // startNewClientCreation,
  // updateNewBeneficiaryCreationClientType,
  // updateNewClientCreationEmail,
  // updateNewClientCreationFirstName,
  // updateNewClientCreationLastName,
  updateNewBeneficiaryCreation

} from "../../../../redux/actions/beneficiaries";

const mapStateToProps = state => {
  return {
    // app_state: state.app_state,
    clients: state.clients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // updateNewBeneficiaryCreationClientType: (beneficiary_type) => {
      // dispatch(updateNewBeneficiaryCreationClientType(beneficiary_type))
    // },
    // updateNewClientCreationEmail: (email) => {
    //   dispatch(updateNewClientCreationEmail(email))
    // },
    // updateNewClientCreationFirstName: (email) => {
    //   dispatch(updateNewClientCreationFirstName(email))
    // },
    // updateNewClientCreationLastName: (email) => {
    //   dispatch(updateNewClientCreationLastName(email))
    // },
    updateNewBeneficiaryCreation: (key, value) => {
      dispatch(updateNewBeneficiaryCreation(key, value))
    }
  }
}

const Step1BeneficiaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step1Beneficiary);

export default Step1BeneficiaryContainer;
