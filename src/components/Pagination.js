import React, { useEffect } from 'react'

const Pagination = ({
	moviesPerPage,
	movies,
	paginate,
	paginateDown,
	paginateUp,
	changeDisplay,
	setPageNumbers,
	pageNumbers,
}) => {
	useEffect(() => {
		const totalPages = () => {
			const numberOfPages = []
			for (let i = 1; i <= Math.ceil(movies / moviesPerPage); i++) {
				numberOfPages.push(i)
			}
			setPageNumbers(numberOfPages)
		}
		totalPages()
	}, [movies, moviesPerPage])

	return (
		<>
			<ul className="pagination">
				<button onClick={paginateDown} className="prev">
					<i class="fa-solid fa-angle-left"></i>
				</button>
				{pageNumbers?.map((number) => (
					<li
						key={number}
						id={'page-' + number}
						className={number === 1 ? 'active' : ''}
						onClick={() => {
							paginate(number)
						}}
					>
						{number}
					</li>
				))}
				<button onClick={paginateUp} className="next">
					<i class="fa-solid fa-angle-right"></i>
				</button>
			</ul>
			<div className="select-wrapper">
				<p>Nombre d'éléments affichés par page</p>
				<select
					onChange={(e) => changeDisplay(e.target.value)}
					name="sortByNumber"
					id="sort-by-number"
				>
					<option value="4">4</option>
					<option value="8">8</option>
					<option value="12">12</option>
				</select>
			</div>
		</>
	)
}

export default Pagination
