let paikka = null;

// liitetään kartta #kartta id:seen
const kartta = L.map('kartta');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(kartta);
paivitaKartta({latitude: 64, longitude: 24}, 5);

//Paikkatiedon haku asetukset
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
  const crd = pos.coords;
  paikka = crd;
  // päivitä kartta
  paivitaKartta(crd, 13);
}

// funktio, joka keskittää kartan
function paivitaKartta(crd, zoom) {
  kartta.setView([crd.latitude, crd.longitude], zoom);
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Käynnistetään paikkatietojen haku
navigator.geolocation.getCurrentPosition(success, error, options);




//haetaan tapahtumien tiedot myHelsinki API:sta
function myHelsinki(){
const proxyOsoite = 'https://cors-anywhere.herokuapp.com/' //proxy osoite-API joka enabloi cross-origin requestit
const myHelsinkiOsoite = 'http://open-api.myhelsinki.fi/v1/events/?limit=100';
fetch(proxyOsoite + myHelsinkiOsoite).then((vastaus) => {
  return vastaus.json();
}).then(function(myHelsinkiTapahtumat){
    console.log(myHelsinkiTapahtumat);

    for (let i = 0; i < myHelsinkiTapahtumat.data.length; i++){ //Poimii listasta koordinantit jokaiseen tapahtumaan ja tekee siitä markerin
      let longT = myHelsinkiTapahtumat.data[i].location.lon;
      let latT = myHelsinkiTapahtumat.data[i].location.lat;
      console.log(latT + ' Lat - ' + longT + ' Lon');
      L.marker([latT, longT]).addTo(kartta)
    }

}).catch(function(error){console.log(error);
})}
myHelsinki();
/*
//VILI
//tämä on siirretty kommenttiin, jotta se ei tuo liikaa dataa muun koodin testailuun
//haetaan HSL myyntipisteet
function VHSLlipunmyynti() {
 const VHSLlipunmyyntiADD = 'https://opendata.arcgis.com/datasets/727c6618a0814f8ba21bb00c9cb34019_0.geojson';
 fetch(VHSLlipunmyyntiADD)
     .then(function (Vvastaus) {
       return Vvastaus.json();
  }).then(function (VHSLlipunmyyntispot){
    console.log(VHSLlipunmyyntispot);

//markerien teko HSL myyntipisteille alkaa tästä
    for (let Vi = 0; Vi < VHSLlipunmyyntispot.features.length; Vi++) {
      let Vlong = VHSLlipunmyyntispot.features[Vi].geometry.coordinates[1];
      let Vlat = VHSLlipunmyyntispot.features[Vi].geometry.coordinates[0];
      console.log(Vlat + ' Lat - ' + Vlong + ' Lon');
      //Lisää avustavan tekstin popupiin, jos se ei ole null
      let Vaddhelp = '';
      if (VHSLlipunmyyntispot.features[Vi].properties.Address_help_fi !== null){(Vaddhelp = VHSLlipunmyyntispot.features[Vi].properties.Address_help_fi)} else {Vaddhelp = ''}
      //Lisää vyöhykkeen A-D popupiin, jos se ei ole null
      let Vzone = '';
      if (VHSLlipunmyyntispot.features[Vi].properties.Address_help_fi !== null){(Vzone = VHSLlipunmyyntispot.features[Vi].properties.Zone)} else {Vzone = ''}
      //lisää markerin kartalle ja antaa sille popupiin tietoja
      L.marker([Vlong, Vlat]).addTo(kartta).bindPopup(VHSLlipunmyyntispot.features[Vi].properties.Tyyppi + '</br>' + VHSLlipunmyyntispot.features[Vi].properties.Address_fi + '</br>' + VHSLlipunmyyntispot.features[Vi].properties.City_fi + ' Vyöhyke: ' + Vzone + '</br>' + Vaddhelp)
    }
//tarvitaan lisää värivaihtoehtoja markereille tunnistusta varten
 }).catch(function(error){console.log(error);
})}
VHSLlipunmyynti();

//VILI
*/