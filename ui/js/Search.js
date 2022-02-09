class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.on_change = this.on_change.bind(this);
    this.on_submit = this.on_submit.bind(this);
    this.on_reset = this.on_reset.bind(this);
  }

  on_change(event) {
    event.preventDefault();
    this.setState({
      term: event.target.value
    });
  }

  async on_submit(event) {
    event.preventDefault();
    const result = await this.search_movies(this.state.term);
    this.props.update_movies('movies', result, true);
  }

  on_reset(event) {
    event.preventDefault();
    this.props.reset_movies();
  }

  async search_movies(term) {
    const res = await fetch('/api/movies?term=' + term);
    const json = await res.json();
    return json;
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.on_submit
    }, /*#__PURE__*/React.createElement("h3", null, "Search a movie"), /*#__PURE__*/React.createElement("input", {
      onChange: this.on_change,
      type: "text",
      value: this.state.term
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Search!"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: this.on_reset
    }, "Reset")));
  }

}

export default Search;