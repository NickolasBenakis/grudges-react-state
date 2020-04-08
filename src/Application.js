import React, { useReducer } from 'react';

import id from 'uuid/v4';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GRUDGE_ADD':
      return [action.payload, ...state];
    case 'TOGGLE_GRUDGE':
      const updatedGrudges = state.map((grudge) => {
        if (grudge.id === action.payload.id) {
          return { ...grudge, forgiven: !grudge.forgiven };
        }
        return grudge;
      });
      return updatedGrudges;
    default:
      return state;
  }
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = React.useCallback(
    ({ person, reason }) => {
      dispatch({
        type: 'GRUDGE_ADD',
        payload: {
          person,
          reason,
          forgiven: false,
          id: id()
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = React.useCallback(
    (id) => {
      dispatch({
        type: 'TOGGLE_GRUDGE',
        payload: { id }
      });
    },
    [dispatch]
  );

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
