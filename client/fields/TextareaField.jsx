import React, {Component} from 'react';


export default class ToolbarVersions extends Component {

	componentDidMount(){
		this._editor = CKEDITOR.replace(this.props.c_field_name);
	}

	componentWillUnmount() {
		this._editor.destroy();
		this._editor = null;
	}

	changeValue(e){
		e.preventDefault();
		var collection_name = this.props.c_name;
		var field_name = this.props.c_field_name;
		var id = this.props.obj._id;
		var value = this._editor.getData();
		Meteor.call("updateFieldInObj", collection_name, field_name, id, value);
	}

	render(){
		if (!this.props.obj) {
			return <div>Нет данных</div>
		}
		return(
			<div className="form-group ckeditor-field">

				<label htmlFor={this.props.c_field_name}>Редактирование поля {this.props.c_field_name}: </label>
				<textarea 	ref="textInput"
							id={this.props.c_field_name}
							defaultValue={this.props.obj[this.props.c_field_name]} />

				<button onClick={this.changeValue.bind(this)}
					className="btn btn-block btn-primary btn-sm">сохранить поле {this.props.c_field_name}</button>

			</div>
		)
	}
}



