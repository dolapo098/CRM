import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
// import DataTableDetails from "./DataTableDetails";
import { complaintsService, authenticationService } from "../_services";
import { roles } from "../_helper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export function PaginationTab(props) {
  const currentUser = authenticationService.currentUserValue;
  const { page, pageSize, setPageNumber, totalPages } = props.pagObj;

  const classes = useStyles();

  const handleChange = (event, value) => {
    setPageNumber(value);
    if (currentUser.role === roles.client) {
      complaintsService.getAll({ page, pageSize });
    } else if (currentUser.role === roles.client_engagement_officer) {
      complaintsService.clientOfficerGetComplaints({ page, pageSize });
    }
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={totalPages}
        // color='primary'
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
