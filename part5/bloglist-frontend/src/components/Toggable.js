import React, { useState } from 'react'

const Toggable = ({ children }) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            {visible ?
                <div>
                    {children}
                    <div>
                        <button onClick={() => setVisible(false)}>cancel</button>
                    </div>
                </div>
                :
                <div>
                    <button onClick={() => setVisible(true)}>create new blog</button>
                </div>
            }
        </>
    )
}

export default Toggable