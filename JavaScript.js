/* add your JavaScript Here */ /* add your JavaScript Here */
"use strict";
function toX(x) {
	x.classList.toggle("toX");
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropDown() {
	document.getElementById("myDropdown").classList.toggle("show");
	let myDiv = document.getElementById("menu-indicator");
	if (myDiv.style.opacity === 1) {
		myDiv.style.opacity = 0;
	} else {
		myDiv.style.opacity = 1;
	}
	document.getElementById("menu-indicator").style.opacity
}

function showNavBar() {
	document.getElementById("navbar").classList.toggle("showNavBar");
}

function navVisibility(myDiv) {
	myDiv = document.getElementById("navbar");
	if (myDiv.style.opacity === 0) {
		myDiv.style.opacity = 1;
	} else {
		myDiv.style.opacity = 0;
	}
}
