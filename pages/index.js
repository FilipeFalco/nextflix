import Nav from "../components/nav";
import useSWR from 'swr'
import { signIn, signOut, useSession } from "next-auth/client"

import apiUser from "../components/nav";

export default function IndexPage() {
  const [session, loading] = useSession();

  const { data, error } = useSWR(`/api/user/${session?.user.email}`, apiUser);

  return (
    <div>
      <Nav />
      {!session && (
        <div className="text-center">
          <h1>Bem-vindo a NextFlix</h1>
          <h2>Faça seu 
          <button onClick={() => signIn('auth0')}>Login</button> </h2>
        </div>
      )}
      {session && data &&(
        <div className="text-center">
        <h1>Bem-vindo de volta {session.user.name}</h1>
        <button className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={() => signOut('auth0')}>Sair</button>
      </div>
      )}
      
    </div>
  );
}