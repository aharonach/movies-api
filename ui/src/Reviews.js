import Review from "./Review.js";
import Alert from "./Alert.js";
import PostReview from "./PostReview.js";

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }

        this.load_reviews = this.load_reviews.bind(this);
        this.add_review = this.add_review.bind(this);
    }

    async componentDidMount() {
        await this.load_reviews();
    }
    
    async load_reviews() {
        const response = await fetch("/api/movie/" +  this.props.movie_id + "/reviews");
        const json = await response.json();
        this.setState({ reviews: json });
    }

    async add_review() {
        await this.load_reviews()
    }

    render() {
        if ( this.state.reviews.length > 0 ) {
            return (
                <>
                    <h3>Reviews</h3>
                    <PostReview movie_id={this.props.movie_id} add_review={this.add_review} />
                    {this.state.reviews.map( (review, index) => <Review review={review} key={index} />)}
                </>
            );
        }

        return (
            <>
                <h3>Reviews</h3>
                <PostReview movie_id={this.props.movie_id} add_review={this.add_review} />
                <Alert error="No reviews!" />
            </>
        )
    }
}

export default Reviews;