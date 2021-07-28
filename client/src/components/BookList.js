import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

const BookList = () => {
  const [state, setState] = useState({
    selected: null,
  });

  const { data, loading, error, refetch:refetchBooks } = useQuery(getBooksQuery, {
      pollInterval: 500
  });
  
  const displayBooks = () => {
    if (loading) {
      return <div>Loading books...</div>;
    } 
    if(error) return <p>Error:  {JSON.stringify(error)}</p>
    if(data) {
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => setState({ selected: book.id }) }
          >
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={state.selected} />
    </div>
  );
};

export default BookList;
