import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Button } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import StreamResult from "./components/StreamResult";
import BackgroundImage from "./components/BackgroundImage";
import { WatchListItem, StreamDataType } from "./types";
import uuid from "react-uuid";
import logo from './img/logo2.png';
import "./App.css";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streamData, setStreamData] = useState<StreamDataType | null>(null);
  const [watchlist, setWatchlist] = useState<WatchListItem[]>([]);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showWatchlistButton, setShowWatchlistButton] = useState(false);

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
    const data = await response.json();
    setStreamData({
      displayName: data.display_name,
      url: data.url,
      logo: data.icon,
      picture: data.picture,
      movieId: uuid(),
    });
    setSearchTerm(term);
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
          alert("Added to watchlist!");
          setSearchTerm("");
          setStreamData(null);
          setShowWatchlistButton(true);
        } else {
          alert("Error adding to watchlist.");
        }
      } catch (error) {
        alert("Error adding to watchlist.");
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
      // alert("Removed from watchlist!");
    } else {
      alert("Error removing from watchlist.");
    }
  };
  const handleItemClick = (event: React.MouseEvent, movieId: string) => {
    const target = event.target as HTMLElement;
    const removeButton = target.querySelector(
      `button[data-movie-id="${movieId}"]`
    ) as HTMLElement;

    if (removeButton) {
      removeButton.style.display =
        removeButton.style.display === "none" ? "inline-block" : "none";
    }
  };
  const handleToggleWatchlist = () => {
    setShowWatchlist(!showWatchlist);
  };

  return (
    <Container>
      <div>
        <BackgroundImage />
        <img src={logo} alt="Logo" className="logo" />
        <h1 className=" text-center m-5">
          Check the movies and series availability
        </h1>
        <SearchForm onSubmit={handleSearchSubmit} />
        {!streamData && (
          <h4 className="bg-gradient-primary text-white text-center mt-5">
            Search for a TV show or movie to see where you can watch it.
          </h4>
        )}
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
              <Card.Header>Name</Card.Header>
              <ListGroup variant="flush">
                {watchlist.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={(event) => handleItemClick(event, item.movieId)}
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
                      style={{ display: "none" }}
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
