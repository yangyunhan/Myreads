import React, { Component } from 'react'
import Book from './book'

class Main extends Component{
    render(){
        console.log('Props', this.props);
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
                    <a onClick={() => this.props.search()}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default Main