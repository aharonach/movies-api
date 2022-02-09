import Alert from "./Alert.js";

class PostMovie extends React.Component {
    constructor(props) {
        super(props);
        this.default_state = {
            name: '',
            image_url: '',
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
        this.setState({ [event.target.name]: event.target.value });
    }

    async on_submit(event) {
        event.preventDefault();
        const movie = await this.post_movie(this.state);

        if ( movie.success == false ) {
            this.setState({ error: movie.error });
        } else {
            this.props.add_movie();
            this.setState(this.default_state);
        }
    }

    async post_movie(fields) {
        const res = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...fields})
        });

        return await res.json();
    }

    render() {
        return (
            <>
                <form className="row" onSubmit={this.on_submit}>
                    <Alert error={this.state.error} />
                    <Alert error={this.state.secret ? "Your secret: " + this.state.secret : ""} />
                    <h3>Submit a new movie</h3>
                    <label htmlFor="name">Movie Name * <input onChange={this.on_change} type="text" name="name" value={this.state.name} required /></label>
                    <label htmlFor="image_url">Image Url * <input onChange={this.on_change} type="url" name="image_url" value={this.state.image_url} required /></label>
                    <label htmlFor="email">Your Email * <input onChange={this.on_change} type="email" name="email" value={this.state.email} required /></label>
                    <label htmlFor="display_name">Your Name <input onChange={this.on_change} type="text" name="display_name" value={this.state.display_name} /></label>
                    <button type="submit">Submit!</button>
                </form>
            </>
        )
    }
}

export default PostMovie;