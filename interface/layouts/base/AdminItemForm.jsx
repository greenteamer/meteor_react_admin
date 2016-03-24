import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from '../../../fields/TextField.jsx';
import SlugField from '../../../fields/SlugField.jsx';
import TextareaField from '../../../fields/TextareaField.jsx';
import FileField from '../../../fields/FileField.jsx';

export default class AdminItemForm extends TrackerReact(Component) {
	constructor(props){
		super(props);
		console.log("constructor c_name: ", props.c_name);
		this.state = {
			subscription: {
				c_name: Meteor.subscribe(props.c_name),
				images: Meteor.subscribe("images")
			}
		}
	}

	componentWillUnmount() {
		this._renderComputation.stop();
		this.state.subscription.c_name.stop();  
		this.state.subscription.images.stop(); 
	}

	getComponentsBySchema(){
		var collection = Mongo.Collection.get(this.props.c_name);
		console.log(collection._c2._simpleSchema);
		var fields = collection._c2._simpleSchema._schemaKeys.map( (key)=>{
			// получаем объект схемы а затем и автоформу
			var schema_obj = collection._c2._simpleSchema._schema[key];
			var type;
			if (schema_obj.autoform && schema_obj.autoform.type || schema_obj.autoform.afFieldInput.type) {
				type = schema_obj.autoform.afFieldInput ? schema_obj.autoform.afFieldInput.type : schema_obj.autoform.type;
			}
			console.log(type, " ", key);
			// console.log("_schema[key]: ", schema_obj);
			switch(type){
				case "text":
					if (key == "slug") {
						return (
							<SlugField 	key={key} 
										c_name={this.props.c_name}
										c_field_name={key}
										c_field_for_slug="name"
										obj={this.item()} />
						)
					}else{
						return (
							<TextField 	key={key}
										c_name={this.props.c_name}
										c_field_name={key}
										obj={this.item()} />
						);
					}
					break;
				case "textarea":
					return (
						<TextareaField 	key={key}
										c_name={this.props.c_name}
										c_field_name={key}
										obj={this.item()} />
					);
					break;
				case "imageGallery":
					return (
						<FileField 	key={key}
									c_name={this.props.c_name}
									c_field_name={key}
									obj={this.item()} />
					)
					break;
				case "image":
					return null;
					break;
				default:
					console.log("switch-case default");
			}
		});
		return fields;
	}

	item(){
		var collection = Mongo.Collection.get(this.props.c_name);
		// console.log(collection);
		return collection.findOne(this.props._id);
	}

	render(){
		if (!this.item()) {
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
							<h2>Редактирование страницы {this.item().name}</h2>
							<div className="">
								<form className="form-horizontal" encType="multipart/form-data">
									
									<TextField 	c_name={this.props.c_name}
												c_field_name="name"
												obj={this.item()} />

									<SlugField 	c_name={this.props.c_name}
												c_field_name="slug"
												c_field_for_slug="name"
												obj={this.item()} />

									<TextareaField 	c_name={this.props.c_name}
												c_field_name="text"
												obj={this.item()} />
									
									<FileField 	c_name={this.props.c_name}
												c_field_name="images"
												obj={this.item()} />

									<h4>Test:</h4>
									{this.getComponentsBySchema()}
									
								</form>
							</div>
						</div>
					</div>
				</div>
				
		</ReactCSSTransitionGroup>
		)
	}
}