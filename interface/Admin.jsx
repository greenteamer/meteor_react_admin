import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Admin extends TrackerReact(Component) {

	constructor(){
		super();
		this.state = {
			subscription: {
				pages: Meteor.subscribe("userPages"),
				images: Meteor.subscribe("images")
			}
		}
	}

	componentWillUnmount() {
		this._renderComputation.stop();
		this.state.subscription.pages.stop();  
		this.state.subscription.images.stop(); 
	}

	render(){
		var pages = Pages.find().fetch();
		if (pages.length < 1) {
			return (<div>Нет данных</div>)
		}
		return(
			<ReactCSSTransitionGroup 
				component="div"
				transitionName="route"
				transitionEnterTimeout={600}
				transitionAppearTimeout={600}
				transitionLeaveTimeout={400}
				transitionAppear={true}>

				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-lg-offset-2">
							<h2>Админка</h2>
							
						</div>
					</div>
				</div>
				
			</ReactCSSTransitionGroup>
		)
	}

}