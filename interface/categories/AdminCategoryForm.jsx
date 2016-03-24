import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from '../../fields/TextField.jsx';
import SlugField from '../../fields/SlugField.jsx';
import TextareaFlatField from '../../fields/TextareaFlatField.jsx';


export default class AdminFlatBlockForm extends TrackerReact(Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				categories: Meteor.subscribe("categories")
			}
		}
	}

	componentWillUnmount() {
		this._renderComputation.stop();
		this.state.subscription.categories.stop();  
	}

	category(){
		return Categories.findOne(this.props._id);
	}

	render(){
		if (!this.category()) {
			return <div>Нет данных</div>
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
						<div className="col-lg-9">
							<h2>Редактирование категории {this.category().name}</h2>
							<div className="">
								<form className="form-horizontal" encType="multipart/form-data">
									
									<TextField 	c_name="categories"
												c_field_name="name"
												obj={this.category()} />

									<SlugField 	c_name="categories"
												c_field_name="slug"
												c_field_for_slug="name"
												obj={this.category()} />
									
								</form>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}