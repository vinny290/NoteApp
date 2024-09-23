export const formatDate = dateString => {
	const now = new Date()
	const date = new Date(dateString)
	const diffInSeconds = Math.floor((now - date) / 1000)

	if (diffInSeconds < 60) return 'создано недавно'
	if (diffInSeconds < 3600)
		return `${Math.floor(diffInSeconds / 60)} минут(ы) назад`
	if (diffInSeconds < 86400)
		return `${Math.floor(diffInSeconds / 3600)} часа(ов) назад`
	if (diffInSeconds < 604800)
		return `${Math.floor(diffInSeconds / 86400)} дня(ей) назад`
	return date.toLocaleDateString()
}
