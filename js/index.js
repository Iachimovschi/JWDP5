

//definition or declaration of a function
const displayProducts = () => {

    //Ajax
    let xhttp = new XMLHttpRequest();

    //receiving from server
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.responseText);
            let content = ``;

            //loop trough te Array
            results.forEach(record => {
                content += `<div class="row">
        <img height="250" src="${record.imageUrl}" alt="img">
        <div class="wrap">
            <button>
                <h3>
                    <a href="single-product.html?id=${record._id}">${record.name}</a>
                </h3>
            </button>
            <button>
                <a href="cart.html">
                <h3>$15${record.price}</h3>
            </button>
            <button>
            <a href="single-product.html?id=${record._id}"> 
                <i class="fa fa-shopping-cart fa-2x"></i>
            </a>
            </button>
        </div>
    </div>` ;
            });

            //dom
            let htmlProductListDiv = document.getElementById("productLists");
            htmlProductListDiv.innerHTML = content;
        }
    }

    //sending
    let url = "http://localhost:3000/api/teddies";
    xhttp.open("GET", url, true);
    xhttp.send();
}

//Call the function
displayProducts();
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
