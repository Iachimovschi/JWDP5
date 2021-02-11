
//DISPLAY CART
const displayCart = (_total) => {

  //RETRIEVE ITEM FROM TE LOCALSTORGE INTO AN ARRAY
  let itemsInCart = JSON.parse(localStorage.getItem("listOfProducts"));
  //LOOP TROUGHT  THE ARRAY AND ADD DATA TO THE DOM OBJECT
  let items = "";
  let total = 0;
  if (itemsInCart != null) {

    itemsInCart.forEach((item, index) => {

      items += `<tr>
   <td>${index + 1}</td>
   <td><img height="40" src="${item.imageUrl}"></td>
     <td>${item.name}</td>
     <td>${item.price}</td>
     <td>${item.quantity}</td>
     <td>${(item.price / 100) * item.quantity}</td>
     <td><a href="#" onclick="deleteItem(${index});" id="delete">Delete</a></td>
             </tr>`;

      total += (item.price / 100) * item.quantity;

    });

    //MODIFYING THE DOM  ELEMENT
    let cartTable = document.getElementById("cart-items");
    cartTable.innerHTML = items;
    let totalSpan = document.getElementById("total");
    totalSpan.innerHTML = total;
  }

}

displayCart();

//DELETE ITEM FROM THE CART trought the localStorage
const deleteItem = (index) => {
  let itemsInCart = JSON.parse(localStorage.getItem("listOfProducts"));
  itemsInCart.splice(index, 1);
  localStorage.setItem(`listOfProducts`, JSON.stringify(itemsInCart));
  displayCart();

}

const validate = (fname, lname, city, email, address) => {
  if (fname == "" || lname == "" || city == "" || email == "" || address == "") {
    return false;

  } else {
    return true;
  }
}


const placeOrder = (_total) => {

  //retrieve contact details

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let city = document.getElementById("city").value;
  let address = document.getElementById("address").value;

  if (validate(firstName, lastName, city, email, address)) {

    let contact = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "city": city,
      "address": address
    }


    //retrieve product ids

    let itemsInCart = JSON.parse(localStorage.getItem("listOfProducts"));
    let products = [];

    //loop on the itemsinCart array

    itemsInCart.forEach((item) => {
      products.push(item._id);

    });

    //execute ajax post and redirecy to confirmation 

    let xhttp = new XMLHttpRequest();


    xhttp.onload = function () {
      if (this.status >= 200 && this.status < 300) {

        //document
        let response = JSON.parse(this.responseText)
        alert(response.orderId)

        //redirect
        let totalSpan = document.getElementById("total");
        window.location = `confirmation.html?orderId=${response.orderId}&total=${_total}`;

      } else {
        alert("response unsuccesfull")
      }

    };
    xhttp.open("POST", "http://localhost:3000/api/teddies/order");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ "contact": contact, "products": products }));
  } else {
    alert(`please fill on field`)
  }

}

let submitButton = document.getElementById(`submit-button`);
submitButton.addEventListener(`click`, (e) => {
  e.preventDefault();

  // alert(`submit button`)


  let totalSpan = document.getElementById("total");
  placeOrder(totalSpan.innerText);

});



const displayTotalItemInCart = () => {
  //retrieve the list of item in cart if exist 
  let itemsInCart = JSON.parse(localStorage.getItem("listOfProducts"));
  let totalQuantity = 0;
  //display the total quantity
  if (itemsInCart != null) {
    itemsInCart.forEach((item) => {


      totalQuantity += item.quantity;
    })

    qtyDiv = document.getElementById("qty");
    qtyDiv.innerHTML = totalQuantity;

  }


}

displayTotalItemInCart();