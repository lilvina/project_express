// CLIENT-SIDE JAVASCRIPT

$(function(){

	// `commentsController` holds all our phrase functionality
	var actionController = {

		// compile comment template
		template: _.template($('#action-template').html()),

		all: function(){
			$.get('/action', function(data){
				var allAction = data;

				// iterate through allAction
				_.each(allAction, function(action){
					// pass each action object through template and append to view
					var $actionHtml = $(actionController.template(action));
					$('#action-list').append($actionHtml);
				});
				// add event-handlers to action for updating/deleting
				actionController.addEventHandlers();
			});
		},

		create: function(newName, newDescription){
			var actionData = {name: newName, newDescription: newDescription};
			// send POST request to server to create new action
			$.post('/action', actionData, function(data){
				// pass action object through template and append the view
				var $actionHtml = $(actionController.template(data));
				$('#action-list').append($actionHtml);
			});
		},

		update: function(actionId, updatedName, updatedDescription){
			// send PUT request to server to update action
			$.ajax({
				type: "POST",
				url: "/api/action" + actionId,
				data: {
					name: updatedName,
					description: updatedDescription
				},
				success: function(data){
					var updatedAction = data;


					// replace existing action in view with updated phrase
					var $actionHtml = $(actionController.template(updatedAction));
					$('#action-' + actionId).replaceWith($actionHtml);
				}
			});
		},

		delete: function(actionId){
			// send DELETE request to server to delete action
			$.ajax({
				type: "DELETE",
				url: '/api/action/' + actionId,
				success: function(data){

					// remove deleted action
					$('#action-' + actionId).remove();
				}
			});
		},
		// add event-handlers to action for updating/deleting
		addEventHandlers: function(){
			$('#action-list')


			// for update: submit event on `.update-action` form
			.on('submit', '.update-action', function(event){
				event.preventDefault();

				// find the action's id
				var actionId = $(this).closest('.action').attr('data-id');

				// delete the action
				actionController.delete(actionId);
			});
			
		},

		setupView: function(){
			// append the existing action to view/see
			actionController.all();

			// add event-handler to new action form
			$('#new-action').on('submit', function(event){
				event.preventDefault();

				// create new action
				var newName = $('#new-name').val();
				var newDescription = $('#new-description').val();
				actionController.create(newName, newDescription);

				// reset the form
				$(this)[0].reset();
				$('#new-name').focus();
			});
		}

	};

	actionController.setupView();
});