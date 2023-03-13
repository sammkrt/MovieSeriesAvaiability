import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "react-router-dom";

function App() {
  const [term, setTerm] = useState("");
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5297/Stream?term=${term}`);
    const data = await response.json();
    setDisplayName(data.display_name);
    setUrl(data.url);
    setLogo(data.icon);
    setPicture(data.picture);
  };

  const handleAddToWatchlist = async () => {
    const response = await fetch("http://localhost:5297/api/WatchList/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: displayName,
        url: url,
        logo: logo,
        picture: picture,
      }),
    });
    if (response.ok) {
      alert("Added to watchlist!");
    } else {
      alert("Error adding to watchlist.");
    }
  };

const handleRemoveFromWatchlist = async (title: string) => {
  const response = await fetch("http://localhost:5297/api/WatchList/watchlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  if (response.ok) {
    alert("Removed from watchlist!");
  } else {
    alert("Error removing from watchlist.");
  }
};

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1 className="text-center">Check the movies and series availability</h1>
        </Col>
      </Row>
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
            <p className="text-center">
              {displayName}
            </p>
            <Col className="d-flex justify-content-center">
            <img
                src={picture}
                alt="Poster"
                style={{ maxWidth: "500px", maxHeight: "250px" }}
              />
              </Col>
              <Col className="d-flex justify-content-center mb-3">
              <Button variant="success" onClick={handleAddToWatchlist}>
                Add to Watchlist
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => handleRemoveFromWatchlist(displayName)}
                disabled={!watchlist.includes(displayName)}
              >
                Remove From Watch List
              </Button>
            </Col>
            <Col  className="d-flex justify-content-center">
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
