import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Button } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import StreamResult from "./components/StreamResult";
import BackgroundImage from "./components/BackgroundImage";
import WatchlistPage from "./components/WatchListPage";
import NavBar from "./components/Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

export interface WatchListItem {
  id: number;
  movieId: string;
  term: string;
  title: string;
  url: string;
  icon: string;
  picture: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streamData, setStreamData] = useState<{
    displayName: string;
    url: string;
    logo: string;
    picture: string;
    movieId: string;
  } | null>(null);
  const [watchlist, setWatchlist] = useState<WatchListItem[]>([]);
  const [showWatchlist, setShowWatchlist] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch("http://localhost:5297/api/WatchList");
      const data = await response.json();
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
      movieId: data.id,
    });
    setSearchTerm(term);
  };

  const handleAddToWatchlist = async () => {
    if (streamData) {
      const response = await fetch("http://localhost:5297/api/WatchList/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: streamData.movieId,
          term: searchTerm,
          title: streamData.displayName,
          url: streamData.url,
          icon: streamData.logo,
          picture: streamData.picture,
        }),
      });
      if (response.ok) {
        setWatchlist([...watchlist, {
          id: watchlist.length + 1,
          movieId: streamData.movieId,
          term: searchTerm,
          title: streamData.displayName,
          url: streamData.url,
          icon: streamData.logo,
          picture: streamData.picture,
        }]);
        alert("Added to watchlist!");
      } else {
        alert("Error adding to watchlist.");
      }
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (streamData) {
      const response = await fetch(
        `http://localhost:5297/api/WatchList/remove?id=${streamData.movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Removed from watchlist!");
      } else {
        alert("Error removing from watchlist.");
      }
    }
  };
  const handleRemoveClick = async (movieId: string) => {
    const response = await fetch(`http://localhost:5297/api/WatchList/remove?movieId=${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // onRemoveFromWatchList(movieId);
      alert("Removed from watchlist!");
    } else {
      alert("Error removing from watchlist.");
    }
  }

  const handleToggleWatchlist = () => {
    setShowWatchlist(!showWatchlist);
  };

  return (
    <Container>
      <div >
        <BackgroundImage />
        <NavBar />
        <h1 className="text-center mt-5">
          Check the movies and series availability
        </h1>
        <SearchForm onSubmit={handleSearchSubmit} />
        {!streamData && (
          <p className="text-center mt-5">
            Search for a TV show or movie to see where you can watch it.
          </p>
        )}
        {streamData && (
          <StreamResult
            displayName={streamData.displayName}
            url={streamData.url}
            logo={streamData.logo}
            picture={streamData.picture}
            onAddToWatchlist={handleAddToWatchlist}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        )}
        <div  className="card text-center mt-5">
      <Button 
  variant="secondary" 
  onClick={handleToggleWatchlist} 
  className="mr-7"
  size="lg">
  {showWatchlist ? "Hide Watchlist" : "Show Watchlist"}
</Button >
</div>
{showWatchlist && watchlist.length > 0 && (
  <div className="d-flex justify-content-center mt-5">
    <Card style={{ width: '18rem' }}>
      <Card.Header>Watchlist</Card.Header>
      <ListGroup variant="flush">
        {watchlist.map((item) => (
          <ListGroup.Item key={item.id}>{item.term}</ListGroup.Item>
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
