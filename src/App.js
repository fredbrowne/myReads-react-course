import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
//import { Route } from 'react-router-dom';
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {
    state = {
      showSearchPage: false,
      books: []
    }

  //Recover from BooksAPI the list of books to work with
  componentWillMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    console.log(this.state.books)
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
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div className="bookshelf-reading">
                <BookShelf shelfTitle={'Currently Reading'} books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))}/>
                <BookShelf shelfTitle={'Want to Read'} books={this.state.books.filter((book) => (book.shelf === "wantToRead"))}/>
                <BookShelf shelfTitle={'Read'} books={this.state.books.filter((book) => (book.shelf === "read"))}/>
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
