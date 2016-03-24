import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class AdminPageList extends TrackerReact(Component) {

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

	addProduct(e){
		e.preventDefault();
		console.log("START ADD PAGE");
		Meteor.call("addEmptyPage");
	}

	delItem(e){
		e.preventDefault();
		Meteor.call("delObj", "pages", e.target.id);
	}

	render(){
		var pages = Pages.find().fetch();
		if (pages.length < 1) {
			return (
				<button onClick={this.addProduct.bind(this)}
						className="btn btn-primary btn-sm">добавить проект</button>
			)
		}
		return(
			<ReactCSSTransitionGroup 
				component="div"
				transitionName="route"
				transitionEnterTimeout={600}
				transitionAppearTimeout={600}
				transitionLeaveTimeout={400}
				transitionAppear={true}>
				
				<h2>Проекты</h2>
				
				<button onClick={this.addProduct.bind(this)}
						className="btn btn-primary btn-sm">добавить проект</button>
				
				<table className="table">
					<thead>
						<tr>
							<th>id</th>
							<th>Название</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{pages.map( (page)=>{
							return (	
								<tr key={page._id}>
									<td>{page._id}</td>
									<td>{page.name}</td>
									<td>
										<a href={"/admin/projects/" + page._id + "/edit"}>
											<i className="btn btn-primary btn-sm fa fa-edit"></i>
										</a>
									</td>
									<td>
										<i 	onClick={this.delItem.bind(this)}
											id={page._id}
											className="btn btn-danger btn-sm fa fa-times"></i>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>

			</ReactCSSTransitionGroup>
		)
	}

}