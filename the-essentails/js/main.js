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


// Person Model
App.Models.Person = Backbone.Model.extend({
    defaults: {
        name: 'John Doe',
        age: 30,
        occupation: 'Worker'
    }
});

// A list of people
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});

// View for all people
App.Views.People = Backbone.View.extend({
	tagName: 'ul',

	render: function(){
		//console.log('this',this);
		// Filter through all items in a collection
		this.collection.each( function(person) {
			// for each, creat a new personView
			var personView = new App.Views.Person({model: person});
			// append to root element
			this.$el.append(personView.render().el);
		}, this);
		
		return this;
	}	
});
	
// The view for a person
App.Views.Person = Backbone.View.extend({
    tagName: 'li',

    template: template('personTemplate'),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()) );
        return this;
    }
});

var peopleCollection = new App.Collections.People([
	{ name: 'Tom Thumb', age: 28},
	{ name: 'The Hulk', age: 50},
	{ name: 'That Guy', age: 20}
]);
// console.log(peopleCollection);
var peopleView = new App.Views.People({ collection: peopleCollection });

//peopleCollection.add(person);
//peopleCollection.add(person2);

// 
$(document.body).append(peopleView.render().el);

})();