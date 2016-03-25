import React, {Component} from 'react';
import DropdownCPN from '../elements/DropdownCPN.jsx';


export default class RelatedField extends Component {

	setRelation(e){
		// console.log("setRelation this: ", this);
		// console.log("selected_item e.target.id: ", e.target);
		var collection_name = this.props.c_name;
		var field_name = this.props.c_field_name;
		var id = this.props.obj._id;
		var selected_obj_id = e.target.id;
		Meteor.call("updateFieldInObj", collection_name, field_name, id, selected_obj_id);
	}

	render(){
		if (!this.props.obj) {
			return <div>Нет данных</div>
		}
		// console.log("check this.props.related_list: ", this.props.related_list);
		// console.log("RelatedField props: ");
		// console.log("	this.props.c_name: ", this.props.c_name);
		// console.log("	this.props.c_field_name: ", this.props.c_field_name);
		// console.log("	this.props.obj: ", this.props.obj);
		return(
			<div className="form-group">
				<label htmlFor={this.props.c_field_name}>Родственная связь поле {this.props.c_field_name}: </label>
				
				<DropdownCPN	label={this.props.label}
								list={this.props.related_list} 
								itemFunc={this.setRelation.bind(this)}/>
			</div>
		)
	}
}