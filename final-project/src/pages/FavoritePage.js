import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "../services/mockApiService";

function FavoritePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await getBooks(); // MockAPI에서 데이터 가져오기
      setBooks(data);
      setLoading(false);
    };
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id); // MockAPI에서 데이터 삭제
    setBooks((prev) => prev.filter((book) => book.id !== id)); // 로컬 상태 업데이트
  };

  const handleViewDetail = (id) => {
    navigate(`/detail/${id}`); // 상세보기 페이지로 이동
  };

  return (
    <div className="container">
      <h2>나만의 즐겨찾기</h2>
      <button
        className="btn btn-primary mb-4"
        onClick={() => navigate("/create-new")}
        style={{ backgroundColor: "rgb(68, 114, 148)" }}
      >
        새로운 즐겨찾기 추가
      </button>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul className="list-group">
          {books.map((book) => (
            <li key={book.id} className="list-group-item d-flex align-items-center">
              {/* 도서 이미지 */}
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="img-thumbnail me-3"
                  style={{ width: "80px", height: "auto" }}
                />
              )}

              {/* 도서명과 한줄평 */}
              <div className="flex-grow-1">
                <h5>{book.title}</h5>
                <p className="mb-0">{book.review || "한줄평 없음"}</p>
              </div>

              {/* 상세보기 버튼 */}
              <button
                className="btn btn-info btn-sm me-2"
                onClick={() => handleViewDetail(book.id)}
                style={{ backgroundColor: "rgb(143, 188, 219)" }}
              >
                상세보기
              </button>

              {/* 삭제 버튼 */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(book.id)}
                style={{ backgroundColor: "rgb(41, 64, 82)" }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritePage;