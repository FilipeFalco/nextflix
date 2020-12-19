import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import {useSession } from "next-auth/client";

import Nav from "../components/nav";
import apiUser from "../components/nav";

const ProfilePage = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [date_birth, setDate_birth] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [loggedUserWithoutAccount, setLoggedUserWithoutAccount] = useState(
    false
  );

  const [session, loading] = useSession();

  const { data, error } = useSWR(
    !loggedUserWithoutAccount && !loading
      ? `/api/user/${session?.user.email}`
      : null,
    apiUser
  );

  useEffect(() => {
    setErrorCount((prevstate) => prevstate + 1);
    if (error && errorCount === 1) setLoggedUserWithoutAccount(true);
  }, [error, setErrorCount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      date_birth,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user`, data);
      setLoggedUserWithoutAccount(false);
    } catch (error) {
      alert(err?.response?.data?.error || 'Houve um problema na criação da conta');
    }
  };

  return (
    <div>
      <Nav />
      {!session && (
        <div className="text-3xl">
          Favor fazer login para acessar essa página
          <br />
          <button className="btn-blue" onClick={() => signIn("auth0")}>Login</button>
        </div>
      )}
      {session && data && (
        <>
          <div className="text-3xl">
            Você esta logado como {session.user.email} <br />
            <button className="btn-red" onClick={() => signOut("auth0")}>Sair</button>
          </div>
          <h1>{data.name}</h1>
          <h1>{data.date_birth}</h1>
        </>
      )}
      {loggedUserWithoutAccount &&
        session &&(
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">Seja bem vindo ao NextFlix</h1>
            <h1 className="text-2xl">
              Por gentileza, finalize a criação do seu perfil
            </h1>
            <form className="flex flex-col items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Nome completo"
                className="bg-gray-200 my-4"
              />

              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="E-mail"
                className="bg-gray-200 my-4"
              />

              <input
                type="date"
                value={date_birth}
                onChange={(e) => {
                  setDate_birth(e.target.value);
                }}
                className="bg-gray-200 my-4"
              />
              <button className="btn-green" type="submit">
                Cria perfil
              </button>
            </form>
          </div>
        )}
    </div>
  );
};

export default ProfilePage;
