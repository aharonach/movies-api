class Review extends React.Component {
    render() {
        if ( this.props.review == null ) {
            return null;
        }

        return (
            <div className="review">
                <h4>Review by: {this.props.review.display_name}</h4>
                <p>Rating: {this.props.review.rating}</p>
                <p>{this.props.review.text}</p>
            </div>
        );
    }
}

export default Review;