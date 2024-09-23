const validateForm = (title, content) => {
	let isValid = true

	if (!title.trim()) {
		alert('Пожалуйста, введите заголовок!')
		isValid = false
	}

	if (!content.trim()) {
		alert('Пожалуйста, введите содержание!')
		isValid = false
	}

	return isValid
}

export default validateForm
