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
			<div className="col s12 center">
				<div className="newsfeedBox">
					<h4 className="h4Newsfeed">Newsfeed</h4>
					<div className="headlineBox">
						{this.state.news.map((headline, i) =>
							<div key={i}>
								<p className="newsfeedHeadline"><a className="headlineA" target="_blank" href={headline.link} key>{headline.title}</a></p>
								<hr />
							</div>
							)}
					</div>
				</div>
				
			</div>
		)
	}
}

export default Newsfeed;