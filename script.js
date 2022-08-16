let myLibrary = []
let newBook
let tempLibrary

function Book(authorFirstName, authorLastName, title, pages, progress) {
	this.authorFirstName = authorFirstName
	this.authorLastName = authorLastName
	this.title = title
	this.pages = pages
	this.progress = progress
	this.info = function () {
		return (
			title +
			' by' +
			authorFirstName +
			' ' +
			authorLastName +
			', ' +
			pages +
			' pages' +
			', read:' +
			progress
		)
	}
}

function addBookToLibrary() {
	// do stuff here
}

const showFormBtn = document.getElementById('showFormBtn'),
	form = document.getElementById('form')
showFormBtn.addEventListener('click', () => {
	showFormBtn.classList.remove('d-block')
	showFormBtn.classList.add('d-none')
	form.classList.remove('d-none')
	form.classList.add('d-block')
})
