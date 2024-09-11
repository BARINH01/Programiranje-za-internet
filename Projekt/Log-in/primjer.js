function postavi_stil()
{
var p_elementi =
document.getElementsByTagName("p");
p_elementi[0].style.color = 'yellow';
p_elementi[0].style.fontSize = '20pt';
p_elementi[1].className = 'zelenaklasa';
}

// Kreiranje objekta
const osoba = {
    ime: "Ivan",
    prezime: "Ivić",
    godine: 30,
    pozdrav: function() {
      console.log("Pozdrav, ja sam " + this.ime);
    }
  };
  
  // Pristup svojstvu
  console.log(osoba.ime);
  
  // Pozivanje metode
  osoba.pozdrav();

  // Deklaracija funkcije
function pozdrav(ime) {
    console.log("Pozdrav, " + ime + "!");
  }
  
  // Pozivanje funkcije
  pozdrav("Ana");

  const umnožak = function (a, b) { return a * b; };