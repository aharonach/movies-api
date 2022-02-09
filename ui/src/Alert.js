class Alert extends React.Component {
    render() {
        if ( ! this.props.error ) {
            return null;
        }

        return <div className="alert">{this.props.error}</div>;
    }
}

export default Alert;