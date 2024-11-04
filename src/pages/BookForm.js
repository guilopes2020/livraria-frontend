// src/pages/BookForm.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const BookForm = ({ book = {} }) => {
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [description, setDescription] = useState(book.description || '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, author, description };

    try {
      if (book.id) {
        await api.put(`/books/${book.id}`, payload);
      } else {
        await api.post('/books', payload);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
    }
  };

  return (
    <div className="container">
      <h1>{book.id ? 'Editar Livro' : 'Adicionar Livro'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{book.id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
};

export default BookForm;
