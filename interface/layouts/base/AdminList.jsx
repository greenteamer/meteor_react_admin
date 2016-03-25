import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class AdminList extends TrackerReact(Component) {

	constructor(){
		super();
		this.state = {
			subscription: {
				pages: Meteor.subscribe("pages"),
				categories: Meteor.subscribe("categories"),
				flatblocks: Meteor.subscribe("flatblocks"),
				projects: Meteor.subscribe("projects"),
				images: Meteor.subscribe("images")
			}
		}
	}


	componentWillUnmount() {
		this._renderComputation.stop();
		this.state.subscription.pages.stop();
		this.state.subscription.categories.stop();
		this.state.subscription.flatblocks.stop();
		this.state.subscription.projects.stop();
		this.state.subscription.images.stop();
	}

	addEmptyObj(e){
		e.preventDefault();
		Meteor.call("addEmptyObj", this.props.c_name);
	}

	delItem(e){
		e.preventDefault();
		Meteor.call("delObj", this.props.c_name, e.target.id);
	}

	render(){
		var collection = Mongo.Collection.get(this.props.c_name);
		var list = collection.find().fetch();
		if (list.length < 1) {
			return (
				<button onClick={this.addEmptyObj.bind(this)}
						className="btn btn-primary btn-sm">добавить блок</button>
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
				
				<h2>Список {AdminConfig.collections[this.props.c_name].name}</h2>
				
				<button onClick={this.addEmptyObj.bind(this)}
						className="btn btn-primary btn-sm">добавить {AdminConfig.collections[this.props.c_name].name}</button>
				
				<table className="table">
					<thead>
						<tr>
							<th>id</th>
							<th>Название</th>
							<th>slug</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{list.map( (obj)=>{
							return (	
								<tr key={obj._id}>
									<td>{obj._id}</td>
									<td>{obj.name}</td>
									<td>{obj.slug}</td>
									<td>
										<a href={"/admin/" + this.props.c_name + "/" + obj._id + "/edit"}>
											<i className="btn btn-primary btn-sm fa fa-edit"></i>
										</a>
									</td>
									<td>
										<i 	onClick={this.delItem.bind(this)}
											id={obj._id}
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



