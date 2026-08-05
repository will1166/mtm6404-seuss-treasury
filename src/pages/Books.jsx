import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch('https://seussology.info/api/books')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-message">Loading books...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    <div>
      <h2 className="page-title">Dr. Seuss Books</h2>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <Link to={`/books/${book.id}`}>
              <img 
                src={book.image} 
                alt={book.title} 
                className="book-cover" 
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;