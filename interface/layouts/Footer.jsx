import React, {Component} from 'react';
import ProfileMenu from '../profile/ProfileMenu.jsx';


export default class Header extends Component {
	render(){
		return(
			<footer className="main-footer">
				<div className="pull-right hidden-xs">
					<b>Version</b> 2.3.0
				</div>
				<strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
			</footer>
		)
	}
}