import React, { Component } from 'react';
import "./Newsfeed.css";
import Axios from "axios";

class Newsfeed extends Component {
	state = {
		news: []
	}
	componentDidMount() {
		Axios.get("/api/news/scrape")
			.then(res => {
		}).catch(function(error) {
                console.error(error);
            });

	}

	render () {
		return <div className="col s3 center card-panel">Newsfeed</div>
	}
}

export default Newsfeed;