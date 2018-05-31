import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';


class BookShelf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            shelf: 'none'
        }
        this.updateShelf = this.updateShelf.bind(this);
    }

    //Set new Shelf Status when selected
    updateShelf(b,e) {
        //Update Book Status
        console.log(b, e);
        //Call BooksAPI to update shelf
        BooksAPI.update(b, e)
    }

    render() {
      const { books } = this.props
        return(
            <div className="comp-current-read">
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{ this.props.shelfTitle }</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.map((book) => (
                      <li key={book.id}>
                        <div id={book.id} className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  "url("+book.imageLinks.smallThumbnail+")" }}></div>
                            <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={event => this.updateShelf(book, event.target.value)} >
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read" >Read</option>
                                <option value="none">None</option>
                            </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                        </div>
                      </li>
                    ))}
                    </ol>
                  </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;