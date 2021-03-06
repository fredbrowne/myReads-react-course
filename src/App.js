import React from 'react'
import './App.css'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf'
import SearchBook from './components/SearchBook'
import FontAwesome from 'react-fontawesome'
import { Grid, Row, Col, Badge } from 'react-bootstrap';

class App extends React.Component {

  state = {
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

  //Call BooksAPI to update shelf
  updateShelf = (b, e) => {
    if (e !== 'none') {
      BooksAPI.update(b, e)
      b.shelf = e
      const newBooks = this.state.books.filter(book => book.id !== b.id).concat(b)
      this.setState({ books: newBooks })
    } else {
      //This filter will remove from current shelf once selected as 'none'
      const newBooks = this.state.books.filter((book) => book.id !== b.id)
      this.setState({ books: newBooks })
    }
  }

  //Clear query and return to main page
  clearQuery = () => {
    this.setState({ query: '' })
    this.setState({ queryBooks: []})
  }
  
  render() {
    //count and return the number of books
    const numberOfBooks = (books) => {
      var length = 0;
      for (const book of books) {
        if( book ) {
          ++length;
        }
      }
      return length
    }
    //Set a variable with the collection of books based on Status
    const currentlyReading = this.state.books.filter((book) => (book.shelf === "currentlyReading"))
    const wantToRead = this.state.books.filter((book) => (book.shelf === "wantToRead"))
    const read = this.state.books.filter((book) => (book.shelf === "read"))
    //BookShelf Counter helper to render <div>
    const bookshelfStats = (icon, textSent, bookCount) => {
      return <Col md={3} xs={6} >
        <div className="statsNum">
          <FontAwesome
              className="iconStats"
              name={ icon }
              size='3x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          <span>{ textSent } <Badge><span className="currentShelfStats">{ bookCount }</span></Badge></span>
        </div>
      </Col>
    }

    return (
      <div className="app">
        <Route path='/search' render={() => (
            <SearchBook books={this.state.books} shelfUpdate={this.updateShelf} clearQuery={this.clearQuery} />
          )}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="container shelfStatus">
              <Grid>
                <Row className="show-grid">
                  { bookshelfStats('book', 'Number of Books', numberOfBooks(this.state.books)) }
                  { bookshelfStats('leanpub', 'Currently Reading', numberOfBooks(currentlyReading)) }
                  { bookshelfStats('clipboard', 'Want to Read', numberOfBooks(wantToRead)) }
                  { bookshelfStats('check-circle', 'Read', numberOfBooks(read)) }
                </Row >
              </Grid>
            </div>
            <div className="list-books-content">
              <div className="bookshelf-reading">
                <div className="container">
                  <Grid>
                    <Row className="show-grid">
                      <Col md={12} xs={12} >
                        <BookShelf shelfTitle={'Currently Reading'} shelfUpdate={this.updateShelf} books={currentlyReading} shelfType='currentlyReading'/>
                        <BookShelf shelfTitle={'Want to Read'} shelfUpdate={this.updateShelf} books={wantToRead} shelfType='wantToRead'/>
                        <BookShelf shelfTitle={'Read'} shelfUpdate={this.updateShelf} books={read} shelfType='read'/>
                      </Col>
                    </Row>
                  </Grid>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link 
                to="/search" >Add a book
              </Link>
            </div>
          </div>)}
        />
      </div>
    )
  }
}

export default App