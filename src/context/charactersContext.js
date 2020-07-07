import React, {createContext, useContext, useReducer} from 'react';
import endpoint from '../config';
import axios from 'axios';
import {GET_CHARACTERS} from '../graphql';

const CharactersStateContext = createContext();
const CharactersDispatchContext = createContext();

const charactersReducer = (state, action) => {
  switch (action.type) {
    case 'start update': {
      return {status: 'loading', characters: state.characters, error: ''};
    }
    case 'finish update': {
      return {status: 'finish', characters: action.payload, error: ''};
    }
    case 'finish update more': {
      return {
        status: 'finish',
        characters: {
          info: state.characters.info,
          results: [...state.characters.results, ...action.payload.results],
        },
      };
    }
    case 'fail update': {
      return {status: 'error', error: action.payload};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const CharactersProvider = ({children}) => {
  const [state, dispatch] = useReducer(charactersReducer, {
    characters: {
      info: {},
      results: [],
    },
    status: '',
    error: '',
  });
  return (
    <CharactersStateContext.Provider value={state}>
      <CharactersDispatchContext.Provider value={dispatch}>
        {children}
      </CharactersDispatchContext.Provider>
    </CharactersStateContext.Provider>
  );
};

const useCharactersState = () => {
  const context = useContext(CharactersStateContext);
  if (context === undefined) {
    throw new Error(
      'useCharactersState must be used within a CharactersProvider',
    );
  }
  return context;
};

const useCharactersDispatch = () => {
  const context = useContext(CharactersDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCharactersDispatch must be used within a CharactersProvider',
    );
  }
  return context;
};

const getCharacters = async (dispatch, page, filter) => {
  try {
    dispatch({type: 'start update'});

    const characters = await axios
      .post(`${endpoint}`, {
        query: GET_CHARACTERS,
        variables: {page, filter},
      })
      .then((response) =>
        response.data.data.characters
          ? response.data.data.characters
          : {info: {}, characters: []},
      )
      .catch((error) => {
        throw error;
      });

    dispatch({type: 'finish update', payload: characters});
  } catch (error) {
    dispatch({type: 'fail update', payload: error});
    console.error(error);
  }
};

const getMoreCharacters = async (dispatch, page, filter) => {
  try {
    dispatch({type: 'start update'});

    const characters = await axios
      .post(`${endpoint}`, {
        query: GET_CHARACTERS,
        variables: {page, filter},
      })
      .then((response) => response.data.data.characters);

    dispatch({type: 'finish update more', payload: characters});
  } catch (error) {
    dispatch({type: 'fail update', payload: error});
    console.error(error);
  }
};

export {
  CharactersProvider,
  useCharactersState,
  useCharactersDispatch,
  getCharacters,
  getMoreCharacters,
};
