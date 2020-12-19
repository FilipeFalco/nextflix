import axios from "axios";

export default function filmeID(props) {
  return (
    <>
    <h1 className="text-3xl my-4 mx-4">Filme: {props.title}</h1>
    <h1 className="text-2xl my-4 mx-4">Descrição: {props.overview}</h1>
    <h1 className="text-2xl mx-4">Data de lançamento: {props.release_date}</h1>
    </>
  );
}

export async function getServerSideProps (context) {
  const pesquisa = context.query.filmID

  const res = await axios.get(`https://api.themoviedb.org/3/movie/${pesquisa}?api_key=${process.env.MOVIEDB_KEY}&language=pt-BR`)
  
  return {
    props: res.data
    };
};
