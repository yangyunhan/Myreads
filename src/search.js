import React, {Component} from 'react'
import Book from './book'
import {Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"
import PropTypes from 'prop-types'

class Search extends Component{
    state={
       result: []
    };

    updateQuery = (query)=>{
        if(query) {
            BooksAPI.search(query).then((books) => {
                books.forEach((book)=>{
                    this.props.book.currentlyReading.forEach(c=>{
                        if (book.id === c.id){
                            book.shelf = c.shelf;
                        }
                    });
                    this.props.book.wantToRead.map(w=>{
                        if (book.id === w.id){
                            book.shelf = w.shelf;
                        }
                    });
                    this.props.book.read.map(r=>{
                        if (book.id === r.id){
                            book.shelf = r.shelf;
                        }
                    })
                });
                this.setState({result: books});
            });
        }
    };

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event)=>this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <Book books={this.state.result} changeShelf={this.props.changeEvent}/>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
};

export default Search