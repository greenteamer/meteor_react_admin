import React, {Component} from "react";


export default class Sidebar extends Component {

	render(){
		if (AdminConfig.collections.length < 1) {
			return (
				<div>Пожалуйста заполните объект AdminConfig для корректного отображения меню</div>
			)
		}
		var list = _.pairs(AdminConfig.collections).map( (arr_obj)=>{
			return (
				<li key={arr_obj[0]}>
					<a href={"/admin/"+arr_obj[1].c_name}>
						<i className="fa fa-pencil-square-o"></i> <span>{arr_obj[1].name}</span>
					</a>
				</li>
			)
		})
		return(
			<aside className="main-sidebar">
				<section className="sidebar">
					<div className="user-panel">
						<div className="pull-left image">
							<img src="/libraries/adminLTE/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
						</div>
						<div className="pull-left info">
							<p>Alexander Pierce</p>
							<a href="#"><i className="fa fa-circle text-success"></i> Online</a>
						</div>
					</div>
					<ul className="sidebar-menu">
						<li className="header">MAIN NAVIGATION</li>
						{list}
					</ul>
				</section>
			</aside>
		)
	}

}