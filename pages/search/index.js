import { useState, useCallback } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

import api from '../../utils/apiUser';
import Nav from '../../components/nav';


const SearchPage= () => {
  const [textInput, setTextInput] = useState('');

  const { data, error } = useSWR(
    textInput !== '' ? `/api/search/${textInput}` : null,
    api
  );

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();

      setTextInput(document.getElementsByTagName('input')[0].value);
    },
    [setTextInput]
  );

  return (
    <div>
      <Nav />

      <div className="text-center">
        <form onSubmit={handleSearch}>
        <input
            type="text"
            placeholder="Digite o nome do filme..."
            className="text-2xl border-2 border-box w-3/12 m-auto text-center my-12 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
          <button type="submit" className="hidden">
            Pesquisar
          </button>
        </form>
        {data &&
          data.data.map((film) => (
            <Link href={`/search/${film._id}`} key={film._id}>
              <a>
                <h1 className="text-2xl border-2 border-box w-1/2 m-auto mt-4 py-2">
                  {film.name}
                </h1>
              </a>
            </Link>
          ))}

        {error && (
          <div className="text-xl">
            <h1>Erro na busca pelo filme {textInput}</h1>
          </div>
        )}
      </div>

      <div className="text-center mb-10">
      </div>
    </div>
  );
};

export default SearchPage;