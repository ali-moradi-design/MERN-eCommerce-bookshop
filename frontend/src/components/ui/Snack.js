import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";

const Snack = () => {
  const [alert, setAlert] = React.useState({
    open: true,
    color: "#FFBA60",
  });
  return (
    <Snackbar
      open={alert.open}
      ContentProps={{
        style: {
          backgroundColor: alert.color,
        },
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      message={error}
      autoHideDuration={4000}
      onClose={() => setAlert({ ...alert, open: false })}
    />
  );
};

export default Snack;
