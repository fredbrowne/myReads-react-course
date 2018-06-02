import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf'
import SearchBook from './components/SearchBook'

class App extends React.Component {

    state = {
      showSearchPage: false,
      books: [],
      query: '',
      queryBooks: []
    }

  //Recover from BooksAPI the list of books to work with
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (b, e) => {
    //Call BooksAPI to update shelf
    if (e !== 'none') {
      BooksAPI.update(b, e)
      b.shelf = e
      const newBooks = this.state.books.filter(book => book.id !== b.id).concat(b)
      this.setState({ books: newBooks })
    }
  }


  clearQuery = () => {
    console.log('calling clearQuery')
    this.setState({ query: '' })
    this.setState({ showSearchPage: false })
    this.setState({ queryBooks: []})
  }

  
  render() {
    const { query } = this.state.query
    return (
      <div className="app">
          <Route path='/search' render={() => (
            <SearchBook books={this.state.books} clearQuery={this.clearQuery} />
          )}/>
          <Route exact path="/" render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div className="bookshelf-reading">
                <BookShelf shelfTitle={'Currently Reading'} shelfUpdate={this.updateShelf} books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))} shelfType='currentlyReading'/>
                <BookShelf shelfTitle={'Want to Read'} shelfUpdate={this.updateShelf} books={this.state.books.filter((book) => (book.shelf === "wantToRead"))} shelfType='wantToRead'/>
                <BookShelf shelfTitle={'Read'} shelfUpdate={this.updateShelf} books={this.state.books.filter((book) => (book.shelf === "read"))} shelfType='read'/>
              </div>
            </div>
            <div className="open-search">
              <Link 
              to="/search"
              onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default App