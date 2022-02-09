import Reviews from "./Reviews.js";

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.show_movie = this.show_movie.bind(this);
    }

    show_movie(event) {
        event.preventDefault();
        this.props.update_movie(this.props.movie);
    }

    render() {
        if ( this.props.movie == null ) {
            return null;
        }

        return (
            <>
                <div className="movie">
                    <div className="image"><img src={this.props.movie.image_url} /></div>
                    <h3>{this.props.movie.name}</h3>
                    {this.props.in_list && <a href="#" onClick={this.show_movie}>View movie</a>}
                </div>
                {!this.props.in_list && <Reviews in_list={this.props.in_list} movie_id={this.props.movie.id} />}
            </>
        );
    }
}

export default Movie;