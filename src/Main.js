import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import styled from 'styled-components'

/**
 * description: method of style-components: the style of repeat style of some elements
 */
const Div = styled.div`
    text-align: center;
    `;

/**
 * description: method of style-components
 */
const H2 = styled.h2`
    border-bottom: 1px solid #dedede;
    `;


const Main = (props)=>{
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <H2>Currently Reading</H2>
                        <Div>
                            <Book books={props.book.currentlyReading} changeShelf={props.changeEvent}/>
                        </Div>
                    </div>
                    <div className="bookshelf">
                        <H2>Want to Read</H2>
                        <Div>
                            <Book books={props.book.wantToRead} changeShelf={props.changeEvent}/>
                        </Div>
                    </div>
                    <div className="bookshelf">
                        <H2>Read</H2>
                        <Div>
                            <Book books={props.book.read} changeShelf={props.changeEvent}/>
                        </Div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to={"/search"}>Add a book</Link>
            </div>
        </div>
    )
};

export default Main