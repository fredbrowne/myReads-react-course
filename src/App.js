import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf'
import SearchBook from './components/SearchBook'
import FontAwesome from 'react-fontawesome'

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
    const numberOfBooks = (books) => {
      var length = 0;
      for (const book of books) {
        if( book ) {
          ++length;
        }
      }
      return length
    }

    const currentlyReading = this.state.books.filter((book) => (book.shelf === "currentlyReading"))
    const wantToRead = this.state.books.filter((book) => (book.shelf === "wantToRead"))
    const read = this.state.books.filter((book) => (book.shelf === "read"))

    return (
      <div className="app">
          <Route path='/search' render={() => (
            <SearchBook books={this.state.books} shelfUpdate={this.updateShelf} clearQuery={this.clearQuery} />
          )}/>
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="container shelfStatus">
                <div className="col-md-3">
                  <div className="statsNum">
                    <FontAwesome
                      className="iconStats"
                      name='book'
                      size='3x'
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    <span>Number of Books <span className="currentShelfStats">{ numberOfBooks(this.state.books) }</span></span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="statsNum">
                  <FontAwesome
                      className="iconStats"
                      name='leanpub'
                      size='3x'
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    <span>Currently Reading <span className="currentShelfStats">{ numberOfBooks(currentlyReading) }</span></span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="statsNum">
                  <FontAwesome
                      className="iconStats"
                      name='clipboard'
                      size='3x'
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    <span>WANT TO READ <span className="currentShelfStats">{ numberOfBooks(wantToRead) }</span></span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="statsNum">
                  <FontAwesome
                      className="iconStats"
                      name='check-circle'
                      size='3x'
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    <span>READ <span className="currentShelfStats">{ numberOfBooks(read) }</span></span>
                  </div>
                </div>
              </div>
            <div className="list-books-content">
              <div className="bookshelf-reading">
                <BookShelf shelfTitle={'Currently Reading'} shelfUpdate={this.updateShelf} books={currentlyReading} shelfType='currentlyReading'/>
                <BookShelf shelfTitle={'Want to Read'} shelfUpdate={this.updateShelf} books={wantToRead} shelfType='wantToRead'/>
                <BookShelf shelfTitle={'Read'} shelfUpdate={this.updateShelf} books={read} shelfType='read'/>
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