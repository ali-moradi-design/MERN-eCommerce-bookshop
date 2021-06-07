import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Grid container justify="center">
        <Grid item sm={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
