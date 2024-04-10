import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { UserDataContext } from "../contexts/UserDataContext";
import { UserDetails } from "../components/UserDetails";
import { logoutUser } from "../services/authentication/logoutUser";
import logoutIcon from "../assets/logout-icon.png";

export const DashboardPage = () => {
  const {
    state: { userData },
    dispatch,
  } = useContext(UserDataContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser(dispatch, navigate);
  };

  return (
    <Container>
      <Row>
        <Col md={1} className="m-auto" style={{ width: "800px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <p className="fs-1 mb-2 text-white fw-semibold">Dashboard</p>
            <img
              src={logoutIcon}
              alt="logout"
              style={{ width: "35px", cursor: "pointer" }}
              title="logout"
              onClick={logoutHandler}
            />
          </div>
          <Accordion className="pb-3 border-bottom">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <p className="fs-5 mb-1 fw-semibold">Account Details</p>
              </Accordion.Header>
              <Accordion.Body className="p-2 pb-3">
                <UserDetails userData={userData} dispatch={dispatch} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/*  */}
        </Col>
      </Row>
    </Container>
  );
};
