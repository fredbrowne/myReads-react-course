import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {
    state = { 
        query: '',
        queryBooks: []
    }

    updateQuery = (query) => {
        //If searched word is greater than or equal 2, calls API to retrieve list of books.
        if (query.length >= 2) {
          BooksAPI.search(query).then((queryBooks) => {
            if(!queryBooks.error) {
              for (const book of queryBooks) {
                book.shelf = 'none'
                const existentBook = this.props.books.filter((b) => (b.id === book.id))
                if (existentBook) {
                    for(const b of existentBook) {
                        book.shelf = b.shelf
                    }
                    const newShelf = this.state.queryBooks.filter(b => b.id !== book.id).concat(book)
                    this.setState({ queryBooks: newShelf })
                }
              }
              this.setState({ queryBooks })
            }
          })
          this.setState({ query })
        } else {
          this.setState({ queryBooks: []})
        }
      }

    render() {
        const { query } = this.state.query
        console.log('shelfUpdate', this.props.shelfUpdate)
        const SearchShelf = this.state.queryBooks ? (
            <BookShelf shelfTitle={'Book Search'} shelfUpdate={this.props.shelfUpdate} books={this.state.queryBooks} shelfType='none'/>
          ) : (
            <div></div>
          );
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" onClick={this.props.clearQuery}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text" 
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                { SearchShelf }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook

/*import React, { Component } from 'react';

class SearchBook extends Component {
    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={this.clearQuery}>Close</a>
              <div className="search-books-input-wrapper">
                {
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                }
                <input 
                type="text" 
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              { SearchShelf }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook
*/