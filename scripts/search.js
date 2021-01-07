const clearSearch = document.querySelector('.employee-search > .close'); 
let employeeCardList; //Used later for search
/**
* The search function has to be populated with the names of all employees from the employeeCardList object .name property
* no params are required as long as this script is loaded after the allUser object is employeeCardList
*/
function populateSearch() {
	employeeCardList = document.querySelectorAll('.emp-card');

	employeeSearch.addEventListener('keyup', function(e) {
		searchEmployees()
	});
}

/**
* Identify text entered by the user in the employeeSearch, seach for matching employee names and 
* set cards not matching display value to none. Matching cards to be ''. 
* The search results need to be cleared every time the function is called to prevent duplication.
*/
function searchEmployees() {
	let userInput = employeeSearch.value.toLowerCase();
	employeeCardList.forEach(card => {
		if (card.children[1].textContent.toLowerCase().includes(userInput)) {
			card.style.display = '';
		} else {
			card.style.display = 'none';
		}
	});
}

/**
* Reset the serach box and make all cards visible once the search is cleared
*/
function closeSearch() {	
	employeeSearch.value = '';
	employeeCardList.forEach(card => {
			card.style.display = '';
	});
}

clearSearch.addEventListener('click', () => {
	closeSearch();	
}); 