let results = 12;
const userSource = `https://randomuser.me/api/?results=${results}`;
const employeeDirectory = [];
const employeeGrid = document.querySelector('.employee-grid');
const employeeModal = document.querySelector('.employee-modal');
const modalContent = document.querySelector('.modal-content');


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
		employeeDirectory.push({
			name:`${emp.name.first} ${emp.name.last}`,
			email: `${emp.email}`,
			city: `${emp.location.city}`,
			address: `${emp.location.street.number} ${emp.location.street.name} ${this.city}, ${emp.location.postcode}`,
			phone: `${emp.phone}`,
			pics: [`${emp.picture.large}`, `${emp.picture.medium}`,`${emp.picture.thumbnail}`],
			dob: `${new Date(emp.dob)}`
		});
	});
	employeeDirectory.forEach(employeeCard);
};

function employeeCard(employee, index) {
	employeeGrid.innerHTML += `
		<div class="emp-card" id="${index}-emp">
			<img src="${employee.pics[1]}" class="emp-profile">
			<h2 class="emp-name">${employee.name}</h2>
			<a href="mailto:${employee.email}">${employee.email}</a>
			<p class="emp-city">${employee.city}</p>
		</div>
	`;
}

function openModal(employeeId) {
	const employee = employeeDirectory[employeeId];
	modalContent.innerHTML = `
		<img src="${employee.pics[0]}" class="emp-profile">
		<h2 class="emp-name">${employee.name}</h2>
		<a href="mailto:${employee.email}">${employee.email}</a>
		<p class="emp-city">${employee.city}</p>
		<p>${employee.phone}</p>
		<p>${employee.address}</p>
		<p>${employee.dob}</p>
	`;
	// employeeModal.style.display = 'block';
}


getEmployees(userSource)
	.then(createEmployees)
	.catch(e => console.log(e));

employeeGrid.addEventListener('click', (e) =>{
	let targetID = e.target.id.slice(0, -4);
	if (e.target !== employeeGrid) {		
		if (!e.target.id) {			
			targetID = e.target.parentElement.id.slice(0, -4);	
		}
		openModal(targetID);
	};
});