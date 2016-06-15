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


export default class CheckboxCPN extends Component {

	render(){
		if (!this.props.value) {
			return <div>Нет данных</div>
		}
		return(

			<div style={styles.block}>
				<Checkbox 	onClick={this.props.checkboxFunc}
							label={this.props.label}
							defaultChecked={false}
							style={styles.checkbox} />
			</div>

		)
	}
}