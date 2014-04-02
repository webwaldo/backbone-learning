// single self invoking anonymous function
(function(){

window.App = {
	Models: {},
	Collections: {},
	Views: {},
	Router:  {}
};

App.Router = Backbone.Router.extend( {
	routes:  {
		'': 'index', 
		'show/:id' : 'show',
		'download/*filename' : 'download',
		'search/:query' : 'search',
		'*other' : 'default'
	},

	index: function() {
		console.log('in the index');
	},

	show: function(id) {
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
	}
	
	
});

new App.Router;
Backbone.history.start();

})();