import Movie from "./movie";

const MovieList = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          {props.movies.map((movie, i) => {
            return <Movie key={i} image={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};
