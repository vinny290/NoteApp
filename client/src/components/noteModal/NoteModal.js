import style from '@/components/noteModal/noteModal.module.css'
import validateForm from '@/utils/validateForm'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { createNote, updateNoteById } from '../../store/notesSlice'

Modal.setAppElement('#__next')

const NoteModal = ({ isOpen, onRequestClose, currentNote }) => {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [titleError, setTitleError] = useState(false)
	const [contentError, setContentError] = useState(false)

	useEffect(() => {
		if (currentNote) {
			setTitle(currentNote.title)
			setContent(currentNote.content)
		} else {
			setTitle('')
			setContent('')
		}
	}, [currentNote])

	const handleSubmit = e => {
		e.preventDefault()

		if (validateForm(title, content)) {
			if (currentNote) {
				dispatch(updateNoteById({ ...currentNote, title, content }))
			} else {
				dispatch(createNote({ title, content }))
			}
			onRequestClose()
		} else {
			setTitleError(!title.trim())
			setContentError(!content.trim())
		}
	}

	return (
		<div
			className={`modal fade ${isOpen ? 'show' : ''}`}
			style={{ display: isOpen ? 'block' : 'none' }}
			tabIndex='-1'
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>
							{currentNote ? 'Редактировать заметку' : 'Создать заметку'}
						</h5>
						<button
							type='button'
							className='btn-close'
							onClick={onRequestClose}
						></button>
					</div>
					<div className='modal-body'>
						<form onSubmit={handleSubmit}>
							<div className='mb-3'>
								<label htmlFor='titleNote' className='form-label'>
									Заголовок
								</label>
								<input
									type='text'
									className={`form-control ${style.titleModal} ${
										titleError ? 'border-danger' : ''
									}`}
									id='titleNote'
									value={title}
									placeholder='Заголовок'
									onChange={e => {
										setTitle(e.target.value)
										setTitleError(false)
									}}
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='contentNote' className='form-label'>
									Содержание
								</label>
								<textarea
									className={`form-control ${style.contentModal} ${
										contentError ? 'border-danger' : ''
									}`}
									id='contentNote'
									rows='5'
									placeholder='Ввод...'
									value={content}
									onChange={e => {
										setContent(e.target.value)
										setContentError(false)
									}}
								/>
							</div>
							<div className='d-flex justify-content-end mt-3'>
								<button type='submit' className='btn btn-success'>
									Сохранить
								</button>
								<button
									type='button'
									className='btn btn-danger ms-2'
									onClick={onRequestClose}
								>
									Выйти
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoteModal
