import Alert from "./Alert.js";

class PostReview extends React.Component {
  constructor(props) {
    super(props);
    this.default_state = {
      text: '',
      rating: '',
      email: '',
      display_name: '',
      error: ''
    };
    this.state = Object.assign({}, this.default_state);
    this.on_change = this.on_change.bind(this);
    this.on_submit = this.on_submit.bind(this);
  }

  on_change(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async on_submit(event) {
    event.preventDefault();
    const review = await this.post_review(this.props.movie_id, this.state);

    if (review.success) {
      this.props.add_review();
    } else {
      this.setState({
        error: review.error
      });
    }
  }

  async post_review(movie_id, fields) {
    const res = await fetch("/api/movie/" + movie_id + "/reviews", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...fields
      })
    });
    return await res.json();
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
      className: "row",
      onSubmit: this.on_submit
    }, /*#__PURE__*/React.createElement(Alert, {
      error: this.state.error
    }), /*#__PURE__*/React.createElement("h3", null, "Post a review"), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Your Review * "), /*#__PURE__*/React.createElement("textarea", {
      onChange: this.on_change,
      name: "text",
      value: this.state.text,
      rows: "3",
      required: true
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "rating"
    }, "Rating * ", /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "1",
      max: "5",
      onChange: this.on_change,
      name: "rating",
      value: this.state.rating,
      required: true
    })), /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "Your Email * ", /*#__PURE__*/React.createElement("input", {
      type: "email",
      onChange: this.on_change,
      name: "email",
      value: this.state.image_url,
      required: true
    })), /*#__PURE__*/React.createElement("label", {
      htmlFor: "display_name"
    }, "Your Name ", /*#__PURE__*/React.createElement("input", {
      type: "text",
      onChange: this.on_change,
      name: "display_name",
      value: this.state.display_name
    })), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Post!")));
  }

}

export default PostReview;