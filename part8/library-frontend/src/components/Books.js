import React, { useState } from 'react'
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreSelected, setGenreSelected] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data !== undefined ? result.data.allBooks : []

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
            genreSelected != null
              ? books.filter(b => b.genres.includes(genreSelected)).map(b =>
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.published}</td>
                </tr>
              )
              : books.map(b =>
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
            <button key={genre} onClick={() => setGenreSelected(genre)}>{genre}</button>
          )
        }
        <button onClick={() => setGenreSelected(null)}>all genres</button>
      </div>
    </div >
  )
}

export default Books