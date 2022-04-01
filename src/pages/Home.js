import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { movies$ } from '../movies'
import Pagination from '../components/Pagination'
import Rating from '../components/Rating'
import Filters from '../components/Filters'

const Home = () => {
	const [categories, setCategories] = useState()
	const [movies, setMovies] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [moviesPerPage, setMoviesPerPage] = useState(4)
	const [pageNumbers, setPageNumbers] = useState([])
	let _ = require('lodash')
	let uniqBy = require('lodash.uniqby')
	useEffect(() => {
		function getMovies() {
			movies$
				.then((data) => {
					setMovies(data)
				})
				.catch((error) => console.log(error))
		}
		getMovies()
	}, [])
	const deleteMovie = (movieToDelete) => {
		const updatedMovies = [...movies]
		const newMovies = updatedMovies.filter(
			(movie) => movie.id !== movieToDelete.id
		)

		setMovies(newMovies)
		if (
			movies.filter((movie) => movie.category === movieToDelete.category)
				.length < 1
		) {
			setCategories(_.uniqBy(movies, 'category'))
		}
	}
	const like = (id) => {
		const newVoteCount = [...movies]
		const index = newVoteCount.findIndex(
			(newVoteCount) => newVoteCount.id === id
		)
		newVoteCount[index].likes++
		setMovies(newVoteCount)
	}
	const dislike = (id) => {
		const newVoteCount = [...movies]
		const index = newVoteCount.findIndex(
			(newVoteCount) => newVoteCount.id === id
		)
		newVoteCount[index].dislikes++
		setMovies(newVoteCount)
	}

	const sortByFilter = (e) => {
		e.preventDefault()
		if (filters === []) {
			alert("Vous n'avez rien sélectionné !")
		}
		let moviesUnfiltered = [...movies]
		let moviesFiltered = []
		moviesUnfiltered.forEach((movie) => {
			if (filters.includes(movie.category)) {
				moviesFiltered.push(movie)
			}
		})
		setMovies(moviesFiltered)
	}

	const indexOfLastMovie = currentPage * moviesPerPage
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
	const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie)

	const paginate = (pageNumber) => {
		document.getElementById(`page-${currentPage}`).classList.remove('active')
		setCurrentPage(pageNumber)
		document.getElementById(`page-${pageNumber}`).classList.add('active')
	}
	const paginateDown = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
			document.getElementById(`page-${currentPage}`).classList.remove('active')
			document.getElementById(`page-${currentPage - 1}`).classList.add('active')
		} else {
			alert('You already are on the first page, sorry !')
		}
	}

	const paginateUp = () => {
		if (currentPage < pageNumbers.length) {
			setCurrentPage(currentPage + 1)
			document.getElementById(`page-${currentPage}`).classList.remove('active')
			document.getElementById(`page-${currentPage + 1}`).classList.add('active')
		} else {
			alert('You already are on the last page, sorry !')
		}
	}
	const changeDisplay = (value) => {
		setMoviesPerPage(value)
	}
	const filters = []
	const addFilter = (value) => {
		if (filters.includes(value)) {
			if (filters.indexOf(value) !== -1) {
				filters.splice(filters.indexOf(value), 1)
			}
		} else {
			filters.push(value)
		}
	}
	return (
		<>
			<Filters
				categories={categories}
				sortByFilter={sortByFilter}
				setCategories={setCategories}
				movies={movies}
				addFilter={addFilter}
			/>
			<div className="cards">
				{currentMovies?.map((movie, id) => (
					<div key={id} className="card-wrapper">
						<Card
							key={id}
							title={movie.title}
							category={movie.category}
							movie={movie}
							deleteMovie={deleteMovie}
						/>

						<Rating
							movie={movie}
							like={like}
							dislike={dislike}
							movies={movies}
							currentPage={currentPage}
						/>
					</div>
				))}
			</div>

			<Pagination
				movies={movies.length}
				moviesPerPage={moviesPerPage}
				paginate={paginate}
				paginateDown={paginateDown}
				paginateUp={paginateUp}
				changeDisplay={changeDisplay}
				setPageNumbers={setPageNumbers}
				pageNumbers={pageNumbers}
			/>
		</>
	)
}

export default Home
