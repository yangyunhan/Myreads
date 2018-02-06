import React, {Component} from 'react'

class Book extends Component{
    state = {
        bookshelf: this.props.book.bookshelf
    };

    BookShelf(value){
        this.setState({
            bookshelf: value
        })
        console.log(value);
        console.log(this.state.bookshelf);
    }

    render(){
        return(
            <li key={this.props.book.title}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={
                                 {
                                     width: this.props.book.width,
                                     height: this.props.book.height,
                                     backgroundImage: `url("${this.props.book.overURL}")`
                                 }
                            }>
                        </div>
                        <div className="book-shelf-changer">
                            <select value={this.state.bookshelf} onChange={(event)=>(
                                this.BookShelf(event.target.value),
                                this.props.changeBookShelf(this.props.book)
                            )}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.author}</div>
                </div>
            </li>
        )
    }
}

export default Book