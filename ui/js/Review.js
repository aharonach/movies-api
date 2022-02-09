class Review extends React.Component {
  render() {
    if (this.props.review == null) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "review"
    }, /*#__PURE__*/React.createElement("h4", null, "Review by: ", this.props.review.display_name), /*#__PURE__*/React.createElement("p", null, "Rating: ", this.props.review.rating), /*#__PURE__*/React.createElement("p", null, this.props.review.text));
  }

}

export default Review;