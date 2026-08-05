import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams(); // Gets the book ID from the URL parameter (/books/:id)
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://seussology.info/api/books/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch book details');
        }
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="status-message">Loading book details...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!book) return <p className="status-message">Book not found.</p>;

  return (
    <div className="book-details-container">
      <Link to="/" className="back-link">← Back to Books</Link>
      
      <div className="book-details-card">
        <img 
          src={book.image} 
          alt={book.title} 
          className="book-details-cover" 
        />
        <div className="book-details-info">
          <h2>{book.title}</h2>
          <p className="book-description">
            {book.description || 'No description available for this book.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;