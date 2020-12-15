import Nav from "../components/nav";
import { signIn, signOut, useSession } from "next-auth/client";

export default function IndexPage() {
  const [session, loading] = useSession();

  return (
    <div>
      <Nav />
        {!session && (
          <div className="text-3xl">
            Not signed in <br />
            <button onClick={() => signIn('auth0')}>Sign in</button>
          </div >
        )}
        {session && (
          <div className="text-3xl">
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut}>Sign out</button>
          </div>
        )}
    </div>
  );
}