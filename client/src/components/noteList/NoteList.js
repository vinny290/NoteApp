import style from '@/components/noteList/noteList.module.css'
import { getFilteredNotes } from '@/utils/getFilteredNotes'
import { getSortedNotes } from '@/utils/getSortedNotes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteById, fetchNotes } from '../../store/notesSlice'
import NoteCard from '../noteCard/NoteCard'
import NoteModal from '../noteModal/NoteModal'

const NotesList = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const notes = useSelector(state => state.notes.notes)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [currentNote, setCurrentNote] = useState('')
	const [filterDate, setFilterDate] = useState('')
	const [filterLetters, setFilterLetters] = useState('')
	const [sortOrder, setSortOrder] = useState('new')

	const sortedNotes = getSortedNotes(notes, sortOrder)
	const filteredNotes = getFilteredNotes(sortedNotes, filterDate, filterLetters)

	useEffect(() => {
		dispatch(fetchNotes())
	}, [dispatch])

	const handleEdit = note => {
		setCurrentNote(note)
		setModalIsOpen(true)
	}

	const handleDelete = id => {
		if (confirm('Вы уверены, что хотите удалить эту заметку?')) {
			dispatch(deleteNoteById(String(id)))
		}
	}

	const handleNoteClick = id => {
		router.push(`/note/${id}`)
	}

	const handleCloseModal = () => {
		setCurrentNote('')
		setModalIsOpen(false)
	}

	return (
		<div>
			<div className='d-flex justify-content-center mb-4'>
				<button
					type='button'
					className='btn btn-primary btn-lg mb-2'
					onClick={() => {
						setCurrentNote(null)
						setModalIsOpen(true)
					}}
				>
					Создать заметку
					<i className='bi bi-plus-square ms-2'></i>
				</button>
			</div>

			<div className={`d-flex justify-content-end mb-4 ${style.wrap}`}>
				<select
					className='form-select d-inline-block w-auto'
					value={sortOrder}
					onChange={e => setSortOrder(e.target.value)}
				>
					<option value='new'>Сначала новые</option>
					<option value='old'>Сначала старые</option>
				</select>

				<input
					type='date'
					value={filterDate}
					onChange={e => setFilterDate(e.target.value)}
					className='form-control d-inline-block w-auto ms-2'
				/>

				<input
					type='text'
					placeholder='Фильтровать по первым буквам'
					value={filterLetters}
					onChange={e => setFilterLetters(e.target.value)}
					className='form-control d-inline-block w-auto ms-2'
				/>
			</div>
			<div className='row'>
				{filteredNotes.map(note => (
					<NoteCard
						key={note.id}
						note={note}
						onClick={() => handleNoteClick(note.id)}
						onEdit={e => {
							e.stopPropagation()
							handleEdit(note)
						}}
						onDelete={e => {
							e.stopPropagation()
							handleDelete(note.id)
						}}
					/>
				))}
			</div>
			<NoteModal
				isOpen={modalIsOpen}
				onRequestClose={handleCloseModal}
				currentNote={currentNote}
			/>
		</div>
	)
}

export default NotesList
