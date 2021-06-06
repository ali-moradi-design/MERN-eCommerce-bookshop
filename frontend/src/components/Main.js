import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const Main = () => {
  return (
    <main>
      <Container maxWidth="lg">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        />
      </Container>
    </main>
  );
};

export default Main;
