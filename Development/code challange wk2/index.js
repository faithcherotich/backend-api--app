document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("shoppingList")
    let input = document.getElementById("itemInput");
    let addButton = document.getElementById("addButton");
    let clearButton = document.getElementById("clearButton");

    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function showList() {
        list.innerHTML = '';
        shoppingList.forEach((item, index) => {
            let itemList = document.createElement("li");
            let itemText = document.createElement("span");
            let itemBtn = document.createElement("button");
            let editBtn = document.createElement("button");

            itemText.textContent = item.name;
            if (item.purchased) {
                itemText.classList.add('purchased');
            }

            itemBtn.textContent = 'Remove';
            editBtn.textContent = 'Edit';

            itemList.appendChild(itemText);
            itemList.appendChild(editBtn);
            itemList.appendChild(itemBtn);
            list.append(itemList);

            itemText.addEventListener('click', () => {
                item.purchased = !item.purchased;
                saveAndShow();
            });

            itemBtn.addEventListener('click', () => {
                shoppingList.splice(index, 1);
                saveAndShow();
            });

            editBtn.addEventListener('click', () => {
                let newValue = prompt('Edit item:', item.name);
                if (newValue) {
                    item.name = newValue.trim();
                    saveAndShow();
                }
            });
        });
    }

    function saveAndShow() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        showList();
    }

    addButton.addEventListener('click', () => {
        let newItem = input.value.trim();
        if (newItem) {
            shoppingList.push({ name: newItem, purchased: false });
            input.value = '';
            saveAndShow();
        }
    });

    clearButton.addEventListener('click', () => {
        shoppingList = [];
        saveAndShow();
    });

    showList();
});