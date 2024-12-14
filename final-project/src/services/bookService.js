import axios from "axios";
import { parseStringPromise } from "xml2js";

const API_URL = "https://openapi.gg.go.kr/Poplitloanbook";
const API_KEY = "dd902ab083f34197890d483c82e424cd";

export const fetchBooks = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        Key: API_KEY,
        Type: "xml",
        pIndex: 1,
        pSize: 100,
      },
    });

    // XML 데이터를 JSON으로 변환
    const json = await parseStringPromise(response.data);

    const rows = json.Poplitloanbook.row || [];
    return rows.map((book) => ({
      title: book.BOOK_NM_INFO?.[0] || "정보 없음",
      writer: book.AUTHOR_NM_INFO?.[0] || "정보 없음",
      pubyear: book.PUBLCATN_YY?.[0] || "정보 없음",
      pubnm: book.PUBLSHCMPY_NM?.[0] || "정보 없음",
      volmCount: book.VOLM_CNT?.[0] || "0", // 대출 가능 권수
      image: book.BOOK_IMAGE_URL?.[0] || null,
    }));
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
};