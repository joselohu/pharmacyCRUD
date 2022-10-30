//Global Variables
const productIdUI = document.querySelector("#productId");
const nameUI = document.querySelector("#name");
const componentsUI = document.querySelector("#components");
const priceUI = document.querySelector("#price");
const btnUI = document.querySelector("#btn");
const btnUI2 = document.querySelector("#btn2");
const tableBodyUI = document.querySelector("#tableBody");
const formularioUI = document.querySelector("#formulario");
let reference = "";

//Events
btnUI.addEventListener("click", create);
btnUI2.addEventListener("click", update2);
document.addEventListener("DOMContentLoaded", read);

//Function create
function create() {
  let objProduct = {
    productId: productIdUI.value,
    name: nameUI.value,
    components: componentsUI.value,
    price: priceUI.value,
    prioridad: document.querySelector("#prioridad:checked").value,
    id: Date.now(),
  };

  let myArray = JSON.parse(localStorage.getItem("DB"));

  if (myArray === null) {
    myArray = [];
    myArray.push(objProduct);
    localStorage.setItem("DB", JSON.stringify(myArray));
  } else {
    myArray.push(objProduct);
    localStorage.setItem("DB", JSON.stringify(myArray));
  }

  read();

  formularioUI.reset();
}

//Function Read

function read() {
  let myData = JSON.parse(localStorage.getItem("DB"));


  if (myData != null) {
    tableBodyUI.innerHTML = "";

    myData.forEach((element) => {
      tableBodyUI.innerHTML =
        tableBodyUI.innerHTML +
        `
            <tr class='tr' key=${element.id}>
                <td>${element.name}</td>
                <td>${element.price}</td>
                <td>${element.prioridad}</td>
                <td><button id='btnEliminar' onclick='errase(event)'>Delete</button>
                <button id="btnUpdate"onclick='update(event)'>Update</button></td>
                <td style='display:none'>${element.id}</td>
            </tr>
            `;
    });
  }
}

//Function Delete

function errase(e) {
  let findElement = e.path[2].childNodes[9].innerHTML;

  let myData = JSON.parse(localStorage.getItem("DB"));
  let index = myData.findIndex((element) => element.id == findElement);

  myData.splice(index, 1);

  localStorage.setItem("DB", JSON.stringify(myData));

  read();

  formularioUI.reset();
}

//Function update

function update(e) {
  let findElement = e.path[2].childNodes[9].innerHTML;
  let myData = JSON.parse(localStorage.getItem("DB"));
  let index = myData.findIndex((element) => element.id == findElement);

  productIdUI.value = myData[index].productId;
  nameUI.value = myData[index].name;
  componentsUI.value = myData[index].components;
  priceUI.value = myData[index].price;

  btnUI.style.display = "none";
  btnUI2.style.display = "block";

  reference = myData[index].id;
}

function update2() {
  let objProduct = {
    productId: productIdUI.value,
    name: nameUI.value,
    components: componentsUI.value,
    price: priceUI.value,
    prioridad: document.querySelector("#prioridad:checked").value,
    id: reference,
  };

  let myData = JSON.parse(localStorage.getItem("DB"));
  let index = myData.findIndex((element) => element.id == objProduct.id);

  myData.splice(index, 1, objProduct);

  localStorage.setItem("DB", JSON.stringify(myData));

  read();

  btnUI.style.display = "block";
  btnUI2.style.display = "none";

  formularioUI.reset();
}
