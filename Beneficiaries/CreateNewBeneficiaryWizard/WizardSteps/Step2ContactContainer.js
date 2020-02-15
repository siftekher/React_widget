import { connect } from "react-redux";
import Step2Contact from "./Step2Contact";
import {
  // startNewClientCreation,
  // updateNewClientCreationClientType,
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
    // updateNewClientCreationClientType: (client_type) => {
      // dispatch(updateNewClientCreationClientType(client_type))
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

const Step2ContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2Contact);

export default Step2ContactContainer;
