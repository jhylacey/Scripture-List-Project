const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStore();
    itemsFromStorage.forEach(item => addItemToDom(item));
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;

    // Validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //create item DOM element
    addItemToDom(newItem);

    // add item to local storage 
    addItemToStore(newItem);

    checkUI();

    itemInput.value = '';

}

function addItemToDom(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);

}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStore(item) {
    const itemsFromStorage = getItemsFromStore();

    itemsFromStorage.push(item);

    // convert to JSON string and set to local straoge

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStore() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage

}

function onItemClick(e) {
    if (e.target.parentElement.classList.contains
        ('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }

}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        //remove item from DOM
        item.remove();

        //remove item from storage
        removeItemFromStraoge(item.textContent);

        checkUI();
    }
}

function removeItemFromStraoge(item) {
    let itemsFromStorage = getItemsFromStore();
    //filter item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function clearItems(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear from localStorage

    localStorage.removeItem('items');

    checkUI();

}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

}

//Initialize app

function init() {

    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onItemClick);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();


}

init();

