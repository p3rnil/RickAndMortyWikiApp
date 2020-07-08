import {gql} from 'apollo-boost';

const GET_CHARACTERS = `
  query getCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        image
        origin {
          id
          name
        }
      }
    }
  }
`;

const GET_CHARACTER = gql`
  query getCharacter($id: ID) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      image
      origin {
        id
        name
        type
        dimension
      }
      location {
        id
        name
        type
        dimension
      }
      episode {
        id
        name
        air_date
      }
    }
  }
`;

export {GET_CHARACTERS, GET_CHARACTER};
