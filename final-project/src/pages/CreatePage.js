import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBook } from "../services/mockApiService";

function CreatePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialData = location.state?.book || {
    title: "",
    writer: "",
    pubyear: "",
    pubnm: "",
    image: "",
    loancount: "",
  };

  const [formData, setFormData] = useState({
    ...initialData,
    review: "", // 한줄평 추가
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await createBook(formData);
    navigate("/favorites"); // 즐겨찾기 페이지로 이동
  };

  return (
    <div className="container">
      <h2>즐겨찾기 추가</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">도서명</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">작가</label>
          <input
            type="text"
            className="form-control"
            name="writer"
            value={formData.writer}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">출판년도</label>
          <input
            type="text"
            className="form-control"
            name="pubyear"
            value={formData.pubyear}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">출판사</label>
          <input
            type="text"
            className="form-control"
            name="pubnm"
            value={formData.pubnm}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">이미지 URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">대출 가능 권수</label>
          <input
                type="number"
                className="form-control"
                name="volmCount"
                value={formData.volmCount || "0"}
                onChange={handleChange}
            />
         
        </div>
        <div className="mb-3">
          <label className="form-label">한줄평</label>
          <textarea
            className="form-control"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit} style={{
          backgroundColor: "rgb(68, 114, 148)", marginRight: "10px"}}>
            추가하기
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/")} style={{
          backgroundColor: "rgb(68, 114, 148)"}}>
            목록으로 돌아가기
        </button>
      </form>
    </div>
  );
}

export default CreatePage;