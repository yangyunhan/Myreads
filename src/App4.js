import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Main from './main'


class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        currentlyReading:[],
        wantToRead:[],
        read:[],
        searchResult: []
    };

    getAllBooks(){
        BooksAPI.getAll().then((books)=>{
            this.setState({currentlyReading: books.filter((book)=>book.shelf==='currentlyReading')});
            this.setState({wantToRead: books.filter((book)=>book.shelf==='wantToRead')});
            this.setState({read: books.filter((book)=>book.shelf==='read')});
        });
    }

    componentDidMount(){
        this.getAllBooks()
        /*BooksAPI.getAll().then((book)=>{
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
        });*/
    }

    changeBookshelf(bookshelf,book){
        BooksAPI.update(book, bookshelf)
            .then(()=>{this.getAllBooks()});
        /*this.setState((state)=>{
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
        BooksAPI.update(book,bookshelf).then(book=>console.log(book));*/
    }

    openSearch(){
        this.setState({showSearchPage: true})
    }

    updateQuery = (query)=>{
        let queryItem = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];
        if(query) {
            BooksAPI.search(query).then((books) => {
                this.setState({searchResult: books});
                books.forEach((book)=>{
                    this.state.currentlyReading.map(c=>{
                        if (book.title === c.title){
                            book.shelf = c.shelf;
                        }
                    });
                    this.state.wantToRead.map(w=>{
                        if (book.title === w.title){
                            book.shelf = w.shelf;
                        }
                    });
                    this.state.read.map(r=>{
                        if (book.title === r.title){
                            book.shelf = r.shelf;
                        }
                    })
                })
            })
        }
    };

    render(){
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
                                    onChange={(event)=>this.updateQuery(event.target.value)}
                                />

                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.searchResult && Object.keys(this.state.searchResult).map((b)=>(
                                    <li key={this.state.searchResult[b].id}>
                                        <div className='book'>
                                            <div className='book-top'>
                                                <div className='book-cover' style={{width: 128, height: 192, backgroundImage: `url("${this.state.searchResult[b].imageLinks.thumbnail}")`}}></div>
                                                <div className='book-shelf-changer'>
                                                    <select onChange={(event)=>this.changeBookshelf(event.target.value, this.state.searchResult[b])}>
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
                    <Main book={this.state} changeEvent={this.changeBookshelf} search={this.openSearch}/>
                )}
            </div>
        )
    }
}
export default BooksApp