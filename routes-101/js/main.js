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
		'show' : 'show'
	},

	index: function() {
		console.log('in the index');
	},

	show: function() {
		console.log('show route');
	}
	
});

new App.Router;
Backbone.history.start();

})();