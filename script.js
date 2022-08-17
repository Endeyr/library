// Show / Hide Form
const showFormBtn = document.getElementById('showFormBtn'),
	form = document.getElementById('form')
showFormBtn.addEventListener('click', () => {
	showFormBtn.classList.remove('d-block')
	showFormBtn.classList.add('d-none')
	form.classList.remove('d-none')
	form.classList.add('d-block')
})

// Book Class: Represents a Book
class Book {
	constructor(author, isbn, title, pages, progress) {
		this.author = author
		this.isbn = isbn
		this.title = title
		this.pages = pages
		this.progress = progress
	}
}

// UI Class: Handle UI Tasks
class UI {
	static displayBooks() {
		const books = Store.getBooks()

		books.forEach((book) => UI.addBookToList(book))
	}

	static addBookToList(book) {
		const list = document.getElementById('book-list')

		const row = document.createElement('tr')

		row.innerHTML = `
		<td>${book.author}</td>
		<td>${book.title}</td>
		<td>${book.pages}</td>
		<td>${book.progress}</td>
		<td>${book.isbn}</td>
		<td><button
			class="btn btn-primary btn-sm ms-3"
				data-mdb-add-entry
				data-mdb-target="#table_inputs"
			>
				<i class="bi bi-pencil edit"></i>
			</button>
			<button
			class="btn btn-danger btn-sm ms-3"
				data-mdb-add-entry
				data-mdb-target="#table_inputs"
			>
				<i class="bi bi-x delete"></i>
			</button></td>
		`

		list.appendChild(row)
	}

	static deleteBook(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.parentElement.remove()
		}
	}

	static editBook(el) {}

	static showAlert(message, className) {
		const div = document.createElement('div')
		div.className = `alert alert-${className}`
		div.appendChild(document.createTextNode(message))
		const container = document.querySelector('.container')
		const header = document.querySelector('.btn')
		container.insertBefore(div, header)
		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 3000)
	}

	static clearFields() {
		document.getElementById('author').value = ''
		document.getElementById('isbn').value = ''
		document.getElementById('title').value = ''
		document.getElementById('pages').value = ''
		document.getElementById('progress').value = 'Select'
	}
}

// Store Class: Handles Storage
class Store {
	static getBooks() {
		let books
		if (localStorage.getItem('books') === null) {
			books = []
		} else {
			books = JSON.parse(localStorage.getItem('books'))
		}

		return books
	}

	static addBook(book) {
		const books = Store.getBooks()
		books.push(book)
		localStorage.setItem('books', JSON.stringify(books))
	}

	static removeBook(isbn) {
		const books = Store.getBooks()

		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1)
			}
		})

		localStorage.setItem('books', JSON.stringify(books))
	}
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault()

	// Get form values
	const author = document.getElementById('author').value
	const isbn = document.getElementById('isbn').value
	const title = document.getElementById('title').value
	const pages = document.getElementById('pages').value
	const progress = document.getElementById('progress').value

	// Validate
	if (author === '' || isbn === '' || title === '' || pages === '') {
		UI.showAlert('Please fill in all fields', 'danger')
	} else {
		// Instantiate book
		const book = new Book(author, isbn, title, pages, progress)

		// Add Book to UI
		UI.addBookToList(book)

		// Add Book to LocalStorage
		Store.addBook(book)

		// Show Success Message
		UI.showAlert('Book Added', 'success')

		// Clear Fields
		UI.clearFields()
	}
})

// Event: Remove a Book
document.getElementById('book-list').addEventListener('click', (e) => {
	// Remove Book from UI
	UI.deleteBook(e.target)

	// Remove Book from LocalStorage
	Store.removeBook(
		e.target.parentElement.parentElement.previousElementSibling.textContent
	)

	// Show Success Message
	UI.showAlert('Book Removed', 'success')
})

// Event: Edit a Book
document.getElementById('book-list').addEventListener('click', (e) => {
	UI.editBook(e.target)
})
