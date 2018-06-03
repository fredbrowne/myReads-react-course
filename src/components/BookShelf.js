import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

class BookShelf extends Component {
  render() {
    const { books } = this.props
    //If book has no shelf, assign 'None'
    const shelfValidation = (book) => {
      if (!book.shelf) {
        book.shelf = 'none'
      }
      return book.shelf
    }

    //Check if Book has image. If not, assign no-cover.jpg image to render book.
    const noCoverCheck = (book) => {
      if (book.imageLinks) {
        return <div className="book-cover" style={{ width: 128, height: 193, backgroundSize: "cover", backgroundImage:  "url("+book.imageLinks.smallThumbnail+")" }}></div>
      } else {
        return <div className="book-cover no-cover" style={{ width: 128, height: 193, backgroundSize: "cover", backgroundPosition: 'center', backgroundImage: 'url(' + require('../images/no-cover.jpg') + ')' }}></div>
      }
    }
    
    return(
      <div className="comp-current-read">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ this.props.shelfTitle }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Panel>
                    <Panel.Body>
                    <div id={book.id} className="book">
                        <div className="book-top">
                          { noCoverCheck(book) }
                          <div className="book-shelf-changer">
                            <select value={shelfValidation(book)} onChange={event => this.props.shelfUpdate(book, event.target.value)} >
                              <option value="undefined" disabled>Move to...</option>
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
                    </Panel.Body>
                  </Panel>
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