import React from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';


export const AdminLayout = ({content}) => (
	<div id="react-admin">
		<link rel="stylesheet" href="/libraries/adminLTE/css/AdminLTE.css"/>
		<link rel="stylesheet" href="/libraries/adminLTE/css/skins/skin-blue.css"/>
		<div className="wrapper">

			<Header />
			<Sidebar />

			<div className="content-wrapper">
				<section className="content-header">
					<h1>
						Dashboard
						<small>Контрольная панель</small>
					</h1>
					<ol className="breadcrumb">
						<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
						<li className="active">Dashboard</li>
					</ol>
				</section>

				<section className="content">
					{content}
				</section>
			</div>

			<Footer />

		</div>
	</div>

)
