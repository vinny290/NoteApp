import store from '@/store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import { Provider } from 'react-redux'

const NoteApp = ({ Component, pageProps }) => {
	return (
		<div>
			<Head>
				<link
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css'
				/>
			</Head>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</div>
	)
}

export default NoteApp
