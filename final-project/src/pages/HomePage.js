import React, { useState, useEffect } from "react";
import { fetchBooks } from "../services/bookService";
import BookList from "../components/BookList";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]); // 원래 데이터 저장
  const [filteredBooks, setFilteredBooks] = useState([]); // 검색 및 필터링 결과 저장
  const [publishers, setPublishers] = useState([]); // 출판사 목록
  const [selectedPublisher, setSelectedPublisher] = useState(""); // 선택된 출판사
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [sortOrder, setSortOrder] = useState(null); // 정렬 상태: null, "asc", "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // 한 페이지에 표시할 도서 수
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(); // OpenAPI에서 데이터 가져오기
      setBooks(data);
      setOriginalBooks(data); // 원래 데이터 저장
      setFilteredBooks(data);

      // 출판사 목록 생성
      const publisherList = Array.from(new Set(data.map((book) => book.pubnm))).filter(Boolean);
      setPublishers(publisherList);
      setLoading(false);
    };
    loadBooks();
  }, []);

  // 검색 핸들러
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = originalBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.writer.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // 정렬 핸들러
  const handleSort = () => {
    if (sortOrder === null) {
      // 오름차순 정렬
      const sortedAsc = [...filteredBooks].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setFilteredBooks(sortedAsc);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      // 내림차순 정렬
      const sortedDesc = [...filteredBooks].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      setFilteredBooks(sortedDesc);
      setSortOrder("desc");
    } else {
      // 원래 순서로 복구
      setFilteredBooks(originalBooks);
      setSortOrder(null);
    }
  };

  // 출판사 필터링 핸들러
  const handleFilterByPublisher = (publisher) => {
    setSelectedPublisher(publisher);
    const filtered = publisher
      ? originalBooks.filter((book) => book.pubnm === publisher)
      : originalBooks;
    setFilteredBooks(filtered);
    setCurrentPage(1); // 필터링 후 첫 페이지로 이동
  };

  // 현재 페이지의 도서 계산
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 즐겨찾기 추가 핸들러
  const handleAddToFavorites = (book) => {
    navigate("/create", { state: { book } }); // CreatePage로 이동
  };

  return (
    <div className="row">
      {/* 왼쪽 필터링 메뉴 */}
      <div className="col-md-3">
        <h5>출판사 필터링</h5>
        <ul className="list-group" style={{ fontSize: "0.8rem" }}>
          <li
            className={`list-group-item ${!selectedPublisher ? "active" : ""}`}
            onClick={() => handleFilterByPublisher("")}
            style={{
              backgroundColor: !selectedPublisher ? "rgb(68, 114, 148)" : "white",
              color: !selectedPublisher ? "white" : "rgb(68, 114, 148)",
              cursor: "pointer",
            }}
          >
            모든 출판사
          </li>
          {publishers.map((publisher, index) => (
            <li
              key={index}
              className={`list-group-item ${
                selectedPublisher === publisher ? "active" : ""
              }`}
              onClick={() => handleFilterByPublisher(publisher)}
              style={{
                backgroundColor: selectedPublisher === publisher ? "rgb(68, 114, 148)" : "white",
                color: selectedPublisher === publisher ? "white" : "rgb(68, 114, 148)",
                cursor: "pointer",
              }}
            >
              {publisher}
            </li>
          ))}
        </ul>
      </div>

      {/* 오른쪽 도서 목록 */}
      <div className="col-md-9">
        <h2>경기도 공공-지역 도서관 인기대출도서 순위</h2>
        {/* 검색창 및 정렬 버튼 */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <input
            type="text"
            className="form-control me-3"
            placeholder="책 제목이나 작가명을 검색하세요"
            value={searchTerm}
            onChange={handleSearch}
            style={{ flex: 1 }}
          />
          <button className="btn btn-light" onClick={handleSort}>
            {sortOrder && <span>✓ </span>}
            제목순
            {sortOrder === "asc" && <span> ↑</span>}
            {sortOrder === "desc" && <span> ↓</span>}
          </button>
        </div>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <>
            <BookList books={currentBooks} onAddToFavorites={handleAddToFavorites} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;