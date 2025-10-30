import { Routes, Route } from "react-router-dom";
import SearchPage from "./compponents/SearchPage";
import BookDetail from "./compponents/BookDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
  );
}

export default App;