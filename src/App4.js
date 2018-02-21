import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import './App.css'
import Main from './main'
import Search from "./search";


class BooksApp extends React.Component {
    state = {
        currentlyReading:[],
        wantToRead:[],
        read:[]
    };

    getAllBooks(){
        BooksAPI.getAll().then((books)=>{
            this.setState({currentlyReading: books.filter((book)=>book.shelf==='currentlyReading')});
            this.setState({wantToRead: books.filter((book)=>book.shelf==='wantToRead')});
            this.setState({read: books.filter((book)=>book.shelf==='read')});
        });
    };

    componentDidMount(){
        this.getAllBooks()
    }

    changeBookshelf(book,bookshelf,func){
        BooksAPI.update(book, bookshelf).then(()=>{
            func();
        })
    }

    render(){
        return (
            <div className="app">
                <Route exact path='/' render={()=>(
                    <Main
                        changeEvent={this.changeBookshelf}
                        func={this.getAllBooks.bind(this)}
                        book={this.state}
                    />)}
                />
                <Route path='/search' render={()=>(
                    <Search
                        changeEvent={this.changeBookshelf}
                        book={this.state}
                        func={this.getAllBooks.bind(this)}
                    />)}
                />

            </div>
        )
    }
}
export default BooksApp