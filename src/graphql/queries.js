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

export {GET_CHARACTERS};
