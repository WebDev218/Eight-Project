const employeeModal = document.querySelector('.employee-modal');
const modalContent = document.querySelector('.modal-content');
const buttonText = ['<< Previous','Next >>']

/**
* Generate modal content using the id of the employee card clicked. Also to generate buttons
* to the modal allowing navigation between employee objects following the order of the directory
* @PARAM {INTEGER} employee ID
*/
function openModal(employeeId) {
	function activateButtons() {
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
	}

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
		<button>${buttonText[0]}</button><button>${buttonText[1]}</button>
	`;

	activateButtons()
	employeeModal.style.display = 'block';
}

/**
* Called upon request changing the modal to a new employee. Validate whether the request
* is valid, and if so call the openModal() function with an incremented employee Id
* @PARAM {INTEGER} employee Id of the current modal
* @PARAM {STRING} the text of the button clicked, used for validation
*/
function changeModal(employeeId, button) {
	if (button == buttonText[0] && employeeId > 0) {
		openModal(employeeId - 1);
	} else if(employeeId < employeeDirectory.length-1) {
		openModal(employeeId + 1);
	}
}


/**
* detect clicks on the modal background and close button, and close it, clearing content at the same time
*/
employeeModal.addEventListener('click', (e) => {
	if (event.target == employeeModal || event.target.classList == 'close') {
		employeeModal.style.display = 'none';
		modalContent.innerHTML = '';
	}
});