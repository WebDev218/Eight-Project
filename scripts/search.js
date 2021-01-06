const employeeSearch = document.querySelector('.employee-search').children[0];
let employeeCardList; //Users later for search
const clearSearch = document.querySelector('.employee-search > .close'); 

/**
* The search function has to be populated with the names of all active users fro the allUsers object .name property
* no params are required as long as this script is loaded after the allUser object is declared
*/
function populateSearch() {
	employeeCardList = document.querySelectorAll('.emp-card');
}

/**
* Identify text entered by the user in the Message User section, seach for matching user names and generate an 
* HTML drop down list to be appended to the search box. Styling to be kept consistent with the page.
* The search results need to be cleared every time the function is called to prevent duplication.
* The element appended to the seach results should be a P tag with teh class .result
*/
function searchUsers() {
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
* Make closing the seach pop up accessible anywhere. Currently this only has one line of code, but had more
* during development, and I kept it in as it may require more code later
*/
function closeSearch() {	
	employeeSearch.value = '';
	employeeCardList.forEach(card => {
			card.style.display = '';
	});
}

employeeSearch.addEventListener('keyup', function(e) {
	searchUsers()
});

clearSearch.addEventListener('click', () => {
	closeSearch();	
}); 