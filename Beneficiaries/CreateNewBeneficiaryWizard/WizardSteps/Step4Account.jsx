import React from "react";

import { FormattedMessage } from "react-intl";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import { API } from "aws-amplify";
import CustomReactSelect from "../../../Forms/CustomReactSelect/CustomReactSelect";
/*
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormLabel from "@material-ui/core/FormLabel";
import Face from "@material-ui/icons/Face";
*/
const style = {
  ...customCheckboxRadioSwitch,

  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

class Step4Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies_list: [],
      currencies_list_priority: [],

      swift_code: "",
      account_number: "",
      aba_routing_number: "",
      bsb_code: "",
      sort_code: "",
      iban: ""
    };
  }

  componentDidMount() {
    API.get("currencies", `/list_not_deleted`)
      .then(response => {
        this.setState({
          currencies_list_priority: response
        });

      })
      .catch(error => {
        console.log(error);
      });
  }

  sendState() {
    return this.state;
  }

  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "_state"]: "success" });
        } else {
          this.setState({ [stateName + "_state"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "_state"]: "success" });
        } else {
          this.setState({ [stateName + "_state"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });

    this.props.updateNewBeneficiaryCreation(stateName, event.target.value);

  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.updateNewClientCreationClientType(event.target.value);
  };

  // handleSelectChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  //   this.props.updateNewBeneficiaryCreation([event.target.name], event.target.value);
  //   //this.props.updateNewClientCreationClientType(event.target.value)
  // };

  // For CustomReactSelect
  handleCustomReactSelectChange = name => value => {
    var option_value;
    if (value === null) {
      option_value = null;
    } else {
      option_value = value.value;
    }
    this.setState({
      [name]: option_value,
    });

    this.setState({
      swift_code: "",
      account_number: "",
      aba_routing_number: "",
      bsb_code: "",
      sort_code: "",
      iban: ""
    });

    this.props.updateNewBeneficiaryCreation(name, option_value);
  };

  isValidated() {
    return true;
  }

  render() {
    const { classes } = this.props;
    // For CustomReactSelect. Generate select options for dropdown list.
    const account_currency_list_select_options = this.state.currencies_list_priority
    .map(item => ({
      value: item.id,
      label: item.iso_alpha_3 + ": " + item.full_name
    }));

    const swiftOption = {5: 5, 8: 8, 9: 9};
    const bsbOption = {1: 1};
    const sortCodeOption = {8: 8, 9: 9};
    const abaRoutingOption = {5:5};
    const ibanOption = {8: 8, 9: 9};

    // const swiftOption = {1:1, 5: 5, 6:6, 8: 8, 9: 9};
    // const bsbOption = {1:1, 5: 5, 6:6, 8: 8, 9: 9};
    // const sortCodeOption = {1:1, 5: 5, 6:6, 8: 8, 9: 9};
    // const abaRoutingOption = {1:1, 5: 5, 6:6, 8: 8, 9: 9};
    // const ibanOption = {1:1, 5: 5, 6:6, 8: 8, 9: 9};

    return (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>
              <FormattedMessage
                id="wizard.beneficiaries.account.sentence1"
                defaultMessage={
                  `Provide beneficiary account information`}
              />
            </h4>
          </GridItem>
          <GridItem xs={12} sm={5}>
            <CustomReactSelect
              label="Account Currency"
              options={account_currency_list_select_options}
              value={this.state.account_currency}
              onChange={this.handleCustomReactSelectChange("account_currency")}
              isClearable={true}
              // isDisabled={!this.state.edit_mode}
            />
          </GridItem>
          {(swiftOption.hasOwnProperty(this.state.account_currency)) &&
          (<GridItem xs={12} sm={5}>
            <CustomInput
              labelText={
                <span>Swift Code</span>
              }
              id="swift_code"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.swift_code,
                onChange: event => this.change(event, "swift_code", "length", 3)
              }}
            />
          </GridItem> )
          }
        </GridContainer>

        <GridContainer justify="center">
          {(bsbOption.hasOwnProperty(this.state.account_currency)) &&
          (
            <GridItem xs={12} sm={5}>
              <CustomInput
                labelText={
                  <span>BSB Code</span>
                }
                id="bsb_code"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.bsb_code,
                  onChange: event => this.change(event, "bsb_code", "email")
                }}
              />
            </GridItem>)
          }
          <GridItem xs={12} sm={5}>
            <CustomInput
              labelText={
                <span>Account Number</span>
              }
              id="account_number"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.account_number,
                onChange: event => this.change(event, "account_number", "length", 3)
              }}
            />
          </GridItem>
          {(abaRoutingOption.hasOwnProperty(this.state.account_currency)) &&
          (
            <GridItem xs={12} sm={5}>
              <CustomInput
                labelText={
                  <span>ABA Routing Number</span>
                }
                id="aba_routing_number"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.aba_routing_number,
                  onChange: event => this.change(event, "aba_routing_number", "length", 3)
                }}
              />
            </GridItem>)
          }
          {(sortCodeOption.hasOwnProperty(this.state.account_currency)) &&
          (
            <GridItem xs={12} sm={5}>
              <CustomInput
                labelText={
                  <span>Sort Code</span>
                }
                id="sort_code"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.sort_code,
                  onChange: event => this.change(event, "sort_code", "email")
                }}
              />
            </GridItem>)
          }
          {(ibanOption.hasOwnProperty(this.state.account_currency)) &&
          (
            <GridItem xs={12} sm={5}>
              <CustomInput
                labelText={
                  <span>IBAN</span>
                }
                id="iban"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.iban,
                  onChange: event => this.change(event, "iban", "email")
                }}
              />
            </GridItem>)
          }
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Step4Account);