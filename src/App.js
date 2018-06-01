import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
//import { Route } from 'react-router-dom';
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {

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

  updateQuery = (query) => {
    //If searched word is greater than 3, calls API to retrieve list of books.
    if (query.length >= 2) {
      BooksAPI.search(query).then((queryBooks) => {
        if(!queryBooks.error) {
          this.setState({ queryBooks })
        }
      })
      this.setState({ query })
    }
  }
  clearQuery = () => {
    console.log('calling clearQuery')
    this.setState({ query: '' })
    this.setState({ showSearchPage: false })
  }
  render() {
    const { query } = this.state.query
    const SearchShelf = this.state.queryBooks ? (
      <BookShelf shelfTitle={'Book Search'} shelfUpdate={this.updateShelf} books={this.state.queryBooks} shelfType='none'/>
    ) : (
      <div></div>
    );

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={this.clearQuery}>Close</a>
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
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp



/*
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState({ query: query })
    }
    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state

        let showingContacts
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                    to='/create'
                    className='add-contact'>
                    Add Contact </Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }} />
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                            Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts
*/