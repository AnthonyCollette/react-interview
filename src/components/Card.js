import React from 'react'

const Card = ({ title, category, deleteMovie, movie }) => {
	return (
		<div className="card">
			<h2>{title}</h2>
			<p className="filter">{category}</p>
			<button className="delete-button" onClick={() => deleteMovie(movie)}>
				<i className="fa-solid fa-xmark"></i>
			</button>
		</div>
	)
}

export default Card
