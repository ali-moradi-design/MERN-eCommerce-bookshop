import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const loader = () => {
  return (
    <Grid container justify="center">
      <Grid item style={{ padding: "5rem", marginBottom: "19rem" }}>
        <CircularProgress size="5rem" />
      </Grid>
    </Grid>
  );
};

export default loader;
