/* ========== Global variables ========== */
const userSource = `https://cors-anywhere.herokuapp.com/https://randomuser.me/api/?results=`; /*Cors anywhere Credited to: https://github.com/Rob--W/cors-anywhere*/
const employeeGrid = document.querySelector('.employee-grid');
const heading = document.querySelector('h1');
const employeeSearch = document.querySelector('.employee-search').children[0];
const resSelect = document.querySelector('#results-num');

let results = 12;
let employeeDirectory = [];

/**
* Async fetch wrapper. Purpose to retreive promise from given URL and return as JSON
* @PARAM {String} the URL to be fetched (include all required query strings)
* @RETURN {JSON object}
* @THROW {ERROR} 
*/
async function getEmployees(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch(error) {
      throw error; 
  }
}


/**
* Use the JSON object to generate employee objects. Then append them to the directory, 
* populate the search and for each employee call the employeeCard() function
* @PARAM {JSON} the data received from the server
*/
function createEmployees(employees) {
	employees.results.map(emp => {
		let dob = new Date(emp.dob.date);
		employeeDirectory.push({
			name:`${emp.name.first} ${emp.name.last}`,
			email: `${emp.email}`,
			city: `${emp.location.city}`,
			address: {
				street: `${emp.location.street.number} ${emp.location.street.name}`, 
				city: `${emp.location.city}`,
				postcode: `${emp.location.postcode}`
				},
			phone: `${emp.phone}`,
			pics: [`${emp.picture.large}`, `${emp.picture.medium}`,`${emp.picture.thumbnail}`],
			dob: `${dob.getDate()}/${dob.getMonth()}/${dob.getYear()}`
		});
	});

	employeeDirectory.forEach(employeeCard);
	populateSearch();
};

/**
* Generate the HTML per employee that is used for their card, then append to the employee Grid
* @PARAM {OBJECT} the employee object to be added to the card
* @PARAM {INTEGER} the employee's index (position in the directory) This is used to give a 
* unique ID that then allows the modal to identify the employee object to pull
*/
function employeeCard(employee, index) {
	employeeGrid.innerHTML += `
		<div class="emp-card" id="${index}-emp">
			<img src="${employee.pics[1]}" class="emp-profile" alt="${employee.name} profile picture">
			<h2 class="emp-name">${employee.name}</h2>
			<a href="mailto:${employee.email}">${employee.email}</a>
			<p class="emp-city">${employee.address.city}</p>
		</div>
	`;
}

/**
* Async function. Reset the Document, and show messages indicating the fetch status to the user,
* including whether they need to refresh. 
* Once data has been retrieved pass it to the createEmployees() function, and provide appropriate
* feedback regarding errors.  
* @PARAM {STRING} the url
* @PARAM {INTEGER} the number of results to retrieve
*/
async function loadData(source, results) {
	const url = source + results;
	employeeGrid.innerHTML = '';
	employeeDirectory = [];
	heading.textContent = 'Fetching data, please wait...'
	getEmployees(url)
		.then(createEmployees)
		.catch(e => {
			console.log(e, url);
			heading.textContent = 'Something went wrong, please refresh.';
		})
		.finally(() =>{
			heading.textContent = 'Awesome Startup Employee Grid';
			employeeSearch.parentElement.style.visibility = 'visible';
		});
}


/**
* Event Handler. Detect clicks on the Modal buttons, and call the openModal function
* passing in the id of the employee card clicked, pull it from the parent Element if a child 
* is  clicked
* This is placed here due to the call order of the source files
*/
employeeGrid.addEventListener('click', (e) =>{
	let targetID = e.target.id.slice(0, -4);
	if (e.target !== employeeGrid) {		
		if (!e.target.id) {			
			targetID = e.target.parentElement.id.slice(0, -4);	
		}
		openModal(targetID);
	};
});

/* Detects changes to the number of results, and calls the loadData function with the new number*/
resSelect.selectedIndex = results/4;
resSelect.addEventListener('change', () => {
	loadData(userSource, resSelect.value);
});

loadData(userSource, results);



