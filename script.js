const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
var Totalbedrag = parseFloat(0)

  function doEenDing() {

    var paragraph = document.createElement("p");
    var ChosenDish = document.querySelector('input[name="Ordered"]:checked').value
    var PriceDish = parseFloat(document.querySelector('input[name="Ordered"]:checked').id)
    Totalbedrag = Totalbedrag + PriceDish


    var text = document.createTextNode(ChosenDish);
    paragraph.appendChild(text); // Zet de text in de paragraph
    var element = document.getElementById("bestelling")//Pak de target div
    element.appendChild(paragraph); // Voeg nieuwe paragraaf aan target div
  
  }
function Betaling(x) {

    var paragraph = document.createElement("p");
    var TotalCentString = String(Totalbedrag)
    var CentString = TotalCentString.substring(TotalCentString.length-2, TotalCentString.length)
    var EuroString = TotalCentString.substring(0, TotalCentString.length-2)
    var TotalEuro = EuroString + "," + CentString

    var text = document.createTextNode(TotalEuro)
    paragraph.appendChild(text)
    var element = document.getElementById("Betalen")//Pak de target div
    element.appendChild(paragraph); // Voeg nieuwe paragraaf aan target div
    x.Betaling = true
    btn1.style.display = 'none'
    btn2.style.display = 'none'

}