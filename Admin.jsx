import React, {Component} from 'react';
import Footer from '../common/Footer.jsx'
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddPageForm from './AddPageForm.jsx';


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
				<div id="serviceswrap">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2">
								<h2>Админка</h2>
								<table className="table">
									<thead>
										<tr>
											<th>id</th>
											<th>Название</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{pages.map( (page)=>{
											return (
												<tr key={page._id}>
													<td>{page._id}</td>
													<td>{page.name}</td>
													<td><a href={"/admin/pages/" + page._id + "/edit"}>редактировать</a></td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</ReactCSSTransitionGroup>
		)
	}

}