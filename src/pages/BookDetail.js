// src/pages/BookDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
    }
  };

  const deleteBook = async () => {
    try {
      await api.delete(`/books/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  if (!book) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Autor: {book.author}</p>
      <p>{book.description}</p>
      <button onClick={deleteBook}>Deletar</button>
    </div>
  );
};

export default BookDetail;
