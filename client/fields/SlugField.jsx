import React, {Component} from 'react';


export default class SlugField extends Component {

	updateValue(value){
		var collection_name = this.props.c_name;
		var field_name = this.props.c_field_name;
		var id = this.props.obj._id;
		Meteor.call("updateFieldInObj", collection_name, field_name, id, value);
	}

	changeValue(e){
		var value = this.refs.textInput.value;
		this.updateValue(value);
	}

	slugifyFunc(text){
		var value = slugify(text);
		this.updateValue(value);
		return value;
	}

	render(){
		if (!this.props.obj) {
			return <div>Нет данных</div>
		}
		return(
			<div className="form-group">
				<label htmlFor={this.props.c_field_name}>Автоматическая генерация поля {this.props.c_field_name}: </label>
				<input onChange={this.changeValue.bind(this)} 
					type="text" 
					ref="textInput" 
					disabled="disabled"
					id={this.props.c_field_name}
					value={this.slugifyFunc(this.props.obj[this.props.c_field_for_slug])}/>
			</div>
		)
	}
}