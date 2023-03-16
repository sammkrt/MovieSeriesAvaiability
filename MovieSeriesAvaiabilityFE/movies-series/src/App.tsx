import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Button, Modal } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import StreamResult from "./components/StreamResult";
import BackgroundImage from "./components/BackgroundImage";
import { WatchListItem, StreamDataType } from "./types";
import uuid from "react-uuid";
import logo from "./img/logo2.png";
import "./App.css";

type ShowRemoveButton = {
  [key: string]: boolean;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streamData, setStreamData] = useState<StreamDataType | null>(null);
  const [watchlist, setWatchlist] = useState<WatchListItem[]>([]);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showWatchlistButton, setShowWatchlistButton] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState<ShowRemoveButton>(
    {}
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch("http://localhost:5297/api/WatchList");
      const data = await response.json();
      console.log(data);
      setWatchlist(data);
    };
    fetchWatchlist();
  }, []);

  const handleSearchSubmit = async (term: string) => {
    const response = await fetch(`http://localhost:5297/Stream?term=${term}`);
    if (!response.ok) {
      setErrorMessage("Couldn't find the movie or TV show.");
    } else {
      const data = await response.json();
      setStreamData({
        displayName: data.display_name,
        url: data.url,
        logo: data.icon,
        picture: data.picture,
        movieId: uuid(),
      });
      setSearchTerm(term);
      setIsSearching(true);
    }
  };

  const handleAddToWatchlist = async () => {
    if (streamData) {
      try {
        const { displayName, url, logo, picture, movieId } = streamData;
        const response = await fetch(
          "http://localhost:5297/api/WatchList/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movieId,
              term: searchTerm,
              title: displayName,
              url,
              icon: logo,
              picture,
            }),
          }
        );
        if (response.ok) {
          const newItem = {
            id: watchlist.length + 1,
            movieId,
            term: searchTerm,
            title: displayName,
            url,
            icon: logo,
            picture,
          };
          setWatchlist([...watchlist, newItem]);
          setSearchTerm("");
          setStreamData(null);
          setShowWatchlistButton(true);
        } else {
          setErrorMessage("This movie is already in your watchlist");
        }
      } catch (error) {
        setErrorMessage("Error adding to watchlist.");
      }
    }
  };
  const handleRemoveClick = async (movieId: string) => {
    const response = await fetch(
      `http://localhost:5297/api/WatchList/remove?id=${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setWatchlist(watchlist.filter((item) => item.movieId !== movieId));
    } else {
      setErrorMessage(
        `Error removing movie with ID ${movieId}: ${response.statusText}`
      );
    }
  };

  const handleItemClick = (movieId: string) => {
    setShowRemoveButton({
      ...showRemoveButton,
      [movieId]: !showRemoveButton[movieId],
    });
  };

  const handleToggleWatchlist = () => {
    setShowWatchlist(!showWatchlist);
  };

  const handleCloseModal = () => {
    setErrorMessage("");
  };

  return (
    <Container>
      <div>
        <div className={`background-image ${isSearching ? "blur" : ""}`}>
          <BackgroundImage />
        </div>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="text-center m-5">
          Check the movies and series availability
        </h1>
        <SearchForm onSubmit={handleSearchSubmit} />
        {!streamData && (
          <h4 className="bg-gradient-primary text-white text-center mt-5">
            Search for a TV show or movie to see where you can watch it.
          </h4>
        )}
        <Modal show={!!errorMessage} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {streamData && (
          <StreamResult
            displayName={streamData.displayName}
            url={streamData.url}
            logo={streamData.logo}
            picture={streamData.picture}
            onAddToWatchlist={handleAddToWatchlist}
          />
        )}
        <div className="card text-center mt-5 border border-0">
          <Button
            variant="secondary"
            onClick={handleToggleWatchlist}
            className="mr-7 "
            size="lg"
            style={{ display: showWatchlistButton ? "inline-block" : "none" }}
          >
            {showWatchlist ? "Hide Watchlist" : "Show Watchlist"}
          </Button>
        </div>
        {showWatchlist && watchlist.length > 0 && (
          <div className="d-flex justify-content-center mt-5">
            <Card style={{ width: "50rem" }}>
              <Card.Header style={{ fontWeight: "bold" }}>Name</Card.Header>
              <ListGroup variant="flush">
                {watchlist.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() => handleItemClick(item.movieId)}
                    style={{ cursor: "pointer" }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {item.term}
                    <Button
                      variant="danger"
                      size="sm"
                      data-movie-id={item.movieId}
                      onClick={() => {
                        handleRemoveClick(item.movieId);
                      }}
                      style={{
                        display: showRemoveButton[item.movieId]
                          ? "inline-block"
                          : "none",
                      }}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
