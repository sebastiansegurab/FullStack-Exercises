
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'
import Recommended from "./components/Recommended"
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const notifyError = (message) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }

  const notifySuccess = (message) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      notifySuccess(subscriptionData.data.bookAdded.title);
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem("library-app-user-token")
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token
          ?
          (
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommended')}>recommended</button>
              <button onClick={() => logout()}>logout</button>
            </>
          )
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      {success
        ? <Notification error={error} success={success} />
        : null
      }

      <Authors
        token={token}
        show={page === 'authors'}
        notifyError={notifyError}
      />

      <Books
        show={page === 'books'}
      />

      {token
        ?
        <>
          <Recommended
            token={token}
            show={page === 'recommended'}
          />

          <NewBook
            token={token}
            show={page === 'add'}
            notifyError={notifyError}
          />
        </>
        : null
      }

      <Login
        setPage={setPage}
        show={page === 'login'}
        notifyError={notifyError}
        setToken={setToken}
      />

    </div>
  )
}

export default App