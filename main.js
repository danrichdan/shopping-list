// Define UI Variables
const form = document.getElementById("add-item-form");
const shoppingList = document.querySelector(".list-group");
const clearBtn = document.querySelector(".clear-list");
const filter = document.getElementById("filter");
const itemInput = document.getElementById("add-item");
const errorMsg = document.getElementById("add-item-help");

// Load Event Listeners
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", displayItemsFromLocalStorage);
  // Add Item Event
  form.addEventListener("submit", addItem);
  // Remove Item Event
  shoppingList.addEventListener("click", removeItem);
  // Clear Button Event
  clearBtn.addEventListener("click", clearItems);
  // Filter Field Event
  filter.addEventListener("keyup", filterItems);
}

// Get and Display Items from LS
function displayItemsFromLocalStorage() {
  let items = getItemsFromLocalStorage();
  items.forEach(function (item) {
    addItemToDom(item);
  });
}

// Get Items From LS
function getItemsFromLocalStorage() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// Add Item
function addItem(e) {
  e.preventDefault();
  if (itemInput.value === "") {
    fieldValidationMsg();
  } else {
    const shoppingItem = itemInput.value;
    addItemToDom(shoppingItem);
    storeItemInLocalStorage(shoppingItem);
  }
  itemInput.value = "";
}

// Create Field Validation Message
function fieldValidationMsg() {
  errorMsg.className = "form-text text-danger";
  setTimeout(function () {
    errorMsg.className = "form-text text-danger invisible";
  }, 3000);
}

// Create DOM Element and Append to List
function addItemToDom(shoppingItem) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = shoppingItem;
  const deleteBtn = createDeleteBtn();
  li.appendChild(deleteBtn);
  shoppingList.appendChild(li);
}

// Create the Delete Button DOM Element
function createDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "close";
  deleteBtn.setAttribute("type", "button");
  deleteBtn.innerHTML = "<span>&times;</span>";
  return deleteBtn;
}

// Store Item in Local Storage
function storeItemInLocalStorage(shoppingItem) {
  let items = getItemsFromLocalStorage();
  items.push(shoppingItem);
  localStorage.setItem("items", JSON.stringify(items));
}

// Remove Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("close")) {
    e.target.parentElement.parentElement.remove();
    removeItemFromLocalStorage(
      e.target.parentElement.parentElement.textContent
    );
  }
}

function removeItemFromLocalStorage(shoppingItem) {
  shoppingItem = shoppingItem.substr(0, shoppingItem.length - 1);
  let items = getItemsFromLocalStorage();
  items.forEach(function (item, index) {
    if (item === shoppingItem) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}
// Clear All Items
function clearItems() {
  while (shoppingList.firstChild) {
    shoppingList.firstChild.remove();
  }
  localStorage.clear();
}

// Filter Items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (listItem) {
    const item = listItem.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  });
}
