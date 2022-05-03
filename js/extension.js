const inputEl = document.getElementById("input-el");
let inputButton = document.getElementById("input-btn");
let ulEL = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn");
const tabButton = document.getElementById("tab-btn");
let myLeads = [];

//get item from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
//checking for truthy or falsy
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}
//double click to delete
deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputButton.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  //save array to local storage
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

//save tabs to local storage
const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];
tabButton.addEventListener("click", () => {
  //grab url of the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //push tabs in myLead array
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItem = "";

  for (let i = 0; i < leads.length; i++) {
    listItem += `<li><a target='_blank' href='#'>${leads[i]}</a></li>`;
  }
  ulEL.innerHTML = listItem;
}
