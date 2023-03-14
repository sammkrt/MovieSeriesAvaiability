import React from 'react'
import { Navbar, Container } from "react-bootstrap";
const NavBar = () => {
    return (
        <Navbar bg="blue" variant="light">
        <Container>
          <Navbar.Brand className="fw fs-4" >
            <img
              alt=""
              src="https://www.deephouselounge.com/wp-content/uploads/2016/07/streamfinderlogo.png"
              width="80"
              height="40"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </Container>
      </Navbar> 
    )
}

    export default NavBar;