let results = 12;
const userSource = `https://randomuser.me/api/?results=${results}`;
const employeeDirectory = [];
const employeeGrid = document.querySelector('.employee-grid');

const heading = document.querySelector('h1');


async function getEmployees(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch(error) {
      throw error; 
  }
}

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

function employeeCard(employee, index) {
	employeeGrid.innerHTML += `
		<div class="emp-card" id="${index}-emp">
			<img src="${employee.pics[1]}" class="emp-profile">
			<h2 class="emp-name">${employee.name}</h2>
			<a href="mailto:${employee.email}">${employee.email}</a>
			<p class="emp-city">${employee.address.city}</p>
		</div>
	`;
}

employeeGrid.addEventListener('click', (e) =>{
	let targetID = e.target.id.slice(0, -4);
	if (e.target !== employeeGrid) {		
		if (!e.target.id) {			
			targetID = e.target.parentElement.id.slice(0, -4);	
		}
		openModal(targetID);
	};
});

async function loadData(url) {
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

loadData(userSource);