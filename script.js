const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
var Totalbedrag = parseFloat(0)
var GlobalVariable; 


function addElementWithValueToParent(element, value, parent){
  var element = document.createElement(element);
  var text = document.createTextNode(value);
  element.appendChild(text)
  var parentElement = document.getElementById(parent)
  element.appendChild(parentElement)
}


async function getRequest(url) {
  const res = await fetch(url);
  if (res.ok) { 
      return res.json();
  } else {
      throw new Error("Bad response");
  }
}

async function getData(url) {
  try {
    GlobalVariable= await getRequest(url);
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

var UrlVanDeSite= getData('https://b10bc-weu-httptriggertijsfunction-fa.azurewebsites.net/api/HelloWorld');

function doEenDing() {

  var paragraph = document.createElement("p");
  var ChosenDish = document.querySelector('input[name="Ordered"]:checked').value
 
  var IdOfDish = document.querySelector('input[name="Ordered"]:checked').id
  var PriceDish = GlobalVariable[IdOfDish].Price

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