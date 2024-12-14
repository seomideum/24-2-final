import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooks, updateBook } from "../services/mockApiService";

function DetailPage() {
  const { id } = useParams(); // URL에서 id 추출
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 수정 상태

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      const allBooks = await getBooks(); // MockAPI에서 모든 책 데이터 가져오기
      const selectedBook = allBooks.find((b) => b.id === id); // 선택된 책 찾기
      setBook(selectedBook);
      setLoading(false);
    };
    loadBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    await updateBook(id, book); // MockAPI에 변경된 데이터 저장
    setIsEditing(false); // 수정 상태 종료
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!book) {
    return <p>해당 도서를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="container">
      <h2>도서 상세정보</h2>
      <div className="card">
        <img
          src={book.image}
          alt={book.title}
          className="card-img-top"
          style={{
            width: "300px", // 이미지 가로 크기
            height: "auto", // 세로는 비율에 맞춰 자동 조정
            margin: "0 auto", // 이미지를 카드 중앙에 배치
          }}
        />
        <div className="card-body">
          {isEditing ? (
            <>
              {/* 수정 가능한 입력 폼 */}
              <div className="mb-3">
                <label className="form-label">도서명</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">작가</label>
                <input
                  type="text"
                  className="form-control"
                  name="writer"
                  value={book.writer}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">출판년도</label>
                <input
                  type="text"
                  className="form-control"
                  name="pubyear"
                  value={book.pubyear}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">출판사</label>
                <input
                  type="text"
                  className="form-control"
                  name="pubnm"
                  value={book.pubnm}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">대출 가능 권수</label>
                <input
                  type="number"
                  className="form-control"
                  name="volmCount"
                  value={book.volmCount || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">이미지 URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={book.image || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">한줄평</label>
                <textarea
                  className="form-control"
                  name="review"
                  value={book.review || ""}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleUpdate} style={{ backgroundColor: "rgb(143, 188, 219)" }}>
                수정 완료
              </button>
            </>
          ) : (
            <>
              {/* 읽기 전용 정보 */}
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">작가: {book.writer}</p>
              <p className="card-text">출판년도: {book.pubyear}</p>
              <p className="card-text">출판사: {book.pubnm}</p>
              <p className="card-text">대출 가능 권수: {book.volmCount || "정보 없음"}</p>
              <p className="card-text">한줄평: {book.review || "한줄평 없음"}</p>
              <button className="btn btn-warning me-2" onClick={() => setIsEditing(true)} style={{ backgroundColor: "rgb(143, 188, 219)" }}>
                수정하기
              </button>
            </>
          )}
          <button className="btn btn-primary" onClick={() => navigate("/favorites")} style={{ backgroundColor: "rgb(68, 114, 148)" }}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;