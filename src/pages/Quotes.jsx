import React, { useState, useEffect } from 'react';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch('https://seussology.info/api/quotes/random/10')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch quotes');
        }
        return res.json();
      })
      .then((data) => {
        setQuotes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-message">Loading random quotes...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    <div>
      <h2 className="page-title">Random Dr. Seuss Quotes</h2>
      <div className="quotes-list">
        {quotes.map((item) => (
          <blockquote key={item.id } className="quote-card">
            {/* Check item.text or item.quote depending on API payload */}
            <p className="quote-text">"{item.text || item.quote}"</p>
            
            {/* Display book title if available */}
            {item.book && (
              <cite className="quote-book">
                — {typeof item.book === 'object' ? item.book.title : item.book}
              </cite>
            )}
          </blockquote>
        ))}
      </div>
    </div>
  );
}

export default Quotes;