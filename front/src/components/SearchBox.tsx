import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
interface Props {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-box-container">
      <button className="search-button" onClick={handleSearch}>
        <GoSearch size={20} />
      </button>
      <input
        className="search-input"
        type="text"
        placeholder="Pesquisar"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
