import style from '@/components/noteCard/noteCard.module.css'
import { formatDate } from '@/utils/formatDate'

const NoteCard = ({ note, onClick, onEdit, onDelete }) => {
	return (
		<div className='col-6 col-md-4 mb-3'>
			<div
				className={`card ${style.card}`}
				onClick={onClick}
				style={{ cursor: 'pointer' }}
			>
				<div className='card-body'>
					<div className={style.head}>
						<h3 className={style.title}>{note.title}</h3>
						<small className={style.date}>{formatDate(note.createdAt)}</small>
					</div>
					<div
						className={style.divider}
						style={{ width: '100%', height: '1px', background: '#d7d7d7' }}
					></div>

					<p className={`card-text ${style.content}`}>{note.content}</p>
					<div className='d-flex justify-content-end mt-3'>
						<button
							className='btn btn-warning me-2'
							onClick={onEdit}
							data-bs-toggle='tooltip'
							title='Редактировать заметку'
						>
							<i className='bi bi-pencil'></i>
						</button>
						<button
							className='btn btn-danger'
							onClick={onDelete}
							data-bs-toggle='tooltip'
							title='Удалить заметку'
						>
							<i className='bi bi-trash'></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoteCard
