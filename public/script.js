$(function() {
	function Action(name, desc){
		this.name = name;
		this.desc = desc;
	}
	Action.all = [
		new Action("Race", "We must tackle the issues of racism"),
		new Action("Employment and diversity", "Let's increase jobs and diversity in the tech industry"),
		new Action("Empower", "We must start empowering our youth with positivity")

	];


	Action.prototype.render = function(){
		$actionList.append('<li class="action">' + this.name + ' - ' + this.desc + '</li>');
		console.log('render')
	}

	Action.prototype.save = function(){
		Action.all.push(this);
	}

	var $actionList = $("#action-list");

	var $actionList = $('#action-list');

	_.each(Action.all, function (action, index){
		action.render()
	});

	$actionList.on('submit', function(event){
		event.preventDefault();

		var actionName = $('#action-name').val();
		var actionDesc = $('#action-desc').val();
		var actionData = {name: actionName, desc: actionDesc};


		$actionList.append('<li class="action">' + actionData.name + ' - ' + actionData.desc + '</li>');


		$actionList[0].reset();
		$('#action-name').focus();
	});

	$actionList.on('click', 'action', function() {
		$(this).addClass('done');
	});

});

