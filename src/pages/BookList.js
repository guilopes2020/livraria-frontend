// src/pages/BookList.js
import React, { useState, useEffect } from 'react';
import api from '../api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books', {
        params: { search },
      });
      setBooks(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  return (
    <div className="container">
      <h1>Livros Disponíveis</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar livro"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="list-item">
            <h3>{book.title}</h3>
            <p>Autor: {book.author}</p>
            <p>{book.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
