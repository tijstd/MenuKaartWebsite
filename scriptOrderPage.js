
var GlobalVariable; 

function addElementWithValueToParent(element, value, parent){
  var element = document.createElement(element);
  var text = document.createTextNode(value);
  element.appendChild(text)
  var parentElement = document.getElementById(parent)
  element.appendChild(parentElement)
}

var UrlVanDeSite= getData('https://b10bc-weu-httptriggertijsfunction-fa.azurewebsites.net/api/RetrieveOrdersFunction');


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

        const counts = {};
        const sampleArray =menuItem.TotalOrder
        sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        console.log(JSON.stringify(counts))
        var RawJSon = JSON.stringify(counts)
        var StringJson = (JSON.stringify(counts)).replaceAll("\"", "\ ").substring(1,(RawJSon.length)-1)
        console.log(StringJson)

        var tableRow = document.createElement("tr");
        
        var idTableData = document.createElement("td");
        var idText = document.createTextNode("\$"+menuItem.TotalPrice);
        idTableData.appendChild(idText)
      
        var nameTableData = document.createElement("td");
        var nameText = document.createTextNode(StringJson);
        nameTableData.appendChild(nameText)

      
        var inputTableData = document.createElement("td");
        var inputElement = document.createElement("input")
        inputElement.type="radio"
        inputElement.id= menuItem.id
        inputElement.name= "Ordered"
        inputElement.value= menuItem.Dish
      
       
       
      
        tableRow.appendChild(idTableData)
        tableRow.appendChild(nameTableData)

        tableRow.appendChild(inputTableData)
        menuTable.appendChild(tableRow);

        
      
    });

  } catch(e) {
      console.log(e);
  }
}







