import express, { json, urlencoded } from 'express';
import { router, load_data } from './routes/router.js';

const app = express();
let port = 5050;

function get_content_type_from_ext(url) {
	const match = url.match( /\.([a-z]+)/i );
	
	if ( ! match ) {
		if ( url === '/' ) {
			return 'text/html';
		}

		return 'application/json';
	}

	const ext = match[1].toLowerCase();

	switch( ext ) {
		case 'js': 
			return 'text/javascript';
		case 'css': 
			return 'text/css';
		case 'html': 
			return 'text/html';
	}

	return 'text/plain';
}

// General app settings
app.use((req, res, next) => {
	const content_type = '/api' === req.baseUrl ? 'application/json; charset=utf-8' : get_content_type_from_ext(req.url);
	res.contentType(content_type);
	next();
});

app.use(json()); // to support JSON-encoded bodies
app.use(urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(express.static('ui'));

app.use('/api', router);

app.listen(port, () => {
    load_data();
    console.log(`Listening on port ${port}...`);
});
