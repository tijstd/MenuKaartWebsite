const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
var Totalbedrag = parseFloat(0)
var GlobalVariable; 
var url2 = "https://b10bc-weu-httptriggertijsfunction-fa.azurewebsites.net/api/tablefunction"

var StringOfDishes= new Array();


function addElementWithValueToParent(element, value, parent){
  var element = document.createElement(element);
  var text = document.createTextNode(value);
  element.appendChild(text)
  var parentElement = document.getElementById(parent)
  element.appendChild(parentElement)
}

var UrlVanDeSite= getData('https://b10bc-weu-httptriggertijsfunction-fa.azurewebsites.net/api/HelloWorld');

async function getRequest(UrlVanDeSite) {
  const res = await fetch(UrlVanDeSite);
  if (res.ok) { 
      return res.json();
  } else {
      throw new Error("Bad response");
  }
}

async function getData(UrlVanDeSite) {
  try {
    GlobalVariable= await getRequest(UrlVanDeSite);
      GlobalVariable.forEach(menuItem => {

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


  } catch(e) {
      console.log(e);
  }
}



function doEenDing() {

  var paragraph = document.createElement("p");
  var ChosenDish = document.querySelector('input[name="Ordered"]:checked').value
  var DishString = "\""+ ChosenDish + "\""
  StringOfDishes.push(DishString)
  console.log(StringOfDishes)

  var IdOfDish = document.querySelector('input[name="Ordered"]:checked').id
  var PriceDish = GlobalVariable[IdOfDish].Price

  Totalbedrag = Totalbedrag + parseFloat(PriceDish)

  var text = document.createTextNode(ChosenDish);
  paragraph.appendChild(text); // Zet de text in de paragraph
  var element = document.getElementById("bestelling")//Pak de target div
  element.appendChild(paragraph); // Voeg nieuwe paragraaf aan target div
  console.log(element)
}
function Betaling(x) {
  
  var paragraph = document.createElement("p");
  var TotalEuro = String((Math.round(Totalbedrag * 100)/ 100))
  

  var text = document.createTextNode(TotalEuro)
  paragraph.appendChild(text)
  var element = document.getElementById("Betalen")//Pak de target div
  element.appendChild(paragraph); // Voeg nieuwe paragraaf aan target div
  x.Betaling = true;
  btn1.style.display = 'none';
  btn2.style.display = 'none';

// dit is een test

  var BodyJson =  `{
    "TotalPrice": ${TotalEuro}, "TotalOrder":[${StringOfDishes}]
 }`

  fetch(url2, {
    method: 'POST',   
    headers: {   
      'Accept': 'application/json',   
      'Content-Type': 'application/json'  
    },  
    body:BodyJson, 
    
    })
    .then ((response) => alert("Thank you for the order of "+ TotalEuro + " Euro" ))
    .catch((error)=>  alert("An error has occured"));
    
    }




