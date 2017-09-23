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
				this.setState({news: res.data})
		}).catch(function(error) {
                console.error(error);
            });
	}

	render () {
		return (
			<div className="col s3 center card-panel">
				<h4>Newsfeed</h4>
				{this.state.news.map(headline => 
					<p>{headline.title}</p>)}
			</div>
		)
	}
}

export default Newsfeed;