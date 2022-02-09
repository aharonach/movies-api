import Movie from "./Movie.js";
import Alert from "./Alert.js";

class Movies extends React.Component {
  render() {
    if (this.props.list.length > 0) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, this.props.list.map(movie => /*#__PURE__*/React.createElement(Movie, {
        movie: movie,
        key: movie.id,
        update_movie: this.props.update_movie,
        in_list: true
      })));
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Alert, {
      error: this.props.search ? "No movies found!" : "No movies yet!"
    }));
  }

}

export default Movies;