import { Link } from "react-router-dom";

function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

  const bookId = book.key.startsWith("/") ? book.key.slice(1) : book.key;

  return (
    <Link to={`/book/${bookId.replace("works/", "")}`}>
      <div className="bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform">
        <img src={coverUrl} alt={book.title} className="w-full h-60 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-sm text-gray-600">
            {book.author_name?.join(", ") || "Unknown Author"}
          </p>
          <p className="text-sm text-gray-500">Published: {book.first_publish_year || "N/A"}</p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;