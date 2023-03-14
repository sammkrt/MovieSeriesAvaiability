import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import StreamResult from "./components/StreamResult";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [streamData, setStreamData] = useState<{
    displayName: string;
    url: string;
    logo: string;
    picture: string;
    movieId:string;
  } | null>(null);


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
        alert("Added to watchlist!");
      } else {
        alert("Error adding to watchlist.");
      }
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (streamData) {
      const response = await fetch(`http://localhost:5297/api/WatchList/remove?id=${streamData.movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Removed from watchlist!");
      } else {
        alert("Error removing from watchlist.");
      }
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Check the movies and series availability</h1>
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
    </Container>
  );
}

export default App;
