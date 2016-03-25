import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextField from '../../../fields/TextField.jsx';
import SlugField from '../../../fields/SlugField.jsx';
import TextareaField from '../../../fields/TextareaField.jsx';
import FileField from '../../../fields/FileField.jsx';
import RelatedField from '../../../fields/RelatedField.jsx';
import BooleanField from '../../../fields/BooleanField.jsx';

export default class AdminItemForm extends TrackerReact(Component) {
	constructor(props){
		super(props);
		// console.log("constructor c_name: ", props.c_name);/
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

	getLabel(key){
		var collection = Mongo.Collection.get(this.props.c_name);
		try{
			return collection._c2._simpleSchema._schema[key].label;
		} catch(err) {
			console.log(err);
			return ""
		}
	}


	getAutoformObj(key){
		var collection = Mongo.Collection.get(this.props.c_name);
		return collection._c2._simpleSchema._schema[key].autoform;
	}

	getRelatedCollectionList(key){
		// получаем list objects коллеции по которой будем узнавать c_related (collection) поле
		var collection = Mongo.Collection.get(this.props.c_name);
		var schema_obj = collection._c2._simpleSchema._schema[key];
		// console.log(key, schema_obj.autoform.afFieldInput.collection);
		var c_related_name = schema_obj.autoform.afFieldInput.collection;
		var related_collection = Mongo.Collection.get(c_related_name);
		return list = related_collection.find().fetch();
	}

	getComponentsBySchema(){
		var collection = Mongo.Collection.get(this.props.c_name);
		return fields = collection._c2._simpleSchema._schemaKeys.map( (key)=>{
			// получаем объект схемы а затем и автоформу
			var schema_obj = collection._c2._simpleSchema._schema[key];
			var type;
			if (schema_obj.autoform && schema_obj.autoform.type || schema_obj.autoform.afFieldInput.type) {
				if (schema_obj.autoform.afFieldInput) {
					type = schema_obj.autoform.afFieldInput.type;	
				}else{
					type = schema_obj.autoform.type;	
				}
			}
			switch(type){

				case "text":
					return (
						<TextField 	key={key}
									c_name={this.props.c_name}
									c_field_name={key}
									obj={this.item()} />
					);
					break;

				case "slug":
					return (
						<SlugField 	key={key} 
									c_name={this.props.c_name}
									c_field_name={key}
									c_field_for_slug="name"
									obj={this.item()} />
					)	
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

				case "related":
					return (
						<RelatedField 	key={key}
										c_name={this.props.c_name}
										c_field_name={key}
										related_list={this.getRelatedCollectionList(key)}
										autoform_obj={this.getAutoformObj(key)}
										label={this.getLabel(key)}
										obj={this.item()} />
					);
					break;

				case "boolean":

					return (
						<BooleanField 	key={key}
										c_name={this.props.c_name}
										c_field_name={key}
										default={false}
										autoform_obj={this.getAutoformObj(key)}
										label={this.getLabel(key)}
										obj={this.item()} />
					);
					break;

				case "image":
					return null;
					break;
				default:
					console.log("switch-case default");
			}
		});
	}

	item(){
		var collection = Mongo.Collection.get(this.props.c_name);
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
							<h2>Редактирование {AdminConfig.collections[this.props.c_name].name} {this.item().name}</h2>
							<div className="">
								<form className="form-horizontal" encType="multipart/form-data">

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