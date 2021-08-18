import React, { useState } from 'react'

const Toggable = ({ children, buttonOnChildren, buttonOutsideChildren}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            {visible ?
                <div>
                    {children}
                    <div>
                        <button onClick={() => setVisible(false)}>{buttonOnChildren}</button>
                    </div>
                </div>
                :
                <div>
                    <button onClick={() => setVisible(true)}>{buttonOutsideChildren}</button>
                </div>
            }
        </>
    )
}

export default Toggable