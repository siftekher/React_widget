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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { API } from "aws-amplify";
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

class Step3Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_legal_name: "",
      bank_address_line_1: "",
      bank_address_line_2: "",
      bank_address_suburb: "",
      bank_address_state: "",
      bank_address_postcode: "",
      bank_address_country: "",
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

    this.props.updateNewBeneficiaryCreation(stateName, event.target.value)

  }
  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    // this.props.updateNewClientCreationClientType(event.target.value)
  };

  // handleSelectChange = event => {
  //   if(event.target.name == "bank_address_country" && event.target.value == "123456") return;

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
      [name]: option_value,
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
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            <FormattedMessage
              id="wizard.beneficiaries.bank.sentence1"
              defaultMessage={
                `Provide details of the beneficiary's bank`}
            />
          </h4>
        </GridItem>
        <GridItem xs={12} sm={10}>
          <CustomInput
            labelText={
              <span> Bank Name</span>
            }
            id="bank_legal_name"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.bank_legal_name,
              onChange: event => this.change(event, "bank_legal_name", "length", 3),
            }}
          />
          <CustomInput
            labelText={
              <span>Street Line 1</span>
            }
            id="bank_address_line_1"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.bank_address_line_1,
              onChange: event => this.change(event, "bank_address_line_1", "length", 3),
            }}
          />
          <CustomInput
            labelText={
              <span>Street Line 2</span>
            }
            id="bank_address_line_2"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.bank_address_line_2,
              onChange: event => this.change(event, "bank_address_line_2", "length", 3),
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
            id="bank_address_suburb"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.bank_address_suburb,
              onChange: event => this.change(event, "bank_address_suburb", "length", 3),
            }}
          />
            </GridItem>
            <GridItem xs={6} sm={3}>
          <CustomInput
            labelText={
              <span>State</span>
            }
            id="bank_address_state"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.bank_address_state,
              onChange: event => this.change(event, "bank_address_state", "email"),
            }}
          />
            </GridItem>
            <GridItem xs={6} sm={3}>
          <CustomInput
            labelText={
              <span>Postcode</span>
            }
            id="bank_address_postcode"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.bank_address_postcode,
              onChange: event => this.change(event, "bank_address_postcode", "email"),
            }}
          />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={10}>
          {/*<CustomInput*/}
            {/*labelText={*/}
              {/*<span>Country</span>*/}
            {/*}*/}
            {/*id="bank_address_country"*/}
            {/*formControlProps={{*/}
              {/*fullWidth: true*/}
            {/*}}*/}
            {/*inputProps={{*/}
              {/*value: this.state.bank_address_country,*/}
              {/*onChange: event => this.change(event, "bank_address_country", "email"),*/}
            {/*}}*/}
          {/*/>*/}

          {/* <FormControl
            fullWidth

            className={classes.selectFormControl}
          >
            <InputLabel
              htmlFor="simple-select"
              className={classes.selectLabel}
            >
              Country
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.bank_address_country || "0"}
              onChange={this.handleSelectChange}
              inputProps={{
                name: "bank_address_country",
                id: "bank_address_country"
              }}
            >
              <MenuItem
                key="0x0"
                value="0"
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Select Country
              </MenuItem>

              {this.state.country_list_prio
                .sort((a, b) => a.list_priority < b.list_priority)
                .map(item => {
                  return (
                    <MenuItem
                      key={item.id}
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                      }}
                      value={item.id}
                    >
                      {item.full_name}
                    </MenuItem>
                  );
                })} */}
              {/*<MenuItem*/}
              {/*  key="0x0"*/}
              {/*  value="0"*/}
              {/*  disabled*/}
              {/*  classes={{*/}
              {/*    root: classes.selectMenuItem*/}
              {/*  }}*/}
              {/*>*/}
              {/*  --------------------------------------------------*/}
              {/*</MenuItem>*/}
              {/*{this.state.country_list*/}
              {/*  .sort((a, b) => a.full_name.localeCompare(b.full_name))*/}
              {/*  .map(item => {*/}
              {/*    return (*/}
              {/*      <MenuItem*/}
              {/*        key={item.id}*/}
              {/*        classes={{*/}
              {/*          root: classes.selectMenuItem,*/}
              {/*          selected: classes.selectMenuItemSelected*/}
              {/*        }}*/}
              {/*        value={item.id}*/}
              {/*      >*/}
              {/*        {item.full_name}*/}
              {/*      </MenuItem>*/}
              {/*    );*/}
              {/*  })}*/}
            {/* </Select>
          </FormControl> */}
          <CustomReactSelect
            label="Country"
            options={country_list_select_options}
            value={this.state.bank_address_country}
            onChange={this.handleCustomReactSelectChange("bank_address_country")}
            isClearable={true}
            // isDisabled={!this.state.edit_mode}
          />
        </GridItem>

      </GridContainer>
    );
  }
}

export default withStyles(style)(Step3Bank);