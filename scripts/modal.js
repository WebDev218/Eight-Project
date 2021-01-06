const employeeModal = document.querySelector('.employee-modal');
const modalContent = document.querySelector('.modal-content');

function openModal(employeeId) {
	const employee = employeeDirectory[employeeId];
	modalContent.innerHTML = `
		<span class="close">X</span>
		<img src="${employee.pics[0]}" class="emp-profile">
		<h2 class="emp-name">${employee.name}</h2>
		<a href="mailto:${employee.email}">${employee.email}</a>
		<p class="emp-city">${employee.city}</p>
		<p>${employee.phone}</p>
		<p>${employee.address.street} ${employee.address.city} ${employee.address.postcode}</p>
		<p>Birthday: ${employee.dob}</p>
		<button><< Previous</button><button>Next >></button>
	`;

	const modalButtons = document.querySelectorAll('.modal-content button');
	if (employeeId == 0) {
		modalButtons[0].disabled = true;
	} else if (employeeId == employeeDirectory.length-1) {
		modalButtons[1].disabled = true
	}

	modalButtons.forEach(button => {
		button.addEventListener('click', (e)=> {
			changeModal(parseInt(employeeId), event.target.textContent)
		});
	})
	employeeModal.style.display = 'block';
}

function changeModal(employeeId, button) {
	if (button == '<< Previous' && employeeId > 0) {
		openModal(employeeId - 1);
	} else if(employeeId < employeeDirectory.length-1) {
		openModal(employeeId + 1);
	}
}

employeeModal.addEventListener('click', (e) => {
	if (event.target == employeeModal || event.target.classList == 'close') {
		employeeModal.style.display = 'none';
		modalContent.innerHTML = '';
	}
});