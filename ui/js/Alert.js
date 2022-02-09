class Alert extends React.Component {
  render() {
    if (!this.props.error) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "alert"
    }, this.props.error);
  }

}

export default Alert;