import React from 'react'
import { Appcontext } from './ContextCreator'

export default function MyContextPool(props) {

    return (
        <Appcontext.Provider value={{}}>
            {props.children}
        </Appcontext.Provider>
    )
}
