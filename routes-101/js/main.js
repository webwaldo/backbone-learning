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
		'download/*filename' : 'download'
	},

	index: function() {
		console.log('in the index');
	},

	show: function(id) {
		console.log('show route of id ' + id);
	},

	download: function(filename) {
		console.log('download ' + filename);
	}
	
});

new App.Router;
Backbone.history.start();

})();