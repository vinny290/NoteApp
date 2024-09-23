export const getFilteredNotes = (notes, filterDate, filterLetters) => {
	return notes.filter(
		note =>
			(filterDate
				? new Date(note.createdAt).toLocaleDateString() ===
				  new Date(filterDate).toLocaleDateString()
				: true) &&
			(filterLetters
				? note.title.toLowerCase().startsWith(filterLetters.toLowerCase())
				: true)
	)
}
