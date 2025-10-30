import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch {
        setError("Failed to load book details.");
      }
    };

    fetchBook();
  }, [id]);

  if (error) {
    return (
      <div className="p-4 text-center">
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Go Back
        </button>
      </div>
    );
  }

  if (!book) {
    return <p className="text-center mt-10">Loading book details...</p>;
  }

  const coverUrl = book.covers?.length
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

  const handleBuyClick = () => {
   setShowSuccess(true);
   setTimeout(() => {
    setShowSuccess(false);
  }, 5000);

  };

  return (
    <div className="min-h-screen  bg-gray-100 p-2 flex justify-center ">
      <div className="bg-white shadow-md rounded-md p-4 w-full max-w-xl">
        <div className=" w-150  flex flex-col items-center text-center">
          <img src={coverUrl} alt={book.title} className="w-full h-80 object-contain rounded mb-2" />
          <h1 className="text-xl font-bold mb-1">{book.title}</h1>
        </div>

        <div className="mt-2">
          <h2 className="text-lg font-semibold mb-1">📖 Description</h2>
          <p className="text-sm text-gray-700 mb-3 max-h-24 overflow-hidden">
            {book.description?.value || book.description || "No description available"}
          </p>
        </div>

        <div className="mb-3">
          <h2 className="text-lg font-semibold mb-1">📘 More Info</h2>
          <ul className="text-xs text-gray-600 space-y-1">
            <li><strong>Type:</strong> {book.type?.key?.replace("/type/", "") || "N/A"}</li>
            <li><strong>Subjects:</strong> {book.subjects?.slice(0, 3).join(", ") || "N/A"}</li>
            <li>
              <strong>Links:</strong>{" "}
              {book.links?.length ? (
                book.links.slice(0, 2).map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block"
                  >
                    {link.title || link.url}
                  </a>
                ))
              ) : (
                "None available"
              )}
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-col items-center gap-2">
  <div className="flex justify-center gap-2 flex-wrap">
    <button
      onClick={handleBuyClick}
      className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
    >
      🛒 Buy Now
    </button>
    <button
      onClick={() => navigate("/")}
      className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
    >
      🔙 Go Back
    </button>
  </div>
  {showSuccess && (
    <p className="mt-2 text-green-600 text-sm font-medium text-center">
      ✅ Thank you! We'll send you a link to buy this book.
    </p>
  )}
</div>
      </div>
    </div>
  );
}

export default BookDetail;