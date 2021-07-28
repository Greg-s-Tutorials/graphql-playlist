import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
} from "../queries/queries";

const AddBook = () => {
  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const disabled = !state.name || !state.authorId || !state.genre

  const [addBook, { data:newBookData, error:addBookError, loading }] = useMutation(addBookMutation);
  const {
    data: authorsData,
    loading: authorsLoading,
    error,
  } = useQuery(getAuthorsQuery);

  const displayAuthors = () => {
    if (authorsLoading) {
      return <option disabled>Loading authors...</option>;
    }

    if (authorsData) {
      return authorsData.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }

    if (addBookError) console.log({ addBookError });
  };
  const submitForm = (e) => {
    e.preventDefault();
    // use the addBookMutation
    addBook({
      variables: state,
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => setState({...state, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setState({...state, genre: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setState({...state, authorId: e.target.value })}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button disabled={disabled} style={{background: disabled ? '#e2e2e2' : '#AD1457' }}>+</button>
    </form>
  );
};

export default AddBook;
