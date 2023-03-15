import React from "react";
import { Row, Col, Button } from "react-bootstrap";

interface StreamResultProps {
  displayName: string;
  url: string;
  logo: string;
  picture: string;
  onAddToWatchlist: () => void;
  //   onRemoveFromWatchlist: () => void;
}

const StreamResult: React.FC<StreamResultProps> = ({
  displayName,
  url,
  logo,
  picture,
  onAddToWatchlist,
  //   onRemoveFromWatchlist,
}) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col md={6}>
        <p className="text-center">{displayName}</p>
        <Col className="d-flex justify-content-center">
          <img
            src={picture}
            alt="Poster"
            style={{ maxWidth: "500px", maxHeight: "250px" }}
            className="img-thumbnail"
          />
        </Col>
        <Col className="d-flex justify-content-center mt-3">
          <Button
            size="sm"
            className="mr-10"
            variant="success"
            onClick={onAddToWatchlist}
          >
            Add to Watchlist
          </Button>{" "}
          {/* <Button
            size="sm"
            className="ml-2"
            variant="danger"
            onClick={onRemoveFromWatchlist}
          >
            Remove From Watch List
          </Button> */}
        </Col>
        <Col className="d-flex justify-content-center mt-5 ">
          <a className="btn btn-light" href={url} target="_blank" rel="noreferrer" role="button">
            {" "}
            <img
              src={logo}
              alt="Logo"
              style={{ maxWidth: "45", maxHeight: "20" }}
            />
          </a>
        </Col>
      </Col>
    </Row>
  );
};

export default StreamResult;
