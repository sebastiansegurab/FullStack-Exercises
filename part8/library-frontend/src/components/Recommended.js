import React from 'react'
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
    const resultMe = useQuery(ME, {
        context: {
            headers: {
                "Authorization": `bearer ${props.token}`
            }
        }
    }
    )
    const resultBooks = useQuery(ALL_BOOKS)

    if (!props.show) {
        return null
    }

    if (resultBooks.loading) {
        return <div>loading...</div>
    }

    const books = resultBooks.data ? resultBooks.data.allBooks : []
    const user = resultMe.data ? resultMe.data.me : null

    if (books.length === 0) {
        return (<div><strong>There are no books.</strong></div>)
    }

    return (
        <div>
            <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
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
                        books.filter(b => b.genres.includes(user.favoriteGenre)).map(b =>
                            <tr key={b.title}>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.published}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Recommended