import React, {Component} from 'react'
import Star from './Star'

const BookCoverStyle = (book) => {
    return {
        width: 128,
        height: 193,
        backgroundImage: `url(${book.imageLinks.smallThumbnail||book.imageLinks})`
    }
};

class Book extends Component {
    render(){
        //console.log(localStorage);
        return(
            <ol className="books-grid">
                {this.props.books.map((book)=>(
                    <li key={book.id}>
                        <div className="book">
                            <Star renderId={book.id} storage={localStorage.getItem(book.id)}/>
                            <div className="book-top">
                                <div className="book-cover" style={BookCoverStyle(book)}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf||'null'} onChange={(event)=>this.props.changeShelf(book, event.target.value)}>
                                        <option value="null" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default Book