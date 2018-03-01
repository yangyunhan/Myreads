import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import './App.css'
import Main from './Main'
import Search from "./Search"


class BooksApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentlyReading: [],
            wantToRead: [],
            read: []
        };
    }
/*state = {
    currentlyReading:[],
    wantToRead:[],
    read:[]
};*/

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

changeBookshelf(book,bookshelf){
    BooksAPI.update(book, bookshelf).then(()=>{
        this.getAllBooks();
    })
}

render(){
    return (
        <div className="app">
            <Route exact path='/' render={()=>(
                <Main
                    changeEvent={this.changeBookshelf.bind(this)}
                    book={this.state}
                />)}
            />
            <Route path='/search' render={()=>(
                <Search
                    changeEvent={this.changeBookshelf.bind(this)}
                    book={this.state}
                />)}
            />
        </div>
    )
}
}
export default BooksApp