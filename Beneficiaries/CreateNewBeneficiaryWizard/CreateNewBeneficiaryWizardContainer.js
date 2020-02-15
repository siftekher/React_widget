import { connect } from "react-redux";
import CreateNewBeneficiaryWizard from "./CreateNewBeneficiaryWizard";
import {
  startNewBeneficiaryCreation,
  // updateNewClientCreationClientType,
  createNewBeneficiary
} from "../../../redux/actions/beneficiaries";

const mapStateToProps = state => {
  return {
    app_state: state.app_state,
    beneficiaries: state.beneficiaries,
    language: state.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startNewBeneficiaryCreation: () => {
      dispatch(startNewBeneficiaryCreation())
    },
    // updateNewClientCreationClientType: (client_type) => {
    //   dispatch(updateNewClientCreationClientType(client_type))
    // },
    createNewBeneficiary: (data) => {
      dispatch(createNewBeneficiary(data))
    }
  }
}

const CreateNewBeneficiaryWizardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewBeneficiaryWizard);

export default CreateNewBeneficiaryWizardContainer;
