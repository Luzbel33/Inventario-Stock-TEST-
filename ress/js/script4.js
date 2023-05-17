getTotal = () => {
    let stock = document.querySelector('#stock').value;
    let finalStock = document.querySelector('#finalStock').value;
    let sold = document.querySelector('#sold').value;
    if(isNaN(finalStock)){
         alert("finalStock and Stock Must be valid numbers")
    }else{
        let total = parseFloat( stock - sold);
        document.querySelector('#total').value = total.toFixed(2);
    }
}

addInventory = () =>{
    let pageUrl = window.location.href;
    let totalinventory = JSON.parse(localStorage.getItem(pageUrl + "_script4"));
    if(totalinventory == null){
        totalinventory = []
    }
    
    let product = document.querySelector('#product').value;
    let stock = document.querySelector('#stock').value;
    let sold = document.querySelector('#sold').value;
    let finalStock = parseFloat(stock) - parseFloat(sold);

    if (product == "" || product == null) {
        alert("Porfavor ingresar un nombre.")
    } else if (stock == "" || isNaN(stock)) {
        alert("Porfavor ingrese un valor numerico.")
    } else {
        let total = parseFloat(stock - sold);
        let newInventory = {
            product : product,
            stock : stock,
            finalStock : finalStock,
            sold: sold,
            total : total
        }
        totalinventory.push(newInventory)
        localStorage.setItem(pageUrl + "_script4", JSON.stringify(totalinventory))
        window.location.reload() 
    }
}

getGrandTotal = () =>{
    let pageUrl = window.location.href;
    let totalinventory = JSON.parse(localStorage.getItem(pageUrl + "_script4"));
    let grandTotal = totalinventory ? totalinventory.reduce((acc, item) => acc + parseFloat(item.total), 0) : 0;
    document.querySelector('#grandTotal').innerHTML = grandTotal;
}

// OLDER VERSION OF THE FUNCTION//
// getGrandTotal = () =>{
//  let grandTotal = 0;
//  let pageUrl = window.location.href;
//  let totalinventory = JSON.parse(localStorage.getItem(pageUrl + "_script4"));
//  if (totalinventory != null && totalinventory.length > 0) {
//      
//      for (let index = 0; index < totalinventory.length; index++) {

//            grandTotal  += parseFloat(totalinventory[index]["total"]);
//          grandTotal = grandTotal;
//      }
//  }
//  document.querySelector('#grandTotal').innerHTML = grandTotal;
//   }



showInvent = () =>{
    getGrandTotal();
    let pageUrl = window.location.href;
    let totalinventory = JSON.parse(localStorage.getItem(pageUrl + "_script4"));
    if (totalinventory != null && totalinventory.length > 0) {
        let table = document.querySelector('#inventoryTable');
        for (let index = 0; index < totalinventory.length; index++) {
            let row = table.insertRow(1);
            let inventoryProduct = row.insertCell(0);
            let inventoryStock = row.insertCell(1);
            let inventorySold = row.insertCell(2);
            let inventoryfinalStock = row.insertCell(3);
            let inventoryAction = row.insertCell(4);

            inventoryAction.className = "text-center";

            let editBtn = document.createElement('input');
            editBtn.type = "button";
            editBtn.className = "btn";
            editBtn.value = "edit";

            inventoryAction.appendChild(editBtn);

            inventoryProduct.innerHTML = totalinventory[index]["product"];
            inventoryStock.innerHTML = totalinventory[index]["stock"];
            inventorySold.innerHTML = totalinventory[index]["sold"];
            inventoryfinalStock.innerHTML = totalinventory[index]["finalStock"];

            getGrandTotal();

            let deleteBtn = document.createElement('input');
            deleteBtn.type = "button";
            deleteBtn.className = "btn";
            deleteBtn.value = "delete";
            deleteBtn.onclick = (function(index) {
                return function() {
            
                    if (confirm("Do you want to delete this item?")) {
                        totalinventory.splice(index, 1) 
                        alert("item deleted")
                        window.location.reload();
                        localStorage.setItem(pageUrl + "_script4", JSON.stringify(totalinventory)); 
                        getGrandTotal();
                    }
                }
            })(index);
            inventoryAction.appendChild(deleteBtn);

            editBtn.onclick = (function(index) {
                return function() {
                    let inventoryRow = this.parentNode.parentNode;
                    let inventoryProduct = inventoryRow.cells[0];
                    let inventoryStock = inventoryRow.cells[1];
                    let inventorySold = inventoryRow.cells[2];
                    let inventoryfinalStock = inventoryRow.cells[3];
            
                    let newProduct = prompt("Enter the new name of the item:", inventoryProduct.innerText);
                    let newStock = prompt("Enter the new initial stock value:", inventoryStock.innerText);
                    let newSold = prompt("Enter the new sold value:", inventorySold.innerText);
            
                    if (newProduct != null && newStock != null && newSold != null) {
                        inventoryProduct.innerText = newProduct;
                        inventoryStock.innerText = newStock;
                        inventorySold.innerText = newSold;
                        inventoryfinalStock.innerText = parseFloat(newStock - newSold);
            
                        let totalinventory = JSON.parse(localStorage.getItem(pageUrl + "_script4"));
                        totalinventory[index]["product"] = newProduct;
                        totalinventory[index]["stock"] = newStock;
                        totalinventory[index]["sold"] = newSold;
                        totalinventory[index]["finalStock"] = parseFloat(newStock - newSold);
            
                        localStorage.setItem(pageUrl + "_script4", JSON.stringify(totalinventory)); 
                        getGrandTotal();
                    }
                }
            })(index);
        }
    }
}


let editTitleButton = document.querySelector('.invTitle-button');
let invTitle = document.querySelector('#invTitle');

editTitleButton.addEventListener('click', function() {
    let newText = prompt("Ingresar Nombre:");
    if (newText != null) {
        invTitle.textContent = newText;
        let pageUrl = window.location.href;
        let invTitleKey = pageUrl + "_scriptTitle_4" + invTitle; // unique key for each invTitle value
        localStorage.setItem(invTitleKey, newText); // save the invTitle value using the unique key
    }
});

// Set invTitle text from localStorage
let pageUrl = window.location.href;
let invTitleKey = pageUrl + "_scriptTitle_4" + invTitle;
let savedValue = localStorage.getItem(invTitleKey);
if (savedValue) {
    invTitle.textContent = savedValue;
}

clearButton = () => {
    if (confirm("Do you want to clear all your inventory data ? This action cannot be undone")) {
        localStorage.removeItem(window.location.href + "_script4");
        window.location.reload();
    }
}

getDate = () => {
    let today = new Date();
    return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + '  '  + today.getHours() + ":" + today.getMinutes() + "<br>" ;
}

printData = () => { 
    let divContents = document.getElementById("allInventory").cloneNode(true);
    let actions = divContents.querySelectorAll("#actions");
    for (let i = 0; i < actions.length; i++) {
        actions[i].remove();
    }
    let buttons = divContents.querySelectorAll(".btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].remove();
    }
    let a = window.open('', '', 'height=11000, width=1000'); 
    a.document.write('<html>'); 
    a.document.write('<body > <h1>Inventario del Día : ' + getDate() + '<br>'); 
    a.document.write(divContents.innerHTML); 
    a.document.write('</body></html>'); 
    a.document.close(); 
    a.print(); 
}

showInvent();