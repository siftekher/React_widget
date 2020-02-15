import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Card from "../../../../components/Card/Card.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import CardHeader from "../../../../components/Card/CardHeader";
import { cardTitle } from "../../../../assets/jss/material-dashboard-pro-react";

const style = {
  ...customCheckboxRadioSwitch,
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    "& small": {
      fontSize: "80%",
      fontWeight: "400"
    }
  },
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

class Step4ContactContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  sendState() {
    return this.state;
  }
  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
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
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "_state"]: "success" });
        } else {
          this.setState({ [stateName + " _state"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "_state"]: "success" });
        } else {
          this.setState({ [stateName + "_state"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    // this.props.updateNewClientCreationClientType(event.target.value);
  };

  isValidated() {

    return true;
  }

  getClientPortalCardContent() {
    /*if (this.props.clients.new_client_created) {
      return (
        <React.Fragment>
          <p>Client record has been created...</p>
        </React.Fragment>
      );
    }
    if (this.props.clients.new_client_submitted) {
      return (
        <React.Fragment>
          <p>Client record is being created...</p>
        </React.Fragment>
      );
    }*/
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    // if (!this.props.beneficiaries.new_beneficiary_data) {
    //   return null;
    // }
    return (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <h4 className={classes.infoText}>
              {this.props.beneficiaries.new_beneficiary_data !== null ? (
                <span>
                  A Beneficiary account is now ready to be created for{" "}
                  {this.props.beneficiaries.new_beneficiary_data.nickname}.
                </span>
              ) : (
                <span>.</span>
              )}
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10}>
            {this.props.beneficiaries.new_beneficiary_data !== null ? (
              <React.Fragment>
            <p>
              You are creating a new Beneficiary account for{" "}
              <strong>
                {this.props.beneficiaries.new_beneficiary_data.nickname}
              </strong>
              .
            </p>
                    <p>
                    Please press the <strong>Finish</strong> button below to create this
                    beneficiary record.
                  </p>
                  </React.Fragment>
              ) : (
              <span>.</span>
              )}
          </GridItem>
        </GridContainer>
        {/* <GridContainer justify="center">
          <GridItem xs={12} sm={10}>
            <Card>
              <CardHeader color="rose" icon>
                <h4 className={classes.cardIconTitle}>
                  Client Creation Status
                </h4>
              </CardHeader>
              <CardBody>{this.getClientPortalCardContent()}</CardBody>
            </Card>
          </GridItem>
        </GridContainer> */}
      </React.Fragment>
    );
  }
}

export default withStyles(style)(Step4ContactContainer);
