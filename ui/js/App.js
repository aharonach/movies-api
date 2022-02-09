import Search from "./Search.js";
import Movies from "./Movies.js";
import PostMovie from "./PostMovie.js";
import Movie from "./Movie.js";
import Logo from "./Logo.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      random_movies: [],
      movie: null,
      search: false
    };
    this.update_movies = this.update_movies.bind(this);
    this.update_movie = this.update_movie.bind(this);
    this.reset_movies = this.reset_movies.bind(this);
    this.add_movie = this.add_movie.bind(this);
    this.load_movies = this.load_movies.bind(this);
    this.load_random = this.load_random.bind(this);
    this.close_popup = this.close_popup.bind(this);
  }

  componentDidMount() {
    this.reset_movies();
  }

  async load_movies() {
    const response = await fetch('/api/movies?order=desc');
    const json = await response.json();
    this.update_movies('movies', json);
  }

  async load_random() {
    const res = await fetch('/api/movies?random');
    const json = await res.json();
    this.update_movies('random_movies', json);
  }

  reset_movies() {
    this.load_movies();
    this.load_random();
  }

  update_movies(list, movies, search = false) {
    this.setState({
      [list]: movies,
      search: search
    });
  }

  update_movie(movie) {
    this.setState({
      movie: movie
    });
  }

  add_movie() {
    this.reset_movies();
  }

  close_popup(event) {
    event.preventDefault();
    this.setState({
      movie: null
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PostMovie, {
      add_movie: this.add_movie
    }), /*#__PURE__*/React.createElement(Search, {
      update_movies: this.update_movies,
      reset_movies: this.reset_movies
    }), /*#__PURE__*/React.createElement(Movies, {
      update_movie: this.update_movie,
      list: this.state.movies,
      search: this.state.search
    })), /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("h2", null, "Random Movies"), /*#__PURE__*/React.createElement(Movies, {
      update_movie: this.update_movie,
      list: this.state.random_movies
    }))), /*#__PURE__*/React.createElement("div", {
      className: "popup " + (this.state.movie ? "show" : "")
    }, this.state.movie && /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: this.close_popup
    }, "Close Popup")), /*#__PURE__*/React.createElement(Movie, {
      movie: this.state.movie,
      in_list: false,
      update_movie: this.update_movie
    })));
  }

}

export default App;