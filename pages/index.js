import { signIn, signOut, useSession } from "next-auth/client";

import Nav from "../components/nav";

export default function IndexPage() {
  const [session, loading] = useSession();

  return (
    <div>
      <Nav />
        {!session && (
          <div className="text-3xl">
            Bem-Vindo a Nexflix
            Not signed in <br />
            <button onClick={() => signIn('auth0')}>Login</button>
          </div >
        )}
        {session && (
          <div className="text-3xl">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut('auth0')}>Sair</button>
          </div>
        )}
    </div>
  );
}