
import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTHDAY } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [updateAuthorBirthday] = useMutation(UPDATE_AUTHOR_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data !== undefined ? result.data.allAuthors : []

  if (authors.length === 0) {
    return (<div><strong>There are no authors.</strong></div>)
  }

  const editAuthor = async (event) => {
    event.preventDefault()

    updateAuthorBirthday({ variables: { name: name === '' ? authors[0].name : name, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set Birthday</h2>
      <form onSubmit={editAuthor}>
        <div>
          author <select value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
