import { useState, useEffect } from "react";
import BookCard from "./BookCard";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      try {
        const res = await fetch("https://openlibrary.org/trending/daily.json");
        const data = await res.json();
        setRandomBooks(data.works.slice(0, 12));
      } catch {
        console.error("Failed to load random books");
      }
    };

    const cached = sessionStorage.getItem("bookList");
    if (cached) {
      setSearchResults(JSON.parse(cached));
    } else {
      fetchRandomBooks();
    }
  }, []);

  const searchBooks = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();
      const results = data.docs.slice(0, 20);
      setSearchResults(results);
      sessionStorage.setItem("bookList", JSON.stringify(results));
    } catch {
      console.error("Search failed");
    }
  };

  const booksToShow = searchResults.length > 0 ? searchResults : randomBooks;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Book Finder</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="px-4 py-2 border rounded-l-md w-full max-w-md"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2 text-center">
        {searchResults.length > 0 ? "🔍 Search Results" : "🎲 Discover Random Books"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {booksToShow.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;