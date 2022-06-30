let events = [];

const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const buttonAdd = document.querySelector('#bAdd');
const eventsContainer = document.querySelector('#eventsContainer');

//load data from localstorage
// events = load() ?? [];
events = load();
renderEvents();


document.querySelector('form').addEventListener('submit', e => {
	e.preventDefault();
	addEvent();
});

function addEvent () {
	debugger
	//check if selected date is before than current date
	if (!eventName.value || !eventDate.value || dateDiff(eventDate.value) < 0) {
		alert('Faltan datos o la fecha es menor la fecha actual');
		return false;
	}

	//create an object that contains the newevent
	const newEvent = {
		id: (Math.random() * 100).toString(36).slice(3),
		name: eventName.value,
		date: eventDate.value
	};

	events.unshift(newEvent);
	
	//save data in localStorage
	save(events);

	eventName.value = '';

	renderEvents();
}

function dateDiff (date) {
	let selectedDate = new Date(date),
			today = new Date(),
			difference_ms = selectedDate.getTime() - today.getTime(), //return miliseconds
			days = Math.ceil( difference_ms / (1000 * 3600 * 24) );

	return days;
}

function renderEvents () {
	eventsContainer.innerHTML = events.map(event => {
		return `
			<div class="event">
				<div class="days">
					<span class="days-number">${dateDiff(event.date)}</span>
					<span class="days-text">${dateDiff(event.date) == 1 ? 'day' : 'days'}</span>
				</div>

				<div class="event-name">${event.name}</div>
				<div class="event-date">${event.date}</div>
				<div class="actions" data-id="${event.id}">
					<button class="bDelete">Delete</button>
				</div>
			</div>
		`;
	}).join("");

	//get delete buttons  to set an event listener each one
	document.querySelectorAll('.bDelete').forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault();
			let parent = btn.parentElement;
			let id = parent.getAttribute('data-id');
			events = events.filter(event => event.id !== id);
			save(events);
			renderEvents();

		});
	});
}

function save (data) {
	localStorage.setItem('items', JSON.stringify(data));
}

function load () {
	return JSON.parse(localStorage.getItem('items')) ?? [];
}

