import React, { useState } from 'react'
import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const resultAllBooks = useQuery(ALL_BOOKS)
  const [genreSelected, setGenreSelected] = useState(null)
  const [getBooksByGenre, { loading: resultLoadingBooksByGenre, data: resultDataBooksByGenre }] = useLazyQuery(ALL_BOOKS_BY_GENRE);

  if (!props.show) {
    return null
  }

  if (resultAllBooks.loading || resultLoadingBooksByGenre) {
    return <div>loading...</div>
  }

  let books = []

  if (genreSelected === null || genreSelected === undefined) {
    if (resultAllBooks.data !== undefined) {
      books = resultAllBooks.data.allBooks
    }
  } else {
    if (resultDataBooksByGenre !== undefined) {
      books = resultDataBooksByGenre.allBooksByGenre
    }
  }

  if (books.length === 0) {
    return (<div><strong>There are no books.</strong></div>)
  }

  const genres = new Set([].concat(...books.map(b => b.genres)))

  return (
    <div>
      <h2>books</h2>
      {
        genreSelected != null
          ? <h3 style={{ fontWeight: "normal" }}>in genre <strong>{genreSelected}</strong></h3>
          : null
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            books.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        {
          [...genres].map(genre =>
            <button key={genre} onClick={() => { setGenreSelected(genre); getBooksByGenre({ variables: { genre } }) }}>{genre}</button>
          )
        }
        <button onClick={() => setGenreSelected(null)}>all genres</button>
      </div>
    </div >
  )
}

export default Books