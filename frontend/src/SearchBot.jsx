import { useState } from "react";


function SearchBot({ messages, onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

 return (
    <form onSubmit={handleSubmit} className="search-box">
      <input type="text" value={query} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );

}

export default SearchBot;