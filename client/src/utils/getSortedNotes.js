export const getSortedNotes = (notes, sortOrder) => {
	return [...notes].sort((a, b) => {
		const dateA = new Date(a.createdAt)
		const dateB = new Date(b.createdAt)
		return sortOrder === 'new' ? dateB - dateA : dateA - dateB
	})
}
