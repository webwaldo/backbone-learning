// single self invoking anonymous function
(function(){

window.App = {
	Models: {},
	Collections: {},
	Views: {},
	Router:  {}
};


var vent = _.extend( {}, Backbone.Events);

console.log(vent);

App.Views.Appointments = Backbone.View.extend( {
	initialize: function() {
		vent.on('appointment:show', this.show, this);	
	},

	show: function(id) {
		console.log(' Showing the appointment with the id of ' + id);

		// sudo code
		/*
		var appointment = this.collection.get(id);
		var appointmentView = new APp.Views.Appointment( {
			 model: appointment
		}
		);

		$(document.body).append(appointmentView.render().el());
		*/
		// end sudo

		
	}
	
	
});

App.Router = Backbone.Router.extend( {
	routes:  {
		'': 'index', 
	/*	'show/:id' : 'show',
		'download/*filename' : 'download',
		'search/:query' : 'search',
		'*other' : 'default',
		*/		
		'appointment/:id' : 'showAppointment'
	},

	index: function() {
		console.log('in the index');
	},

	show: function(id) {
		this.collection;
		console.log('show route of id ' + id);
	},

	download: function(filename) {
		console.log('download ' + filename);
	},

	search: function(query) {
		console.log('search ' + query);
	},

	default: function(other) {
		console.log('default route you accessed: ' + other);
	},

	showAppointment: function(appointmentId) {
		console.log('apt id ' + appointmentId);
		vent.trigger('appointment:show', appointmentId);
	}
	
});

// sudo
/*
new App.Views.Appointments( {	
	collection:  {
		something : 'something'
	}
	
} );
*/

new App.Router;
Backbone.history.start();

})();