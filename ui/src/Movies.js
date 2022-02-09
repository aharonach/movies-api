import Movie from "./Movie.js";
import Alert from "./Alert.js";

class Movies extends React.Component {
    render() {
        if ( this.props.list.length > 0 ) {
            return <>{this.props.list.map( movie => <Movie movie={movie} key={movie.id} update_movie={this.props.update_movie} in_list={true} />)}</>;
        }

        return <><Alert error={this.props.search ? "No movies found!" : "No movies yet!" } /></>;
    }
}

export default Movies;