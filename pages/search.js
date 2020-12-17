import { NextPage } from 'next'
import { signIn, signOut, useSession} from 'next-auth/client'

import searchFilm from '../utils/searchFilm'

const SearchPage = () => {
    const [session, loading] = useSession()

    return (
        <div>
            <Nav />
            <h1>Página de busca</h1>
        </div>
    )
}