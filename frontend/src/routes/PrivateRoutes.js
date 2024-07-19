import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TableUser from "../components/TableUser";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
function PrivateRoutes(props) {
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
}

export default PrivateRoutes;
