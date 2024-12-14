import axios from "axios";

const MOCK_API_URL = "https://675c219afe09df667f62bf31.mockapi.io/books/books"; // MockAPI URL 설정

// Get all books
export const getBooks = async () => {
  try {
    const response = await axios.get(MOCK_API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
};

// Create a new book
export const createBook = async (book) => {
  try {
    const response = await axios.post(MOCK_API_URL, book);
    return response.data;
  } catch (error) {
    console.error("Failed to create book:", error);
  }
};

// Update a book
export const updateBook = async (id, updatedBook) => {
  try {
    const response = await axios.put(`${MOCK_API_URL}/${id}`, updatedBook);
    return response.data;
  } catch (error) {
    console.error("Failed to update book:", error);
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    await axios.delete(`${MOCK_API_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete book:", error);
  }
};