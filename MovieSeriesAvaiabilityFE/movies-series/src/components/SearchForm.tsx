import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

interface SearchFormProps {
  onSubmit: (term: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [term, setTerm] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (term.trim() === "") {
      setShowWarning(true); 
    } else {
      onSubmit(term);
      setTerm("");
      setShowWarning(false); 
    }
  };

  return (
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
    {showWarning && (
      <div className="alert alert-warning alert-dismissible fade show">
        Please enter a Movie or Tv Show.
      </div>
    )}
  </form>
  );
};

export default SearchForm;
