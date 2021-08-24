import React from "react";
import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChangeFilter = (event) => {
    const { target } = event;
    dispatch(filterAnecdotes(target.value));
  };

  return (
    <div>
      filter <input name="filter" onChange={handleChangeFilter} />
    </div>
  );
};

export default Filter;
