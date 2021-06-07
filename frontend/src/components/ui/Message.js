import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Message = ({ severity, children }) => {
  return (
    <Alert style={{ marginBottom: "10rem" }} severity={severity}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "error",
};

export default Message;
