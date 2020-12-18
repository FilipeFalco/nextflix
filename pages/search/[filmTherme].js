import axios from "axios";
import { MovieDb } from "moviedb-promise";

export default function filmeTherme() {
  return <h1 className="text-3xl">Filme X</h1>;
}

export const getServerSideProps = async (context) => {
  // conecta com o tmdb
  const moviedb = new MovieDb(process.env.MOVIEDB_KEY);

  // busca pelo termo
  const findMovie = async (title) => {
    const res = await moviedb.searchKeyword(title);

    return res;
  };
};
