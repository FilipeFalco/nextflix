import axios from "axios";

export default function filmeTherme(props) {
  return (
    <>
    <h1 className="text-3xl">Filme: {props.title}</h1>
    <h1 className="text-2xl">Descrição: {props.overview}</h1>
    <h1 className="text-2xl">Data de lançamento: {props.release_date}</h1>
    </>
  );
}

export async function getServerSideProps (context) {
  const pesquisa = context.query.filmTherme

  const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_KEY}&language=pt-BR&query=${pesquisa}&page=1&include_adult=false`)

  console.log(res.data)
  
  return {
    props: res.data
    };
};
