import React from 'react'
import { useEffect } from 'react'

const Rating = ({ movie, movies, like, dislike, currentPage }) => {
	useEffect(() => {
		const jauge = document.getElementById('ratio-' + movie.id)
		const percent =
			Math.round(100 * movie.likes) / (movie.likes + movie.dislikes)
		jauge.style.width = `${percent}%`
	}, [currentPage, movies])
	return (
		<div className="rating-module">
			<div className="jauge">
				<div className="ratio-likes" id={'ratio-' + movie.id}></div>
			</div>
			<div className="number-wrapper">
				<div className="likes">
					<button onClick={() => like(movie.id)} className="like-btn">
						<i className="fa-solid fa-thumbs-up"></i>
					</button>
					<p>{movie.likes}</p>
				</div>
				<div className="dislikes">
					<button
						id={movie.id}
						onClick={() => dislike(movie.id)}
						className="dislike-btn"
					>
						<i className="fa-solid fa-thumbs-down"></i>
					</button>
					<p>{movie.dislikes}</p>
				</div>
			</div>
		</div>
	)
}

export default Rating
