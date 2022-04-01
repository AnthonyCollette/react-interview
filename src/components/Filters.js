import React, { useEffect } from 'react'

const Filters = ({
	categories,
	movies,
	sortByFilter,
	setCategories,
	addFilter,
}) => {
	let _ = require('lodash')
	let uniqBy = require('lodash.uniqby')
	useEffect(() => {
		setCategories(_.uniqBy(movies, 'category'))
	}, [movies])

	return (
		<div className="filters">
			<form className="filter-wrapper">
				{categories?.map((movie) => (
					<div className="input-wrapper" key={movie.category}>
						<input
							type="checkbox"
							value={movie.category}
							id={'input-' + movie.category}
							className="checkbox-filter"
							onClick={(e) => addFilter(e.target.value)}
						/>
						<label htmlFor={'input-' + movie.category} key={movie.id}>
							{movie.category}
						</label>
					</div>
				))}
				<button className="filter-btn" type="submit" onClick={sortByFilter}>
					Filtrer
				</button>
			</form>
		</div>
	)
}

export default Filters
