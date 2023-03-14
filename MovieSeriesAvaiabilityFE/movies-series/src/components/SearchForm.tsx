import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

interface SearchFormProps {
  onSubmit: (term: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(term);
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
    </form>
  );
};

export default SearchForm;
