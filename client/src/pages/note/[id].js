import { deleteNoteById, fetchNotes } from '@/store/notesSlice'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NoteDetail = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { id } = router.query
	const notes = useSelector(state => state.notes.notes)
	const status = useSelector(state => state.notes.status)

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchNotes())
		}
	}, [status, dispatch])

	const note = notes.find(note => note.id === String(id))

	const handleDelete = () => {
		if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
			dispatch(deleteNoteById(String(id)))
			router.push('/')
		}
	}

	if (!note) {
		return (
			<div className='container mt-5'>
				<h2>Заметка не найдена</h2>
			</div>
		)
	}

	return (
		<div className='container mt-5'>
			<div className='card'>
				<div className='card-header'>
					<h1 className='card-title'>{note.title}</h1>
				</div>
				<div className='card-body'>
					<p className='card-text'>{note.content}</p>
					<div className='d-flex justify-content-end mt-3'>
						<button
							className='btn btn-outline-danger me-2'
							onClick={handleDelete}
							title='Удалить заметку'
						>
							Удалить
							<i className='bi bi-trash ms-2'></i>
						</button>
						<button
							className='btn btn-outline-secondary'
							onClick={() => router.push('/')}
						>
							Назад
							<i className='bi bi-backspace ms-2'></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoteDetail
