import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from './fields/TextField.jsx';
import TextareaField from './fields/TextareaField.jsx';
import FileField from './fields/FileField.jsx';

export default class AddPageForm extends TrackerReact(Component) {
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

	page(){
		return Pages.findOne(this.props.id);
	}

	render(){
		if (!this.page()) {
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
				
				<div id="serviceswrap">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-lg-offset-2">
								<h2>Редактирование страницы {this.page().name}</h2>
								<div className="accounts-form">
									<form className="form-horizontal" encType="multipart/form-data">
										
										<TextField 	c_name="pages"
													c_field_name="name"
													obj={this.page()} />

										<TextareaField 	c_name="pages"
													c_field_name="text"
													obj={this.page()} />
										
										<FileField 	c_name="pages"
													c_field_name="images"
													obj={this.page()} />
										
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
		</ReactCSSTransitionGroup>
		)
	}
}