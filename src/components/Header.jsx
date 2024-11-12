import React from "react";

function Header({ searchQuery, handleSearch }) {
 
  return (
    <header className="header bg-white shadow-lg p-4 flex justify-between items-center">
 
      <div className="search-container flex-1 mx-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products by name"
          className="w-full p-2 border rounded-md"
        />
      </div>

      
    </header>
  );
}

export default Header;
