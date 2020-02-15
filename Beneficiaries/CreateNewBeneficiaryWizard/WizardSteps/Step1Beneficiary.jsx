import React from "react";

import { FormattedMessage } from "react-intl";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
// import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import PictureUpload from "components/CustomUpload/PictureUpload.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
// import Card from "components/Card/Card.jsx";
// import CardBody from "components/Card/CardBody.jsx";

import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import FormLabel from "@material-ui/core/FormLabel";
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

class Step1Beneficiary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legal_entity_types_list: [],
      client_list: [],
      team_list: [],
      division_list: [],
      entity_list: [],

      legal_type: 1,
      legal_type_state: "success",

      // ben_legal_name: "Andre",
      // ben_legal_name_state: "success",
      // nickname: "Andre",
      // nickname_state: "success",
      // ben_email_main: "andre@andma.com",
      // ben_email_main_state: "success",
      client_id: "",
      team_id: "",
      division_id: "",
      entity_id: "",
      ben_legal_name: "",
      ben_legal_name_state: "",
      // nickname: "",
      // nickname_state: "",
      ben_email_main: "",
      ben_email_main_state: "",

      ben_abn_name_state: "",
      ben_abn_name: "",
      ben_acn_name_state: "",
      ben_acn_name: "",
      ben_trust_name: "",
      ben_trust_name_state: ""


    };
  }

  componentDidMount() {
    API.get("admin", `/legal-entity-types/get`)
      .then(response => {
        // console.log(response);
        this.setState({
          legal_entity_types_list: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    API.get("clients", `/get-list-not-deleted`)
      .then(response => {
        // console.log(response);
        this.setState({
          client_list: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    API.get("teams", `/get-list-not-deleted`)
      .then(response => {
        // console.log(response);
        this.setState({
          team_list: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    API.get("divisions", `/get-list-not-deleted`)
      .then(response => {
        // console.log(response);
        this.setState({
          division_list: response
        });
      })
      .catch(error => {
        console.log(error);
      });
    API.get("entities", `/get-list-not-deleted`)
      .then(response => {
        // console.log(response);
        this.setState({
          entity_list: response
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
    if (stateName === "ben_legal_name") {
      this.props.updateNewBeneficiaryCreation("nickname", event.target.value)
    }
  }
  handleChange = event => {
    // console.log(event.target.value)
    this.setState({ legal_type: event.target.value });
    this.props.updateNewBeneficiaryCreation([event.target.name], event.target.value)
    // this.props.updateNewClientCreationClientType(event.target.value)
    if (event.target.name === "ben_legal_name") {
      this.props.updateNewBeneficiaryCreation("nickname", event.target.value)
    }
  };
  // handleSelectChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  //   this.props.updateNewBeneficiaryCreation([event.target.name], event.target.value)
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
    // console.log(this.state);
    if (
      this.state.ben_legal_name_state === "success" &&
      // this.state.nickname_state === "success" &&
      (
        this.state.client_id > 0 ||
        this.state.team_id > 0 ||
        this.state.division_id > 0 ||
        this.state.entity_id > 0
      )
    ) {
      return true;
    } else {
      if (this.state.ben_legal_name_state !== "success") {
        this.setState({ ben_legal_name_state: "error" });
      }
      // if (this.state.nickname_state !== "success") {
      //   this.setState({ nickname_state: "error" });
      // }
    }
    return false;
  }

  getBeneficiaryDetails() {
    const { classes } = this.props;
    // switch (this.state.legal_type) {
    //   case "1":
        return (
          <React.Fragment>
            <CustomInput
              success={this.state.ben_legal_name_state === "success"}
              error={this.state.ben_legal_name_state === "error"}
              labelText={
                <span>
                  Full legal name
              </span>
              }
              id="ben_legal_name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.ben_legal_name,
                onChange: event => this.change(event, "ben_legal_name", "length", 3),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className={classes.inputAdornment}
                  >
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </React.Fragment>
        )
      // case "2":
      //   return (
      //     <React.Fragment>
      //       <CustomInput
      //         success={this.state.ben_legal_name_state === "success"}
      //         error={this.state.ben_legal_name_state === "error"}
      //         labelText={
      //           <span>
      //             Company Name
      //         </span>
      //         }
      //         id="ben_legal_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_legal_name,
      //           onChange: event => this.change(event, "ben_legal_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //       <CustomInput
      //         success={this.state.ben_acn_name_state === "success"}
      //         error={this.state.ben_acn_name_state === "error"}
      //         labelText={
      //           <span>
      //             ACN
      //         </span>
      //         }
      //         id="ben_acn_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_acn_name,
      //           onChange: event => this.change(event, "ben_acn_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //       <CustomInput
      //         success={this.state.ben_abn_name_state === "success"}
      //         error={this.state.ben_abn_name_state === "error"}
      //         labelText={
      //           <span>
      //             ABN
      //         </span>
      //         }
      //         id="ben_abn_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_abn_name,
      //           onChange: event => this.change(event, "ben_abn_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //     </React.Fragment>
      //   )
      // case "4":
      //   return (
      //     <React.Fragment>
      //       <CustomInput
      //         success={this.state.ben_legal_name_state === "success"}
      //         error={this.state.ben_legal_name_state === "error"}
      //         labelText={
      //           <span>
      //             Company Name
      //         </span>
      //         }
      //         id="ben_legal_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_legal_name,
      //           onChange: event => this.change(event, "ben_legal_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />

      //       <CustomInput
      //         success={this.state.ben_trust_name_state === "success"}
      //         error={this.state.ben_trust_name_state === "error"}
      //         labelText={
      //           <span>
      //             Trust Name
      //         </span>
      //         }
      //         id="ben_trust_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_trust_name,
      //           onChange: event => this.change(event, "ben_trust_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //       <CustomInput
      //         success={this.state.ben_acn_name_state === "success"}
      //         error={this.state.ben_acn_name_state === "error"}
      //         labelText={
      //           <span>
      //             ACN
      //         </span>
      //         }
      //         id="ben_acn_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_acn_name,
      //           onChange: event => this.change(event, "ben_acn_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //     </React.Fragment>
      //   )
      // case "5":
      //   return (
      //     <React.Fragment>
      //       <CustomInput
      //         success={this.state.ben_legal_name_state === "success"}
      //         error={this.state.ben_legal_name_state === "error"}
      //         labelText={
      //           <span>
      //             Company Name
      //         </span>
      //         }
      //         id="ben_legal_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_legal_name,
      //           onChange: event => this.change(event, "ben_legal_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //       <CustomInput
      //         success={this.state.ben_acn_name_state === "success"}
      //         error={this.state.ben_acn_name_state === "error"}
      //         labelText={
      //           <span>
      //             ACN
      //         </span>
      //         }
      //         id="ben_acn_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_acn_name,
      //           onChange: event => this.change(event, "ben_acn_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //       <CustomInput
      //         success={this.state.ben_abn_name_state === "success"}
      //         error={this.state.ben_abn_name_state === "error"}
      //         labelText={
      //           <span>
      //             ABN
      //         </span>
      //         }
      //         id="ben_abn_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_abn_name,
      //           onChange: event => this.change(event, "ben_abn_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //       <CustomInput
      //         success={this.state.ben_trust_name_state === "success"}
      //         error={this.state.ben_trust_name_state === "error"}
      //         labelText={
      //           <span>
      //             Trust Name
      //         </span>
      //         }
      //         id="ben_trust_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_trust_name,
      //           onChange: event => this.change(event, "ben_trust_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />

      //     </React.Fragment>
      //   )
      // default:
      //   return (
      //     <React.Fragment>
      //       <CustomInput
      //         success={this.state.ben_legal_name_state === "success"}
      //         error={this.state.ben_legal_name_state === "error"}
      //         labelText={
      //           <span>
      //             Full legal name
      //         </span>
      //         }
      //         id="ben_legal_name"
      //         formControlProps={{
      //           fullWidth: true
      //         }}
      //         inputProps={{
      //           value: this.state.ben_legal_name,
      //           onChange: event => this.change(event, "ben_legal_name", "length", 3),
      //           endAdornment: (
      //             <InputAdornment
      //               position="end"
      //               className={classes.inputAdornment}
      //             >
      //               <Face className={classes.inputAdornmentIcon} />
      //             </InputAdornment>
      //           )
      //         }}
      //       />
      //     </React.Fragment>
      //   )
    // }
  }

  render() {
    const { classes } = this.props;
    // For CustomReactSelect. Generate select options for dropdown list.
    const client_list_select_options = this.state.client_list
      .sort((a, b) =>
        a.nickname.localeCompare(b.nickname)
      )
      .map(item => ({
        value: item.id,
        label: item.nickname
      }));
    const team_list_select_options = this.state.team_list
      .sort((a, b) =>
        a.nickname.localeCompare(b.nickname)
      )
      .map(item => ({
        value: item.id,
        label: item.nickname
      }));
    const division_list_select_options = this.state.division_list
      .sort((a, b) =>
        a.nickname.localeCompare(b.nickname)
      )
      .map(item => ({
        value: item.id,
        label: item.nickname
      }));
    const entity_list_select_options = this.state.entity_list
      .sort((a, b) =>
        a.nickname.localeCompare(b.nickname)
      )
      .map(item => ({
        value: item.id,
        label: item.nickname
      }));
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={10}>
          <h4 className={classes.infoText}>
            <FormattedMessage
              id="wizard.beneficiaries.beneficiary.sentence1"
              defaultMessage={
                `Let's start with the basic information`}
            />
          </h4>
        </GridItem>

        <GridItem xs={12} sm={10}>
          {/*<GridContainer>*/}
          {/*<GridItem xs={4} sm={2}>*/}
          {/*  <FormLabel*/}
          {/*    className={*/}
          {/*      classes.labelHorizontal +*/}
          {/*      " " +*/}
          {/*      classes.labelHorizontalRadioCheckbox*/}
          {/*    }*/}
          {/*  >*/}
          {/*    Beneficiary Type:*/}
          {/*  </FormLabel>*/}
          {/*</GridItem>*/}

          {/*<GridItem xs={8} sm={4}>*/}
          {/*  {this.state.legal_entity_types_list.map((item) => {*/}
          {/*    return (*/}
          {/*      <div*/}
          {/*        key={item.id}*/}
          {/*        className={*/}
          {/*          classes.checkboxAndRadio +*/}
          {/*          " " +*/}
          {/*          classes.checkboxAndRadioHorizontal*/}
          {/*        }*/}
          {/*      >*/}
          {/*        <FormControlLabel*/}
          {/*          control={*/}
          {/*            <Radio*/}
          {/*              checked={*/}
          {/*                this.state.legal_type == item.id*/}
          {/*              }*/}
          {/*              onChange={this.handleChange}*/}
          {/*              value={String(item.id)}*/}
          {/*              name="legal_type"*/}
          {/*              aria-label={item.nickname}*/}
          {/*              icon={*/}
          {/*                <FiberManualRecord className={classes.radioUnchecked} />*/}
          {/*              }*/}
          {/*              checkedIcon={*/}
          {/*                <FiberManualRecord className={classes.radioChecked} />*/}
          {/*              }*/}
          {/*              classes={{*/}
          {/*                checked: classes.radio,*/}
          {/*                root: classes.radioRoot*/}
          {/*              }}*/}
          {/*            />*/}
          {/*          }*/}
          {/*          classes={{*/}
          {/*            label: classes.label*/}
          {/*          }}*/}
          {/*          label={item.nickname}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}

          {/*</GridItem>*/}
          {/*<GridItem xs={12} sm={6}>*/}
          {this.getBeneficiaryDetails()}
          {/*</GridItem>*/}
          {/*</GridContainer>*/}
        </GridItem>


        <GridItem xs={12} sm={12} md={12} lg={10}>
          {/* <CustomInput
            success={this.state.nickname_state === "success"}
            error={this.state.nickname_state === "error"}
            labelText={
              <span>
                Nickname
              </span>
            }
            id="nickname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.nickname,
              onChange: event => this.change(event, "nickname", "length", 3),
            }}
          /> */}
          <CustomInput
            labelText={
              <span>
                Email
              </span>
            }
            id="ben_email_main"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              value: this.state.ben_email_main,
              onChange: event => this.change(event, "ben_email_main", "email"),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={10}>
        <h4 className={classes.infoText}>
            <FormattedMessage
              id="wizard.beneficiaries.beneficiary.sentence2"
              defaultMessage={
                `And select to who this beneficiary will apply`}
            />
          </h4>

          {(this.state.client_id < 1 && this.state.team_id < 1 && this.state.division_id < 1 && this.state.entity_id < 1) &&
            <p><em style={{color: "red"}}>Please select one of the following 4 options</em></p>
          }
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12} lg={6}>
              {/* <FormControl
                fullWidth
                error={this.state.client_id < 1 && this.state.team_id < 1 && this.state.division_id < 1 && this.state.entity_id < 1 }
                className={classes.selectFormControl}
              >
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Client
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.client_id}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    // disabled: !this.state.edit_mode,
                    name: "client_id",
                    id: "client_id"
                  }}
                >
                  <MenuItem
                    key="0x0"
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Select client
                  </MenuItem>
                  {this.state.client_list.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={item.id}
                      >
                        {item.last_name}, {item.first_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              <CustomReactSelect
                label="Client"
                options={client_list_select_options}
                value={this.state.client_id}
                onChange={this.handleCustomReactSelectChange("client_id")}
                isClearable={true}
              // isDisabled={!this.state.edit_mode}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6}>
              {/* <FormControl
                fullWidth
                error={this.state.client_id < 1 && this.state.team_id < 1 && this.state.division_id < 1 && this.state.entity_id < 1 }
                className={classes.selectFormControl}
              >
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Team
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.team_id}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    // disabled: !this.state.edit_mode,
                    name: "team_id",
                    id: "team_id"
                  }}
                >
                  <MenuItem
                    key="0x0"
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Select team
                  </MenuItem>
                  {this.state.team_list.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={item.id}
                      >
                        {item.nickname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              <CustomReactSelect
                label="Team"
                options={team_list_select_options}
                value={this.state.team_id}
                onChange={this.handleCustomReactSelectChange("team_id")}
                isClearable={true}
              // isDisabled={!this.state.edit_mode}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6}>
              {/* <FormControl
                fullWidth
                error={this.state.client_id < 1 && this.state.team_id < 1 && this.state.division_id < 1 && this.state.entity_id < 1 }
                className={classes.selectFormControl}
              >
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Division
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.division_id}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    // disabled: !this.state.edit_mode,
                    name: "division_id",
                    id: "division_id"
                  }}
                >
                  <MenuItem
                    key="0x0"
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Select division
                  </MenuItem>
                  {this.state.division_list.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={item.id}
                      >
                        {item.nickname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              <CustomReactSelect
                label="Division"
                options={division_list_select_options}
                value={this.state.division_id}
                onChange={this.handleCustomReactSelectChange("division_id")}
                isClearable={true}
              // isDisabled={!this.state.edit_mode}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6}>
              {/* <FormControl
                fullWidth
                error={this.state.client_id < 1 && this.state.team_id < 1 && this.state.division_id < 1 && this.state.entity_id < 1 }
                className={classes.selectFormControl}
              >
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Entity
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.entity_id}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    // disabled: !this.state.edit_mode,
                    name: "entity_id",
                    id: "entity_id"
                  }}
                >
                  <MenuItem
                    key="0x0"
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Select entity
                  </MenuItem>
                  {this.state.entity_list.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value={item.id}
                      >
                        {item.nickname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              <CustomReactSelect
                label="Entity"
                options={entity_list_select_options}
                value={this.state.entity_id}
                onChange={this.handleCustomReactSelectChange("entity_id")}
                isClearable={true}
              // isDisabled={!this.state.edit_mode}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step1Beneficiary);
