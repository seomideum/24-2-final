import React from "react";

function BookList({ books, onAddToFavorites }) {
  return (
    <ul className="list-group mb-4">
      {books.map((book, index) => (
        <li key={book.id || index} className="list-group-item">
          <div className="d-flex align-items-start">
            {/* 도서 이미지 */}
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="img-thumbnail me-3"
                style={{ width: "100px", height: "auto" }}
              />
            )}

            {/* 도서 정보 */}
            <div className="flex-grow-1">
              <h5>{book.title}</h5>
              <p className="mb-1">작가: {book.writer}</p>
              <p className="mb-1">출판년도: {book.pubyear}</p>
              <p className="mb-1">출판사: {book.pubnm}</p>
              <p className="mb-0">대출 가능 권수: {book.volmCount}</p>
            </div>

            {/* 즐겨찾기 추가 버튼 */}
            {onAddToFavorites && (
              <button
                className="btn btn-success align-self-start"
                onClick={() => onAddToFavorites(book)}
                style={{ backgroundColor: "rgb(68, 114, 148)" }}
              >
                즐겨찾기 추가
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookList;