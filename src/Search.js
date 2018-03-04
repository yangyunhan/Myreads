import React, {Component} from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"


class Search extends Component{
    state={
       result: []
    };

    /**
     * description: update the query which from user's input
     * @param query
     */
    updateQuery = (query)=>{
        if(query.length>0) {
            BooksAPI.search(query).then((books) => {
                books.forEach((book)=>{

                    if(book.imageLinks === undefined){
                        book.imageLinks = '';
                    }

                    this.props.book.currentlyReading.forEach(c=>{
                        if (book.id === c.id){
                            book.shelf = c.shelf;
                        }
                    });
                    this.props.book.wantToRead.forEach(w=>{
                        if (book.id === w.id){
                            book.shelf = w.shelf;
                        }
                    });
                    this.props.book.read.forEach(r=>{
                        if (book.id === r.id){
                            book.shelf = r.shelf;
                        }
                    })
                });
                this.setState({result: books});
            }).catch(()=>console.log('there is something wrong'));
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


export default Search