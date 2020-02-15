import React from "react";

import { FormattedMessage } from "react-intl";

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { API } from "aws-amplify";
import FormControl from "@material-ui/core/FormControl";
import CustomReactSelect from "../../../Forms/CustomReactSelect/CustomReactSelect";

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

class Step2Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ben_telephone_preferred: "",
      ben_telephone: "",

      ben_address_line_1: "",
      ben_address_line_2: "",
      ben_address_suburb: "",
      ben_address_state: "",
      ben_address_postcode: "",
      ben_address_country: "",
      country_list: [],
      country_list_prio: []
    };
  }

  componentDidMount() {
    API.get("countries", `/list_not_deleted`)
      .then(response => {
        this.setState({
          // country_list: response.fullList,
          country_list_prio: response
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
  // update beneficiary telephone in both props and states based on phone prefered type and phone number
  updateBenTelephone(ben_telephone_preferred, phoneNumber) {
    // The names need to match API
    const phone_type = {1: "work", 2: "afterhours", 3: "mobile"};

    // this.setState({ ["ben_telephone_" + phone_type[ben_telephone_preferred]]: phoneNumber });
    let item;
    for (item in phone_type) {
      // console.log(phone_type[item])
      if (item === ben_telephone_preferred) {
        this.props.updateNewBeneficiaryCreation("ben_telephone_" + phone_type[item], phoneNumber);
      }
      else {
        this.props.updateNewBeneficiaryCreation("ben_telephone_" + phone_type[item], "");
      }
    }
    this.setState({ ["ben_telephone"]: phoneNumber });
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
    if(stateName == "ben_telephone"){
      this.updateBenTelephone(this.state.ben_telephone_preferred, event.target.value) 
    } else {
      this.setState({ [stateName]: event.target.value });
      this.props.updateNewBeneficiaryCreation(stateName, event.target.value);
    }
  }
  handleChange = event => {
    // console.log(event.target.value)
    this.setState({ legal_type: event.target.value });
    // this.props.updateNewClientCreationClientType(event.target.value)
  };

  // handleSelectChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
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
      [name]: option_value
    }, () => {
      if (name === "ben_telephone_preferred") {
        this.updateBenTelephone(this.state.ben_telephone_preferred, this.state.ben_telephone)
      }
    });
    this.props.updateNewBeneficiaryCreation(name, option_value);
  };

  isValidated() {
      return true;
  }

  
  render() {
    const { classes } = this.props;
    // For CustomReactSelect. Generate select options for dropdown list.
    const country_list_select_options = this.state.country_list_prio
    .map(item => ({
      value: item.id,
      label: item.full_name
    }));
    const phone_select_options = [
      { value: "1", label: 'Work' },
      { value: "2", label: 'After hours' },
      { value: "3", label: 'Mobile' },
    ]
    .map(item => ({
      value: item.value,
      label: item.label
    }));
    
    return (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10}>
            <h4 className={classes.infoText}>
              <FormattedMessage
                id="wizard.beneficiaries.contact.sentence1"
                defaultMessage={
                  `Provide one telephone number`}
              />
            </h4>
          </GridItem>

          <GridItem xs={12} sm={4}>
            <CustomReactSelect
              label="Telephone Type"
              options={phone_select_options}
              value={this.state.ben_telephone_preferred}
              onChange={this.handleCustomReactSelectChange("ben_telephone_preferred")}
              isClearable={false}
              // isDisabled={!this.state.edit_mode}
            />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <CustomInput
              labelText={
                <span>
                  Telephone
                </span>
              }
              id="ben_telephone"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.ben_telephone,
                onChange: event =>
                  this.change(event, "ben_telephone", "length", 3)
              }}
            />
          </GridItem>
        </GridContainer>
<hr/>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>
              <FormattedMessage
                id="wizard.beneficiaries.contact.sentence2"
                defaultMessage={
                  `And an address`}
              />
            </h4>
          </GridItem>
          <GridItem xs={12} sm={10}>
            <CustomInput
              success={this.state.ben_address_line_1_state === "success"}
              error={this.state.ben_address_line_1_state === "error"}
              labelText={
                <span>
                  Street Line 1
                </span>
              }
              id="ben_address_line_1"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.ben_address_line_1,
                onChange: event => this.change(event, "ben_address_line_1", "length", 3),
              }}
            />
            <CustomInput
              success={this.state.ben_address_line_2_state === "success"}
              error={this.state.ben_address_line_2_state === "error"}
              labelText={
                <span>Street Line 2</span>
              }
              id="ben_address_line_2"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.ben_address_line_2,
                onChange: event => this.change(event, "ben_address_line_2", "length", 3),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={10}>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={6}>
            <CustomInput
              labelText={
                <span>Suburb</span>
              }
              id="ben_address_suburb"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.ben_address_suburb,
                onChange: event => this.change(event, "ben_address_suburb", "length", 3),
              }}
            />
              </GridItem>
              <GridItem xs={6} sm={3}>
            <CustomInput
              labelText={
                <span>State</span>
              }
              id="ben_address_state"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.ben_address_state,
                onChange: event => this.change(event, "ben_address_state", "email"),
              }}
            />
              </GridItem>
              <GridItem xs={6} sm={3}>
            <CustomInput
              labelText={
                <span>Postcode</span>
              }
              id="ben_address_postcode"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.ben_address_postcode,
                onChange: event => this.change(event, "ben_address_postcode", "email"),
              }}
            />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={10}>
            <CustomReactSelect
              label="Country"
              options={country_list_select_options}
              value={this.state.ben_address_country}
              onChange={this.handleCustomReactSelectChange("ben_address_country")}
              isClearable={true}
              // isDisabled={!this.state.edit_mode}
            />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Step2Contact);
