import React, {Component} from 'react';


export default class TextField extends Component {

	changeValue(e){
		e.preventDefault();
		var collection_name = this.props.c_name;
		var field_name = this.props.c_field_name;
		var id = this.props.obj._id;
		var value = this.refs.textInput.value;
		Meteor.call("updateFieldInObj", collection_name, field_name, id, value);
	}

	render(){
		if (!this.props.obj) {
			return <div>Нет данных</div>
		}
		return(
			<div className="form-group">
				<label htmlFor={this.props.c_field_name}>Редактирование поля {this.props.c_field_name}: </label>
				<input onChange={this.changeValue.bind(this)} 
					type="text" 
					ref="textInput" 
					id={this.props.c_field_name}
					defaultValue={this.props.obj[this.props.c_field_name]}/>
			</div>
		)
	}
}