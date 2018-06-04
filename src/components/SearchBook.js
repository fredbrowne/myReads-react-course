import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {
	state = { 
		query: '',
		queryBooks: []
	}
	//Function that will receive value from input and use in the query variable to search in the API
	updateQuery = (query) => {
		this.setState({ queryBooks: [] })
		//If searched word is greater than or equal 2, calls API to retrieve list of books.
		if (query.length > 2) {
			//Call BooksAPI passing the query and retrieve all books
			BooksAPI.search(query).then((queryBooks) => {
				//This IF will double check if after the API has returned, the user removed the input in order
				//to erase the query.
				if (this.state.query.length < 2) {
					this.setState({ queryBooks: [] })
					} else {
					//Only continue if there are no errors returned from BooksAPI
					if(!queryBooks.error) {
						//Iterate through books for shelf validation
						for (const book of queryBooks) {
							//Default, non-shelf book will be defined as NONE
							book.shelf = 'none'
							//Filter Books already existent to compare with books recovered.
							//This is necessary to retrieve Shelf Status and apply to recovered books from API.
							const existentBook = this.props.books.filter((b) => (b.id === book.id))
							if (existentBook) {
								//Iterate again the Object and assign the same shelf
								for(const b of existentBook) {
									book.shelf = b.shelf
								}
								//Concatenate the new book with the current shelf to update the state.
								const newShelf = this.state.queryBooks.filter(b => b.id !== book.id).concat(book)
								this.setState({ queryBooks: newShelf })
							}
						}
						this.setState({ queryBooks })
					} else {
						//Erase query if API returns error
						this.setState({ queryBooks: [] })
						this.setState({ query: '' })
					}
				}
			})
			this.setState({ query })
		} else {
				//Erase query if user removes the input value
				this.setState({ queryBooks: []})
				this.setState({ query: '' })
		}
	}

	render() {
			const { query } = this.state.query
			//If search retrieved values, call BookShelf component to render the books.
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