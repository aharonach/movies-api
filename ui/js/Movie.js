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
    if (this.props.movie == null) {
      return null;
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "movie"
    }, /*#__PURE__*/React.createElement("div", {
      className: "image"
    }, /*#__PURE__*/React.createElement("img", {
      src: this.props.movie.image_url
    })), /*#__PURE__*/React.createElement("h3", null, this.props.movie.name), this.props.in_list && /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: this.show_movie
    }, "View movie")), !this.props.in_list && /*#__PURE__*/React.createElement(Reviews, {
      in_list: this.props.in_list,
      movie_id: this.props.movie.id
    }));
  }

}

export default Movie;