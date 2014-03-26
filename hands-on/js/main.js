// single self invoking anonymous function
(function(){

	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.template = function(id){
		return _.template($('#' + id ).html());
	};

	App.Models.Task = Backbone.Model.extend({});

	App.Collections.Tasks = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',

		render: function(){
			this.collection.each(this.addOne, this);
		},

		addOne: function(task){
			// Creating a new child view & Append to root element
			var taskView = new App.Views.Task({ model: task});
			this.$el.append(taskView.render().el);
		}
	});

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',

		template: template('taskTemplate'),

		initialize: function() {
			this.model.on('change', this.render(), this);
		},

		events: {
			'click .edit': 'editTask'
		},

		editTask: function(){
			var newTaskTitle = prompt('Change text to', this.model.get('title'));

			this.model.set({title: newTaskTitle}, {validate: true});
		},
		
		render: function(){
			var template = this.template(this.model.toJSON());
			this.$el.html( template );
			return this;
		}
	});

	var tasksCollection = new App.Collections.Tasks([
		{
			title: 'Go to the store',
			priority: 4
		},
		{
			title: 'Go to the Mall',
			priority: 3
		},
		{
			title: 'Go to the work',
			priority: 54
		}
	]);

	var tasksView = new App.Views.Tasks({ collection: tasksCollection });
	tasksView.render();
	console.log(tasksView.el);
	$(".tasks").html(tasksView.el);
})();