import React, {Component} from 'react';
import Checkbox from 'material-ui/lib/checkbox';



const styles = {
	block: {
		maxWidth: 250,
	},
	checkbox: {
		marginBottom: 16,
	},
};


export default class BooleanField extends Component {

	changeValue(e){
		e.preventDefault();
		var collection_name = this.props.c_name;
		var field_name = this.props.c_field_name;
		var id = this.props.obj._id;
		var bool_value = !this.props.obj[this.props.c_field_name];
		Meteor.call("updateFieldInObj", collection_name, field_name, id, bool_value);
	}

	render(){
		if (!this.props.obj) {
			return <div>Нет данных</div>
		}
		return(
				
			<div style={styles.block}>
				<Checkbox 	onCheck={this.changeValue.bind(this)}
							label={this.props.label}
							defaultChecked={this.props.obj[this.props.c_field_name]}
							style={styles.checkbox} />
			</div>
		)
	}
}
