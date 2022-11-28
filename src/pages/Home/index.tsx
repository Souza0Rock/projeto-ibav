import React from 'react'
import Header from './header/index'
import Body from './container/index'

const Home = () => {

    const teste = true

    return (
        <>
            <Header teste={teste} />
            <Body/>
        </>
    )
} 

export default Home