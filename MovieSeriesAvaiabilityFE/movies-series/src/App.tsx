import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

function App() {
  const [term, setTerm] = useState("");
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5297/Stream?term=${term}`);
    const data = await response.json();
    setDisplayName(data.display_name);
    setUrl(data.url);
    setLogo(data.icon);
    setPicture(data.picture);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                placeholder="Search for a TV show or movie"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      {displayName === null && (
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <p className="text-center">
              Search for a TV show or movie to see where you can watch it.
            </p>
          </Col>
        </Row>
      )}
      {displayName && url && logo && picture && (
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <p className="text-center">{displayName}</p>
            <Col className="d-flex justify-content-center">
              <img
                src={picture}
                alt="Poster"
                style={{ maxWidth: "500px", maxHeight: "250px" }}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <a href={url} target="_blank" rel="noreferrer">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ maxWidth: "92px", maxHeight: "40px" }}
                />
              </a>
            </Col>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
