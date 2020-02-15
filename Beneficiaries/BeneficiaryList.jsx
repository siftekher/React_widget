import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

import { API } from "aws-amplify";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";

// @material-ui/icons
import Dvr from "@material-ui/icons/Dvr";
import Close from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// core components
// import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
// import Card from "components/Card/Card.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";


/**
 * ----------------------------------------------------------------------------
 * STYLING
 * ----------------------------------------------------------------------------
 */
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import matchSorter from "match-sorter";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};


/**
 * ----------------------------------------------------------------------------
 * CLASS - ClientList
 * ----------------------------------------------------------------------------
 */
class BeneficiaryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entity_list: []
    };
  }

  componentDidMount() {
    const { fetchBeneficiaryList } = this.props
    // console.log(this.props);
    fetchBeneficiaryList();
  }

  handle_delete_dialog_click = (item_to_delete) => {
    this.setState({ dialog_delete_confirm: false });
    API.put(
      "beneficiaries",
      `/update/id/${item_to_delete}`,
      {
        body: { deleted: true }
      }
    )
      .then(response => {
        console.log(response);
        this.props.fetchBeneficiaryList();
        // dispatch(receiveStaffList(response));
      })
      .catch(error => {
        console.log(error);
        // quickfix because of the api bug, so it returns api error because client talks to old database
        this.props.fetchBeneficiaryList();
      });
  };

  handle_delete_dialog_cancel = () => {
    this.setState({
      dialog_delete_confirm: false,
      dialog_delete_item: 0,
      dialog_delete_item_name: ""
    });
  };

  buildTableData() {
    // console.log(this.props);
    var beneficiary_list_length = this.props.beneficiaries.beneficiary_list.length;
    if (beneficiary_list_length  > 0) {

      return this.props.beneficiaries.beneficiary_list.map((prop, key) => {
        // console.log(prop);
        let client_name;
        if (prop.first_name !== null)
          client_name = prop.first_name+' '+prop.last_name;

        return {
          id: prop.id,
          nickname: prop.nickname,
          client_name: client_name,
          team_name: prop.team_name,
          division_name: prop.division_name,
          entity_name: prop.entity_name,
          // first_name: prop.first_name,
          // last_name: prop.last_name,
          // email: prop.email,
          // telephone_mobile: prop.telephone_mobile,
          // residential_street_suburb: prop.residential_street_suburb,
          // residential_street_country: prop.residential_street_country,
          actions: (
            <div className="actions-right">
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  // this.props.setBeneficiarySelectId(prop.id);
                  this.props.history.push(`/beneficiaries/edit/${prop.id}`); //${prop.id}
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>{" "}
              {/* use this button to remove the data row */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  var data = this.props.beneficiaries.beneficiary_list;
                  data.find((o, i) => {
                    if (o.id === prop.id) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      // data.splice(i, 1);

                      this.setState({
                        dialog_delete_confirm: true,
                        dialog_delete_item: prop.id,
                        dialog_delete_item_name: `${prop.nickname}`
                      })

                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>{" "}
            </div>
          )
        };
      });
      // console.log(data);
    }
  }

  render() {

    var team_name = this.props.beneficiaries.beneficiary_list.filter(u => u.team_name != null).map((prop, key) => {
      return (
        prop.team_name
      )
    });
    var team_name_unique = [...new Set(team_name)];
    var team_name_optionlist = team_name_unique.map((prop, key) => {
      return (
        <option value={prop}>{prop}</option>
      )
    });

    var division_name = this.props.beneficiaries.beneficiary_list.filter(u => u.division_name != null).map((prop, key) => {
      return (
        prop.division_name
      )
    });
    var division_name_unique = [...new Set(division_name)];
    var division_name_optionlist = division_name_unique.map((prop, key) => {
      return (
        <option value={prop}>{prop}</option>
      )
    });

    var entity_name = this.props.beneficiaries.beneficiary_list.filter(u => u.entity_name != null).map((prop, key) => {
      return (
        prop.entity_name
      )
    });
    var entity_name_unique = [...new Set(entity_name)];
    var entity_name_optionlist = entity_name_unique.map((prop, key) => {
      return (
        <option value={prop}>{prop}</option>
      )
    });


    return (
    <React.Fragment>
      <ReactTable
        // data={this.state.entity_list}
        data={this.buildTableData()}
        filterable
        columns={[
          {
            Header: "Beneficiary Name",
            accessor: "nickname",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["nickname"] }),
            filterAll: true,
            // maxWidth: 200
          },
          // {
          //   Header: "first_name",
          //   accessor: "first_name",
          //   filterMethod: (filter, rows) =>
          //     matchSorter(rows, filter.value, { keys: ["first_name"] }),
          //   filterAll: true,
          //   maxWidth: 250
          // },
          // {
          //   Header: "last_name",
          //   accessor: "last_name",
          //   filterMethod: (filter, rows) =>
          //     matchSorter(rows, filter.value, { keys: ["last_name"] }),
          //   filterAll: true,
          //   maxWidth: 150
          // },
          {
            Header: "Applies to Client",
            accessor: "client_name",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["client_name"] }),
            filterAll: true,
            // maxWidth: 150
          },
          {
            Header: "Applies to Team",
            accessor: "team_name",
            /*filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["team_name"] }),
            filterAll: true,
            maxWidth: 200*/
            filterMethod: (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              return row[filter.id] == filter.value;
            },
            Filter: ({ filter, onChange }) => (
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
              >
                <option value="all">Show All</option>
                {team_name_optionlist}
              </select>)
          },
          {
            Header: "Applies to Division",
            accessor: "division_name",
            /*filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["division_name"] }),
            filterAll: true,
            maxWidth: 200*/
            filterMethod: (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              return row[filter.id] == filter.value;
            },
            Filter: ({ filter, onChange }) => (
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
              >
                <option value="all">Show All</option>
                {division_name_optionlist}
              </select>)
          },
          {
            Header: "Applies to Entity",
            accessor: "entity_name",
            /*filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["entity_name"] }),
            filterAll: true,
            maxWidth: 200*/
            filterMethod: (filter, row) => {
              if (filter.value === "all") {
                return true;
              }
              return row[filter.id] == filter.value;
            },
            Filter: ({ filter, onChange }) => (
              <select
                onChange={event => onChange(event.target.value)}
                style={{ width: "100%" }}
                value={filter ? filter.value : "all"}
              >
                <option value="all">Show All</option>
                {entity_name_optionlist}
              </select>)
          },
          // {
          //   Header: "First Name",
          //   accessor: "first_name",
          //   filterMethod: (filter, rows) =>
          //     matchSorter(rows, filter.value, { keys: ["first_name"] }),
          //   filterAll: true,
          //   maxWidth: 150
          // },
          // {
          //   Header: "Email",
          //   accessor: "email",
          //   filterMethod: (filter, rows) =>
          //     matchSorter(rows, filter.value, { keys: ["email"] }),
          //   filterAll: true,
          //   maxWidth: 450
          // },
          // {
          //   Header: "Mobile",
          //   accessor: "telephone_mobile",
          //   filterMethod: (filter, rows) =>
          //     matchSorter(rows, filter.value, { keys: ["telephone_mobile"] }),
          //   filterAll: true,
          //   maxWidth: 150
          // },
          // {
          //   Header: "Location",
          //   accessor: "residential_street_suburb",
          //   filterMethod: (filter, rows) =>
          //     matchSorter(rows, filter.value, { keys: ["residential_street_suburb"] }),
          //   filterAll: true
          // },
          // {
          //   Header: "Country",
          //   accessor: "residential_street_country",
          //   filterMethod: (filter, rows) =>
          //     matchSorter(rows, filter.value, { keys: ["residential_street_country"] }),
          //   filterAll: true
          // },
          {
            Header: "Actions",
            accessor: "actions",
            sortable: false,
            filterable: false
          }
        ]}
        defaultSorted={[
          {
            id: "entity_name",
            desc: false
          },
          {
            id: "division_name",
            desc: false
          },
          {
            id: "team_name",
            desc: false
          },
          {
            id: "client_name",
            desc: false
          },
          {
            id: "nickname",
            desc: false
          },
        ]}
        defaultPageSize={10}
        // showPaginationTop
        showPaginationBottom
        className="-highlight"
      />

      <Dialog
          open={this.state.dialog_delete_confirm}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure that you wish to <strong>delete</strong> beneficiary record {this.state.dialog_delete_item_name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handle_delete_dialog_cancel} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handle_delete_dialog_click(this.state.dialog_delete_item)} color="danger" autoFocus>
              Delete Record
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(BeneficiaryList));
