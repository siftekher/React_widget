import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CardHeader from "../../components/Card/CardHeader";

import CustomInput from "../CustomInput/CustomInput";
import Button from "../CustomButtons/Button";
import { cardTitle } from "../../assets/jss/material-dashboard-pro-react";
import NavPills from "components/NavPills/NavPills.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import { API } from "aws-amplify";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const styles = {
  cardTitle,
  ...customCheckboxRadioSwitch,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    "& small": {
      fontSize: "80%",
      fontWeight: "400"
    }
  },
  cardCategory: {
    marginTop: "10px",
    color: "#999999 !important",
    textAlign: "center"
  },
  description: {
    color: "#999999"
  },
  updateProfileButton: {
    float: "right"
  },
  title: {
    color: "#3C4858",
    textDecoration: "none"
  },

  formCategory: {
    marginBottom: "0",
    color: "#999999",
    fontSize: "14px",
    padding: "10px 0 10px"
  },
  registerButton: {
    float: "right"
  },
  flexEnd: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class BeneficiaryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // register form
      currencies_list: [],
      currencies_list_priority: [],
      legal_type: '',
      loaded: false,
      is_loading: true,
      nickname: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      security_entities: [],
      security_entities_forexsport: false,
      security_entities_forexworldwide: false,
      security_entities_forexstudent: false,

      country_list: [],
      country_list_prio: [],
      legal_entity_types_list: []
    };
  }

  componentDidMount() {
    if (this.props.beneficiary_detail_id) {
      // if (this.props.client_detail_id) {
      this.props.loadBeneficiaryDetailsRequest();
      API.get("beneficiaries", `/get/id/${this.props.beneficiary_detail_id}`)
        .then(beneficiary_detail => {
          // console.log(beneficiary_detail);
          this.setState({
            loaded: true,
            is_loading: false,
            //data from here
            id: beneficiary_detail.id,
            nickname: beneficiary_detail.nickname,
            legal_type: beneficiary_detail.legal_type,
            ben_legal_name: beneficiary_detail.ben_legal_name,

            //show ben address data from here
            ben_address_line_1: beneficiary_detail.ben_address_line_1,
            ben_address_line_2: beneficiary_detail.ben_address_line_2,
            ben_address_suburb: beneficiary_detail.ben_address_suburb,
            ben_address_state: beneficiary_detail.ben_address_state,
            ben_address_postcode:
              beneficiary_detail.ben_address_postcode,
            ben_address_country:
              beneficiary_detail.ben_address_country,

            //show bank address data from here
            bank_legal_name: beneficiary_detail.bank_legal_name,
            bank_address_line_1: beneficiary_detail.bank_address_line_1,
            bank_address_line_2: beneficiary_detail.bank_address_line_2,
            bank_address_suburb: beneficiary_detail.bank_address_suburb,
            bank_address_state: beneficiary_detail.bank_address_state,
            bank_address_postcode:
              beneficiary_detail.bank_address_postcode,
            bank_address_country:
              beneficiary_detail.bank_address_country,

            // email: beneficiary_detail.email,
            // portal_account_created: beneficiary_detail.portal_account_created,
            // portal_email_confirmed: beneficiary_detail.portal_email_confirmed,
            // portal_mobile_confirmed: beneficiary_detail.portal_mobile_confirmed,
            // portal_last_login_datetime:
            //   beneficiary_detail.portal_last_login_datetime,
            // first_name: beneficiary_detail.first_name,
            // middle_name: beneficiary_detail.middle_name,
            // last_name: beneficiary_detail.last_name,

            //show bank detail data from here
            account_currency: beneficiary_detail.account_currency,
            swift_code: beneficiary_detail.swift_code,
            account_number: beneficiary_detail.account_number,
            aba_routing_number: beneficiary_detail.aba_routing_number,
            bsb_code: beneficiary_detail.bsb_code,
            sort_code: beneficiary_detail.sort_code,
            iban: beneficiary_detail.iban,
            //show contact data from here
            ben_telephone_work: beneficiary_detail.ben_telephone_work,
            ben_telephone_afterhours: beneficiary_detail.ben_telephone_afterhours,
            ben_telephone_mobile: beneficiary_detail.ben_telephone_mobile,

            ben_email_main: beneficiary_detail.ben_email_main,
            ben_email_secondary: beneficiary_detail.ben_email_secondary
          });
          this.props.loadBeneficiaryDetailsSuccess();
        })
        .catch(error => {
          console.log(error);
        });
    }

    API.get("currencies", `/list_not_deleted`)
      .then(response => {
        // console.log(response);
        this.setState({
          //currencies_list: response.fullList,
          currencies_list_priority: response
        });
      })
      .catch(error => {
        console.log(error);
      });

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

    API.get("admin", `/legal-entity-types/get`)
      .then(response => {
        this.setState({
          legal_entity_types_list: response
        });
      })
      .catch(error => {
        console.log(error);
      });

  }
/*
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('BENEFICIARY ID -> ');
    console.log(this.props.beneficiary_detail_id);

    if (prevProps.beneficiary_detail_id !== this.props.beneficiary_detail_id) {
      this.props.loadBeneficiaryDetailsRequest();
      API.get("beneficiaries", `/get/id/${this.props.beneficiary_detail_id}`)
        .then(beneficiary_detail => {
          // console.log(beneficiary_detail);
          this.setState({
            loaded: true,
            is_loading: false,

            //data from beneficiary
            nickname: beneficiary_detail.nickname,
            legal_type: beneficiary_detail.legal_type,
            ben_legal_name: beneficiary_detail.bank_legal_name,

            //portal data
            email: beneficiary_detail.email,

            portal_account_created: beneficiary_detail.portal_account_created,
            portal_email_confirmed: beneficiary_detail.portal_email_confirmed,
            portal_mobile_confirmed: beneficiary_detail.portal_mobile_confirmed,
            portal_last_login_datetime:
              beneficiary_detail.portal_last_login_datetime,
            first_name: beneficiary_detail.first_name,
            middle_name: beneficiary_detail.middle_name,
            last_name: beneficiary_detail.last_name,

            //data from ben address
            ben_address_line_1: beneficiary_detail.ben_address_line_1,
            ben_address_line_2: beneficiary_detail.ben_address_line_2,
            ben_address_suburb: beneficiary_detail.ben_address_suburb,
            ben_address_state: beneficiary_detail.ben_address_state,
            ben_address_postcode:
              beneficiary_detail.ben_address_postcode,
            ben_address_country:
              beneficiary_detail.ben_address_country,

            //data from bank address
            bank_legal_name: beneficiary_detail.bank_legal_name,
            bank_address_line_1: beneficiary_detail.bank_address_line_1,
            bank_address_line_2: beneficiary_detail.bank_address_line_2,
            bank_address_suburb: beneficiary_detail.bank_address_suburb,
            bank_address_state: beneficiary_detail.bank_address_state,
            bank_address_postcode: beneficiary_detail.bank_address_postcode,
            bank_address_country: beneficiary_detail.bank_address_country,

            //data from bank details
            account_currency: beneficiary_detail.account_currency,
            swift_code: beneficiary_detail.swift_code,
            account_number: beneficiary_detail.account_number,
            aba_routing_number: beneficiary_detail.aba_routing_number,
            bsb_code: beneficiary_detail.bsb_code,
            sort_code: beneficiary_detail.sort_code,

            //data from contacts
            ben_telephone_work: beneficiary_detail.ben_telephone_work,
            ben_telephone_afterhours: beneficiary_detail.ben_telephone_afterhours,
            ben_telephone_mobile: beneficiary_detail.ben_telephone_mobile,
            ben_email_main: beneficiary_detail.ben_email_main,
            ben_email_secondary: beneficiary_detail.ben_email_secondary
          });
          this.props.loadBeneficiaryDetailsSuccess();
        })
        .catch(error => {
          console.log(error);
        });

      API.get("system", `/countries/get-all`)
        .then(response => {
          this.setState({
            country_list: response.fullList,
            country_list_prio: response.priorityonly
          });
        })
        .catch(error => {
          console.log(error);
        });

    }
  }
*/

  async saveBeneficiaryDetail(beneficiary_detail) {
    // console.log(beneficiary_detail); return;
    return API.put(
      "beneficiaries",
      `/update/id/${this.props.beneficiary_detail_id}`,
      {
        body: beneficiary_detail
      }
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleChangeLegal = event => {
    this.setState({ legal_type: event.target.value });
  };

  handleSelectChange = event => {
    if(event.target.name == "account_currency" && event.target.value == "123456") {
       return;
    }
    if(event.target.name == "ben_address_country" && event.target.value == "123456") {
      return;
    }
    if(event.target.name == "bank_address_country" && event.target.value == "123456") {
      return;
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  //function to handle toggleEdit switch 
  toggleEdit = () => {
    const edit_mode = !this.state.edit_mode;
    this.setState({ edit_mode: edit_mode });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    // console.log(this.state);
    const {
      id,
      nickname,
      legal_type,
      ben_legal_name,
      // email

      //ben address
      ben_address_line_1,
      ben_address_line_2,
      ben_address_suburb,
      ben_address_state,
      ben_address_postcode,
      ben_address_country,

      //bank address
      bank_legal_name,
      bank_address_line_1,
      bank_address_line_2,
      bank_address_suburb,
      bank_address_state,
      bank_address_postcode,
      bank_address_country,

      //bank details
      account_currency,
      swift_code,
      account_number,
      aba_routing_number,
      bsb_code,
      sort_code,
      iban,

      //contacts
      ben_telephone_work,
      ben_telephone_afterhours,
      ben_telephone_mobile,
      ben_email_main,
      ben_email_secondary,

      ben_abn_name,
      ben_acn_name,
      ben_trust_name,

    } = this.state;
    try {
      await this.saveBeneficiaryDetail({
        id: id,
        nickname: nickname,
        legal_type: legal_type,
        ben_legal_name: ben_legal_name,

        ben_address_line_1: ben_address_line_1,
        ben_address_line_2: ben_address_line_2,
        ben_address_suburb: ben_address_suburb,
        ben_address_state: ben_address_state,
        ben_address_postcode: ben_address_postcode,
        ben_address_country: ben_address_country,

        bank_legal_name: bank_legal_name,
        bank_address_line_1: bank_address_line_1,
        bank_address_line_2: bank_address_line_2,
        bank_address_suburb: bank_address_suburb,
        bank_address_state: bank_address_state,
        bank_address_postcode: bank_address_postcode,
        bank_address_country: bank_address_country,

        account_currency: account_currency,
        swift_code: swift_code,
        account_number: account_number,
        aba_routing_number: aba_routing_number,
        bsb_code: bsb_code,
        sort_code: sort_code,
        iban: iban,

        ben_telephone_work: ben_telephone_work,
        ben_telephone_afterhours: ben_telephone_afterhours,
        ben_telephone_mobile: ben_telephone_mobile,
        ben_email_main: ben_email_main,
        ben_email_secondary: ben_email_secondary,

        ben_abn_name: ben_abn_name,
        ben_acn_name: ben_acn_name,
        ben_trust_name: ben_trust_name

      });
    } catch (e) {
      //alert(e);
    }

  };

  getClientPortalCardContent() {
    return this.state.portal_account_created ? (
      <React.Fragment>
        <ul>
          <li>{this.state.first_name} has a client portal registration</li>
          {this.state.portal_account_created ? (
            <li>
              {this.state.first_name}
              's client portal registration has not yet been confirmed
            </li>
          ) : null}
          {this.state.portal_account_created ? (
            <li>{this.state.first_name} has not yet logged onto the portal</li>
          ) : null}
        </ul>
        <Button
        // color="primary"
        // type="submit"
        // className={classes.updateProfileButton}
        >
          Login to Client Portal
        </Button>
        <Button
        // color="primary"
        // type="submit"
        // className={classes.updateProfileButton}
        >
          Change user password
        </Button>
      </React.Fragment>
    ) : (
        <React.Fragment>
          <p>
            {this.state.first_name} <strong>DOES NOT HAVE</strong> a client portal
            registration
        </p>
          <p>
            Clicking the button below will initiate the account creation
          procedure. This will send an email to {this.state.email} advising them
            of account opening and requesting email confirmation.
        </p>
          <Button
            color="primary"
          // type="submit"
          // className={classes.updateProfileButton}
          >
            Create client portal account
        </Button>
        </React.Fragment>
      );
  }

  render() {
    const { classes } = this.props;

    if (!this.state.loaded) {
      return null;
    }

    const swiftOption = {5: 5, 8: 8, 9: 9};
    const bsbOption = {1: 1};
    const sortCodeOption = {8: 8, 9: 9};
    const abaRoutingOption = {5:5};
    const ibanOption = {8: 8, 9: 9};

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <div className={classes.flexEnd}>
                  <h4 className={classes.cardIconTitle}>
                    {this.state.edit_mode ? `Edit Record: ` : `View Record: `}
                    {this.state.nickname}
                  </h4>
                  <div>
                  {(this.props.app_state.current_staff_super_admin) &&
                    (<React.Fragment>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.edit_mode}
                            onChange={() => this.toggleEdit()}
                            value="edit_mode"
                            classes={{
                              switchBase: classes.switchBase,
                              checked: classes.switchChecked,
                              icon: classes.switchIcon,
                              iconChecked: classes.switchIconChecked,
                              bar: classes.switchBar
                            }}
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label={this.state.edit_mode ? "Edit Mode" : "Read Only"}
                      />
                   </React.Fragment>)
                  }
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <NavPills
                  color="info"
                  tabs={[
                    {
                      tabButton: "Beneficiary",
                      tabContent: (
                        <div style={{ padding: 20 }}>
                          <form onSubmit={this.handleSubmit}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="nickname"
                                  id="nickname"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.nickname ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={4}>
                                  {this.state.legal_entity_types_list.map((item) => {
                                    return (
                                      <div
                                        key={item.id}
                                        className={
                                          classes.checkboxAndRadio +
                                          " " +
                                          classes.checkboxAndRadioHorizontal
                                        }
                                      >
                                        <FormControlLabel
                                          control={
                                            <Radio
                                              disabled={ !this.state.edit_mode}
                                              checked={
                                                this.state.legal_type == item.id
                                              }
                                              onChange={this.handleChangeLegal}
                                              value={String(item.id)}
                                              name="legal_type"
                                              aria-label={item.nickname}
                                              icon={
                                                <FiberManualRecord className={classes.radioUnchecked} />
                                              }
                                              checkedIcon={
                                                <FiberManualRecord className={classes.radioChecked} />
                                              }
                                              classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                              }}
                                            />
                                          }
                                          classes={{
                                            label: classes.label
                                          }}
                                          label={item.nickname}
                                        />
                                      </div>
                                    );
                                  })}

                              </GridItem>


                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Legal name"
                                  id="ben_legal_name"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.ben_legal_name || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            {(this.props.app_state.current_staff_super_admin) &&
                              (<React.Fragment>
                                <Button
                                  disabled={!this.state.edit_mode}
                                  color="primary"
                                  type="submit"
                                  className={classes.updateProfileButton}
                                >
                                  Update Beneficiary
                                </Button>
                              </React.Fragment>)
                            }
                          </form>
                        </div>
                      )
                    },
                    {
                      tabButton: "Ben Address",
                      tabContent: (
                        <div style={{ padding: 20 }}>
                          <form onSubmit={this.handleSubmit}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Residential Street Address (line 1)"
                                  id="ben_address_line_1"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.ben_address_line_1 ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Residential Street Address (line 2)"
                                  id="ben_address_line_2"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.ben_address_line_2 ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Suburb"
                                  id="ben_address_suburb"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.ben_address_suburb ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="State"
                                  id="ben_address_state"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.ben_address_state || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Postcode"
                                  id="ben_address_postcode"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.ben_address_postcode ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <FormControl
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
                                    value={this.state.ben_address_country || "0"}
                                    onChange={this.handleSelectChange}
                                    inputProps={{
                                      disabled: !this.state.edit_mode,
                                      name: "ben_address_country",
                                      id: "ben_address_country"
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
                                      })}

                                  </Select>
                                </FormControl>

                              </GridItem>
                            </GridContainer>

                            {(this.props.app_state.current_staff_super_admin) &&
                              (<React.Fragment>
                                <Button
                                  disabled={!this.state.edit_mode}
                                  color="primary"
                                  type="submit"
                                  className={classes.updateProfileButton}
                                >
                                  Update Address
                                </Button>
                              </React.Fragment>)
                            }
                          </form>
                        </div>
                      )
                    },
                    {
                      tabButton: "Bank Address",
                      tabContent: (
                        <div style={{ padding: 20 }}>
                          <form onSubmit={this.handleSubmit}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Bank Legal Name"
                                  id="bank_legal_name"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.bank_legal_name ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Bank Residential Street Address (line 1)"
                                  id="bank_address_line_1"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.bank_address_line_1 ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Bank Residential Street Address (line 2)"
                                  id="bank_address_line_2"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.bank_address_line_2 ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Bank Suburb"
                                  id="bank_address_suburb"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.bank_address_suburb ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Bank State"
                                  id="bank_address_state"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.bank_address_state || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Bank Postcode"
                                  id="bank_address_postcode"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.bank_address_postcode ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>

                                <FormControl
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
                                      disabled: !this.state.edit_mode,
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
                                      })}

                                  </Select>
                                </FormControl>
                              </GridItem>
                            </GridContainer>

                            {(this.props.app_state.current_staff_super_admin) &&
                              (<React.Fragment>
                                <Button
                                  disabled={!this.state.edit_mode}
                                  color="primary"
                                  type="submit"
                                  className={classes.updateProfileButton}
                                >
                                  Update Address
                                </Button>
                              </React.Fragment>)
                            }
                          </form>
                        </div>
                      )
                    },
                    {
                      tabButton: "Bank Detail",
                      tabContent: (
                        <div style={{ padding: 20 }}>
                          <form onSubmit={this.handleSubmit}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12} lg={6}>
                                <FormControl
                                  fullWidth
                                  // error={!this.state.client_id > 0}
                                  className={classes.selectFormControl}
                                >
                                  <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                  >
                                    Account Currency
                                  </InputLabel>
                                  <Select
                                    MenuProps={{
                                      className: classes.selectMenu
                                    }}
                                    classes={{
                                      select: classes.select
                                    }}
                                    value={this.state.account_currency || ""}
                                    onChange={this.handleSelectChange}
                                    inputProps={{
                                      disabled: !this.state.edit_mode,
                                      name: "account_currency",
                                      id: "account_currency"
                                    }}
                                  >
                                    <MenuItem
                                      key="0x0"
                                      disabled
                                      classes={{
                                        root: classes.selectMenuItem
                                      }}
                                    >
                                      Select account currency
                                    </MenuItem>
                                    {this.state.currencies_list_priority.map((item) => {
                                      return (
                                        <MenuItem
                                          key={item.id}
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected: classes.selectMenuItemSelected
                                          }}
                                          value={item.id}
                                        >
                                          {item.iso_alpha_3}: {item.full_name}
                                        </MenuItem>
                                      );
                                    })}

                                  </Select>
                                </FormControl>

                              </GridItem>
                            </GridContainer>
                            {(swiftOption.hasOwnProperty(this.state.account_currency)) &&
                            (
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                  <CustomInput
                                    labelText="Swift code"
                                    id="swift_code"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      disabled: !this.state.edit_mode,
                                      value:
                                        this.state.swift_code ||
                                        "",
                                      onChange: event => {
                                        this.handleChange(event);
                                      }
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>)
                            }

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Account Number"
                                  id="account_number"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value:
                                      this.state.account_number ||
                                      "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>
                            {(abaRoutingOption.hasOwnProperty(this.state.account_currency)) &&
                            (
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                  <CustomInput
                                    labelText="ABA Routing Number"
                                    id="aba_routing_number"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      disabled: !this.state.edit_mode,
                                      value:
                                        this.state.aba_routing_number ||
                                        "",
                                      onChange: event => {
                                        this.handleChange(event);
                                      }
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>)
                            }
                            {(bsbOption.hasOwnProperty(this.state.account_currency)) &&
                            (
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                  <CustomInput
                                    labelText="BSB code"
                                    id="bsb_code"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      disabled: !this.state.edit_mode,
                                      value:
                                        this.state.bsb_code ||
                                        "",
                                      onChange: event => {
                                        this.handleChange(event);
                                      }
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>)
                            }
                            {(sortCodeOption.hasOwnProperty(this.state.account_currency)) &&
                            (
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                  <CustomInput
                                    labelText="Sort code"
                                    id="sort_code"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      disabled: !this.state.edit_mode,
                                      value:
                                        this.state.sort_code || "",
                                      onChange: event => {
                                        this.handleChange(event);
                                      }
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>)
                            }
                            {(ibanOption.hasOwnProperty(this.state.account_currency)) &&
                            (
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                  <CustomInput
                                    labelText="IBAN"
                                    id="iban"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      disabled: !this.state.edit_mode,
                                      value:
                                        this.state.iban || "",
                                      onChange: event => {
                                        this.handleChange(event);
                                      }
                                    }}
                                  />
                                </GridItem>
                              </GridContainer>)
                            }

                            {(this.props.app_state.current_staff_super_admin) &&
                              (<React.Fragment>
                                <Button
                                  disabled={!this.state.edit_mode}
                                  color="primary"
                                  type="submit"
                                  className={classes.updateProfileButton}
                                >
                                  Update Bank Detail
                                </Button>
                              </React.Fragment>)
                            }
                          </form>
                        </div>
                      )
                    },
                    {
                      tabButton: "Contact",
                      tabContent: (
                        <div style={{ padding: 20 }}>
                          <form onSubmit={this.handleSubmit}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Work Telephone"
                                  id="ben_telephone_work"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value: this.state.ben_telephone_work || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="After Hours Telephone"
                                  id="ben_telephone_afterhours"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value: this.state.ben_telephone_afterhours || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Mobile Telephone"
                                  id="ben_telephone_mobile"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value: this.state.ben_telephone_mobile || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Primary Email"
                                  id="ben_email_main"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value: this.state.ben_email_main || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Secondary Email"
                                  id="ben_email_secondary"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: !this.state.edit_mode,
                                    value: this.state.ben_email_secondary || "",
                                    onChange: event => {
                                      this.handleChange(event);
                                    }
                                  }}
                                />
                              </GridItem>
                            </GridContainer>

                            {(this.props.app_state.current_staff_super_admin) &&
                              (<React.Fragment>
                                <Button
                                  disabled={!this.state.edit_mode}
                                  color="primary"
                                  type="submit"
                                  className={classes.updateProfileButton}
                                >
                                  Update Contact
                                </Button>
                              </React.Fragment>)
                            }
                          </form>
                        </div>
                      )
                    }
                  ]}
                />
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

BeneficiaryEdit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BeneficiaryEdit);
