import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Book from './book'
import PropTypes from 'prop-types'

class Main extends Component{
    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <Book books={this.props.book.currentlyReading} changeShelf={this.props.changeEvent}/>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <Book books={this.props.book.wantToRead} changeShelf={this.props.changeEvent}/>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <Book books={this.props.book.read} changeShelf={this.props.changeEvent}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to={"/search"}>Add a book</Link>
                </div>
            </div>
        )
    }
}

Main.propTypes = {
    book: PropTypes.object.isRequired,
    changeEvent: PropTypes.func.isRequired
};
export default Main