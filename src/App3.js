import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books2: [],
        currentlyReading:[],
        wantToRead:[],
        read:[],
        query: '',
        searchResult: []
    };

    componentDidMount(){
        BooksAPI.getAll().then((book)=>{
            this.setState({books2: book});
            let currentlyReading = [];
            let wantToRead = [];
            let read = [];
            this.state.books2.map((book)=>{
                if(book.shelf==='currentlyReading'){
                    currentlyReading.push(book);
                    this.setState({
                        currentlyReading: currentlyReading
                    });

                } else if(book.shelf==='wantToRead'){
                    wantToRead.push(book);
                    this.setState({
                        wantToRead: wantToRead
                    })

                } else if(book.shelf==='read'){
                    read.push(book);
                    this.setState({
                        read: read
                    })
                }
            });
        });
    }

    changeBookshelf(bookshelf,book){
        this.setState((state)=>{
            state.currentlyReading = [];
            state.wantToRead = [];
            state.read = [];
            state.books2.map(b=>{
                if (b.id===book.id){
                    b.shelf = bookshelf;
                }
                if(b.shelf==='currentlyReading'){
                    state.currentlyReading.push(b);
                    this.setState({
                        currentlyReading: state.currentlyReading
                    });
                } else if(b.shelf==='wantToRead'){
                    state.wantToRead.push(b);
                    this.setState({
                        wantToRead: state.wantToRead
                    })
                } else if(b.shelf==='read'){
                    state.read.push(b);
                    this.setState({
                        read: state.read
                    })
                }
            })
        });
        BooksAPI.update(book,bookshelf).then(book=>console.log(book));
    }

    updateQuery = (query)=>{
        this.setState({query: query.trim()});
    };

    render() {
        if(this.state.query){
            BooksAPI.search(this.state.query).then(book=>{
                this.setState({searchResult: book});
            })
        }
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                            <div className="search-books-input-wrapper">
                                {/*
                                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                    You can find these search terms here:
                                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                    you don't find a specific author or title. Every search is limited by search terms.
                                */
                                }
                                <input
                                    type="text"
                                    placeholder="Search by title or author"
                                    value={this.state.query}
                                    onChange={(event)=>this.updateQuery(event.target.value)}
                                />

                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {Object.keys(this.state.searchResult).map((b)=>(
                                    <li key={this.state.searchResult[b].id}>
                                        <div className='book'>
                                            <div className='book-top'>
                                                <div className='book-cover' style={{width: 128, height: 192, backgroundImage: `url("${this.state.searchResult[b].imageLinks}")`}}></div>
                                                <div className='book-shelf-changer'>
                                                    <select>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='book-title'>{this.state.searchResult[b].title}</div>
                                            <div className='book-authors'>{this.state.searchResult[b].authors}</div>
                                        </div>
                                    </li>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {this.state.currentlyReading.map((book)=>(
                                                <li key={book.id}>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                            <div className="book-shelf-changer">
                                                                <select value={book.shelf} onChange={(event)=>this.changeBookshelf(event.target.value,book)}>
                                                                    <option value="none" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead" defaultValue="selected">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="book-title">{book.title}</div>
                                                        <div className="book-authors">{book.authors[0]}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {this.state.wantToRead.map((book)=>(
                                                <li key={book.id}>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                            <div className="book-shelf-changer">
                                                                <select value={book.shelf} onChange={(event)=>this.changeBookshelf(event.target.value,book)}>
                                                                    <option value="none" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead" defaultValue="selected">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="book-title">{book.title}</div>
                                                        <div className="book-authors">{book.authors[0]}</div>
                                                    </div>
                                                </li>
                                            )) }
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            { this.state.read.map((book)=>(
                                                <li key={book.id}>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                                            <div className="book-shelf-changer">
                                                                <select value={book.shelf} onChange={(event)=>this.changeBookshelf(event.target.value,book)}>
                                                                    <option value="none" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading</option>
                                                                    <option value="wantToRead">Want to Read</option>
                                                                    <option value="read" defaultValue="selected">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="book-title">{book.title}</div>
                                                        <div className="book-authors">{book.authors[0]}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
export default BooksApp