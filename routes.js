import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from '../layouts/MainLayout.jsx';

import Admin from './Admin.jsx';
import AddPageForm from './AddPageForm.jsx';



// admin
FlowRouter.route('/admin', {
	action(){
		mount(MainLayout, {
			content: <Admin />
		})
	}
});

FlowRouter.route('/admin/pages/:id/edit', {
	action(params){
		mount(MainLayout, {
			content: <AddPageForm id={params.id}/>
		})
	}
});

