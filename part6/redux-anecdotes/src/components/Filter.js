import React from "react";
import { connect } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChangeFilter = (event) => {
    const { target } = event;
    props.filterAnecdotes(target.value);
  };

  return (
    <div>
      filter <input name="filter" onChange={handleChangeFilter} />
    </div>
  );
};

const mapDispatchToProps = {
  filterAnecdotes
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter;
