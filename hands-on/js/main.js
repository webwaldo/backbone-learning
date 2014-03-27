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

	App.Models.Task = Backbone.Model.extend({
		validate: function(attrs){
			if( ! $.trim(attrs.title)){
				return 'A task requires a valid title';
			}
		}
	});

	App.Collections.Tasks = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',

		initialize: function() {
			this.collection.on('add', this.addOne, this);
		},

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
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		events: {
			'click .edit'	: 'editTask',
			'click .delete'	: 'destroy'
		},

		editTask: function(){
			var newTaskTitle = prompt('Change text to', this.model.get('title'));
			console.log('testing',this.model);
			//this.model.set({title: newTaskTitle}, {validate: true});
			if( !newTaskTitle ) return;

			this.model.set({title: newTaskTitle}, {validate: true});
		},

		destroy: function(){
			this.model.destroy();
			console.log(tasksCollection);
		},

		remove: function(){
			this.$el.remove();
		},
		
		render: function(){
			var template = this.template(this.model.toJSON());
			this.$el.html( template );
			return this;
		}
	});

	App.Views.AddTask = Backbone.View.extend({
		el: '#addTask',

		events: {
			'submit': 'submit'
		},

		initialize: function(){
			//console.log(this.el.innerHTML);
		},

		submit: function(e){
			e.preventDefault();
			console.log('submited');

			var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

			var task = new App.Models.Task({ title: newTaskTitle });
			this.collection.add(task);
			console.log(task);
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

	var addTaskView = new App.Views.AddTask({ collection: tasksCollection })
	var tasksView = new App.Views.Tasks({ collection: tasksCollection });
	tasksView.render();
	console.log(tasksView.el);
	$(".tasks").html(tasksView.el);
})();