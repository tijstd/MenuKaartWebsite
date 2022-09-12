const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
var Totalbedrag = parseFloat(0)

function addElementWithValueToParent(element, value, parent){
  var element = document.createElement(element);
  var text = document.createTextNode(value);
  element.appendChild(text)
  var parentElement = document.getElementById(parent)
  element.appendChild(parentElement)
}



let menu = [
  {"id":0,"Dish":"Smoked Salmon","Price":6.25},
  {"id":1,"Dish":"Carrot Soup","Price":7.55},
  {"id":2,"Dish":"Chicken Balerno","Price":19.35},
  {"id":3,"Dish":"Roast Beef","Price":10.00},
  {"id":4,"Dish":"Pizza Americana","Price":10.20},
  {"id":5,"Dish":"Chocolate gateau","Price":4.00},
  {"id":6,"Dish":"Chocolate Cake","Price":4.50},
  {"id":7,"Dish":"Coffee and Mints","Price":2.50},
  {"id":8,"Dish":"Margarita lemon","Price":7.00},
  {"id":9,"Dish":"Cosmopolitan","Price":7.99},
  {"id":10,"Dish":"Moscow Mule","Price":30.99},
  {"id":11,"Dish":"Pannenkoeken","Price":2.69},
  {"id": 11,"Dish": "RabarberTaart","Price": 3.99},
{"id": 11,"Dish": "Appelkruimel","Price": 3.99}

]  


var menuTable = document.getElementById("menuTable")

menu.forEach(menuItem => {

  var tableRow = document.createElement("tr");
  
  var idTableData = document.createElement("td");
  var idText = document.createTextNode(menuItem.id);
  idTableData.appendChild(idText)

  var nameTableData = document.createElement("td");
  var nameText = document.createTextNode(menuItem.Dish);
  nameTableData.appendChild(nameText)

  var priceTableData = document.createElement("td");
  var priceText = document.createTextNode(menuItem.Price);
  priceTableData.appendChild(priceText)

  var inputTableData = document.createElement("td");
  var inputElement = document.createElement("input")
  inputElement.type="radio"
  inputElement.id= menuItem.id
  inputElement.name= "Ordered"
  inputElement.value= menuItem.Dish

  inputTableData.appendChild(inputElement)
 

  tableRow.appendChild(idTableData)
  tableRow.appendChild(nameTableData)
  tableRow.appendChild(priceTableData)
  tableRow.appendChild(inputTableData)
  menuTable.appendChild(tableRow);

});






  function doEenDing() {

    var paragraph = document.createElement("p");
    var ChosenDish = document.querySelector('input[name="Ordered"]:checked').value
   
    var IdOfDish = document.querySelector('input[name="Ordered"]:checked').id
    var PriceDish = menu[IdOfDish].Price

    Totalbedrag = Totalbedrag + parseFloat(PriceDish)


    var text = document.createTextNode(ChosenDish);
    paragraph.appendChild(text); // Zet de text in de paragraph
    var element = document.getElementById("bestelling")//Pak de target div
    element.appendChild(paragraph); // Voeg nieuwe paragraaf aan target div
  
  }
function Betaling(x) {

    var paragraph = document.createElement("p");
    var TotalEuro = String((Math.round(Totalbedrag * 100)/ 100))
    

    var text = document.createTextNode(TotalEuro)
    paragraph.appendChild(text)
    var element = document.getElementById("Betalen")//Pak de target div
    element.appendChild(paragraph); // Voeg nieuwe paragraaf aan target div
    x.Betaling = true
    btn1.style.display = 'none'
    btn2.style.display = 'none'

}

fetch("http://worldtimeapi.org/api/timezone/Europe/Amsterdam", {
      
})
.then(res => res.json())
.then(resp => console.log(resp));