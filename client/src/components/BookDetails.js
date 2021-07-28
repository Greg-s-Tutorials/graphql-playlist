import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  
  const { data, loading, error } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  const displayBookDetails = () => {

    if(loading) return <p>Loading...</p>

    if (data) {
      const { book } = data;
      if (book) {
        return (
          <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>All books by this author:</p>
            <ul className="other-books">
              {book.author.books.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </div>
        );
      } else {
        return <div>No book selected...</div>;
      }
    }

    if(error) return <p>Error: {JSON.stringify(error)}</p>


  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
