import React, { useState, useEffect } from 'react';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        {quotes.map((quote, index) => (
          <blockquote key={quote.id || index} className="quote-card">
            <p className="quote-text">"{quote.quote}"</p>
            {quote.book && (
              <cite className="quote-book">— {quote.book.title}</cite>
            )}
          </blockquote>
        ))}
      </div>
    </div>
  );
}

export default Quotes;