

const form = document.querySelector('form');
const app = document.querySelector('.app');
const elAlert = document.querySelector('.alert');
const grocery = document.querySelector('.grocery');
const btnSubmit = document.querySelector('button');
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
let editElement;
let editFlag = false;
let editID = "";
const items = [
    {
        id: 1,
        content: "a",
    }
]
console.log(app)

form.addEventListener('submit', addItem);
clearBtn.addEventListener("click", clearItems);

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value != '' && !editFlag) {
        const element = document.createElement("div");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("item");
        element.innerHTML = `
    
        <span class="value">${value}</span>
        <div class="handle">
            <span id="edit">edit</span>
            <span id="delete">delete</span>
        </div>
          `;
        const deleteBtn = element.querySelector("#delete");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector("#edit");
        editBtn.addEventListener("click", editItem);

        list.appendChild(element);
        showAlert("item added to the list", "success");
        app.classList.add("show-clearBtn");
    }
    else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        showAlert("value changed", "success");

        // // edit  local storage
        // editLocalStorage(editID, value);
        // setBackToDefault();
        setBackToDefault() 
    } else {
        showAlert("please enter value", "danger");
    }

}
function showAlert(text, action) {
    elAlert.textContent = text;
    elAlert.classList.add(`alert-${action}`);

    setTimeout(() => {
        elAlert.textContent = '';
        elAlert.classList.remove(`alert-${action}`);
    }, 1000)
}
function clearItems() {
    const items = document.querySelectorAll(".item");
    console.log(items)

    if (items.length > 0) {
      items.forEach(function (item) {
          console.log(item)
        list.removeChild(item);
      });
    }
    app.classList.remove("show-clearBtn");
    showAlert("empty list", "danger");
    
    setBackToDefault();
  }
  
  // delete item
  
  function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
  
    list.removeChild(element);
  
    if (list.children.length === 0) {
      app.classList.remove("show-clearBtn");
    }
    showAlert("item removed", "danger");
    setBackToDefault() 
  
    // setBackToDefault();
    // // remove from local storage
    // removeFromLocalStorage(id);
  }
  // edit item
  function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    console.log(element);
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement);
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    //
    btnSubmit.textContent = "Edit";
  }
  function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    btnSubmit.textContent = "Submit";
  }