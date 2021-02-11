let url_string = window.location.href;
let url = new URL(url_string);
let orderId = url.searchParams.get("orderId");
let total = url.searchParams.get("total");


let orderIdSpan = document.getElementById("orderId");
orderIdSpan.innerHTML = orderId;

let totalDiv = document.getElementById("total");
totalDiv.innerHTML = total;

localStorage.clear();


