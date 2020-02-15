import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1BeneficiaryContainer from "./WizardSteps/Step1BeneficiaryContainer.js";
import Step2ContactContainer from "./WizardSteps/Step2ContactContainer.js";
import Step3BankContainer from "./WizardSteps/Step3BankContainer.js";
import Step4AccountContainer from "./WizardSteps/Step4AccountContainer.js";
//import Step5TelephoneContainer from "./WizardSteps/Step5TelephoneContainer.js";
import Step6ConfirmContainer from "./WizardSteps/Step6ConfirmContainer.js";
import { withRouter } from "react-router-dom";

import { FormattedMessage } from "react-intl";

//setup for language components
let languageObj_en_json = require('../../../translations/en.json');
let languageObj_zh_json = require('../../../translations/zh.json');
let languageObj_de_json = require('../../../translations/de.json');
let languageObj_es_json = require('../../../translations/es.json');
let languageObj_fr_json = require('../../../translations/fr.json');
let languageObj_it_json = require('../../../translations/it.json');
let languageObj_pt_json = require('../../../translations/pt.json');

class CreateNewBeneficiaryWizard extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  componentDidMount() {
    this.props.startNewBeneficiaryCreation();
  }

  createBeneficiary = async (data) => {
    return  await this.props.createNewBeneficiary(data);
  }

  finished = async () => {
    let database_result = await this.createBeneficiary(this.props.beneficiaries.new_beneficiary_data);
    this.props.history.push(`/beneficiaries/list`);
  }

  render() {
    let languageObj = "";
    switch(this.props.language.language_current_ui){
        case "en":
          languageObj = languageObj_en_json;
          break;
        case "es":
          languageObj = languageObj_es_json;
          break;
        case "de":
          languageObj = languageObj_de_json;
          break;
        case "zh":
          languageObj = languageObj_zh_json;
          break;
        case "fr":
          languageObj = languageObj_fr_json;
          break;
        case "it":
          languageObj = languageObj_it_json;
          break;
        case "pt":
          languageObj = languageObj_pt_json;
          break;
        default:
          languageObj = languageObj_en_json;
    }

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            validate
            steps={[
              {
                stepName: languageObj["newBenficiary.stepName1"],
                stepComponent: Step1BeneficiaryContainer,
                stepId: "about"
              },
              {
                stepName: languageObj["newBenficiary.stepName2"],
                stepComponent: Step2ContactContainer,
                stepId: "contact"
              },
              {
                stepName: languageObj["newBenficiary.stepName3"],
                stepComponent: Step3BankContainer,
                stepId: "bank"
              },
              {
                stepName: languageObj["newBenficiary.stepName4"],
                stepComponent: Step4AccountContainer,
                stepId: "account"
              },
              // {
              //   stepName: "Contact",
              //   stepComponent: Step5TelephoneContainer,
              //   stepId: "contact"
              // },
              {
                stepName: languageObj["newBenficiary.stepName5"],
                stepComponent: Step6ConfirmContainer,
                stepId: "confirm"
              }
            ]}
            title={<FormattedMessage 
              id="newBeneficiary.title"
              defaultMessage={
                `Create New Beneficiary`} 
              />
              //"Create New Beneficiary"
            }
            subtitle={
              <FormattedMessage 
              id="newBeneficiary.subtitle"
              defaultMessage={
                `Creating a beneficiary to process a payment to`} 
              />
              //"Creating a beneficiary to process a payment to"
            }
            finishButtonClick={() => this.finished()}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withRouter(CreateNewBeneficiaryWizard);
