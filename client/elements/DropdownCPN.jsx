import React, {Component} from 'react';


export default class DropdownCPN extends Component {

	render(){
		if (this.props.list < 1) {
			return <div>Нет данных</div>
		}
		return(

			<li className="dropdown"
				style={{listStyle: "none"}}>
				<a 	className="dropdown-toggle btn btn-primary" 
					data-toggle="dropdown" 
					href="#" 
					aria-expanded="false">
					{this.props.label} <span className="caret"></span>
				</a>
				<ul className="dropdown-menu">
					{this.props.list.map((item)=>{
						return (
							<li key={item._id}
								role="presentation">
								<a 	onClick={this.props.itemFunc}
									id={item._id}
									role="menuitem" tabIndex="-1" href="#">{item.name}</a>
							</li>
						)
					})}
				</ul>
			</li>

		)
	}
}