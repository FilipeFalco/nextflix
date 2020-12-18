import useSWR from 'swr'
import { signIn, signOut, useSession } from "next-auth/client"


import Nav from "../components/nav";
import apiUser from "../components/nav";

const ProfilePage = () => {
  const [session, loading] = useSession();

  const { data, error } = useSWR(`/api/user/${session?.user.email}`, apiUser);

  return (
    <div>
      <Nav />
      {!session && (
        <div className="text-3xl">
          Favor fazer login para acessar essa página
          <br />
          <button onClick={() => signIn('auth0')}>Login</button>
        </div>
      )}
      {session && data && (
        <>
          <div className="text-3xl">
            Você esta logado como {session.user.email} <br />
            <button onClick={() => signOut('auth0')}>Sair</button>
          </div>
          <h1>{data.name}</h1>
          <h1>{data.date_birth}</h1>
        </>
      )}
      {session && error && <h1>O usuário com email {session.user.email} não existe</h1>}
    </div>
  );
};

export default ProfilePage;
