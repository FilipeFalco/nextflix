import { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";

import Nav from "../../components/nav";

const SearchPage = () => {
  const [textInput, setTextInput] = useState("");
  const [data, setData] = useState("");

  const handleSearch = useCallback(async () => {
    await axios.get(`https://api.themoviedb.org/3/movie/{textInput}?api_key=${process.env.MOVIEDB_KEY}&language=pt-BR`).then((response) => {
      const films = response.data;

    console.log(films)

      setData(films);
    });
  });
  [textInput, setData];

  return (
    <div>
      <Nav />

      <div className="text-center">
        <input
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          type="text"
          placeholder="Digite o nome do filme..."
          className="text-2xl border-2 border-box w-3/12 m-auto text-center my-12 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
        <button type="submit" className="bg-blue-200" onClick={handleSearch}>
          Pesquisar
        </button>

        {data.length !== 0 &&
          data.map((film) => (
            <Link href={`/search/${film.id}`} key={film.id}>
              <a>
                <h1 className="text-2xl border-2 border-box w-1/2 m-auto mt-4 py-2">
                  {film.name}
                </h1>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
