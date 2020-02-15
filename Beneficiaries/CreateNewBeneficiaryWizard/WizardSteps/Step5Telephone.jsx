import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
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

class Step5Telephone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ben_telephone_work: "",
      ben_telephone_afterhours: "",
      ben_telephone_mobile: "",
      ben_email_main: "",
      ben_email_secondary: ""
    };
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

  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Contact information
          </h4>
        </GridItem>
        <GridItem xs={12} sm={10}>
          <CustomInput
            labelText={
              <span>Telephone (Work)</span>
            }
            id="ben_telephone_work"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.ben_telephone_work,
              onChange: event => this.change(event, "ben_telephone_work", "length", 3),
            }}
          />
          <CustomInput
            labelText={
              <span>Telephone (After hours)</span>
            }
            id="ben_telephone_afterhours"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.ben_telephone_afterhours,
              onChange: event => this.change(event, "ben_telephone_afterhours", "length", 3),
            }}
          />
          <CustomInput
            labelText={
              <span>Telephone (mobile)</span>
            }
            id="ben_telephone_mobile"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.ben_telephone_mobile,
              onChange: event => this.change(event, "ben_telephone_mobile", "length", 3),
            }}
          />

          <CustomInput
            labelText={
              <span>Email (main)</span>
            }
            id="ben_email_main"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.ben_email_main,
              onChange: event => this.change(event, "ben_email_main", "email"),
            }}
          />

          <CustomInput
            labelText={
              <span>Email (Secondary)</span>
            }
            id="ben_email_secondary"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.ben_email_secondary,
              onChange: event => this.change(event, "ben_email_secondary", "email"),
            }}
          />
        </GridItem>

      </GridContainer>
    );
  }
}

export default withStyles(style)(Step5Telephone);