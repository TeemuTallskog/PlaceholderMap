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


//---------------------------------Iconit-------------------------------------------------------------------------


/* const greenIcon = L.icon({                   // vihreä ikoni
  iconUrl: 'iconit/marker-icon-green.png',
  shadowUrl: 'iconit/marker-shadow.png',

  iconSize: [25,41],  //iconin koko
  shadowSize: [50,64], //varjon koko
  shadowAnchor: [13, 64],  // point of the shadow which will correspond to marker's location
  iconAnchor: [14, 41],     // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -41] // point from which the popup should open relative to the iconAnchor
}); */
const redIcon = L.icon({                    //punainen iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/marker-icon-red.png',
  shadowUrl: 'iconit/marker-shadow.png',

  iconSize: [25,41],  //iconin koko
  shadowSize: [50,64], //varjon koko
  shadowAnchor: [13, 64],  // point of the shadow which will correspond to marker's location
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -41] // point from which the popup should open relative to the iconAnchor
});


//------------------------------------------------------------------------------------------------------------------


//haetaan tapahtumien tiedot myHelsinki API:sta
function myHelsinki(){
const proxyOsoite = 'https://cors-anywhere.herokuapp.com/' //proxy osoite-API joka enabloi cross-origin requestit
const myHelsinkiOsoite = 'http://open-api.myhelsinki.fi/v1/events/?limit=1000';
fetch(proxyOsoite + myHelsinkiOsoite).then((vastaus) => {
  return vastaus.json();
}).then(function(myHelsinkiTapahtumat){
    console.log(myHelsinkiTapahtumat);
  let checklonlatT = [];
    for (let i = 0; i < myHelsinkiTapahtumat.data.length; i++){ //Poimii listasta koordinantit jokaiseen tapahtumaan ja tekee siitä markerin
      let longT = myHelsinkiTapahtumat.data[i].location.lon;    //longitude
      let latT = myHelsinkiTapahtumat.data[i].location.lat;     //latitude
      console.log(latT + ' Lat - ' + longT + ' Lon');
      let includecheckT = checklonlatT.includes(latT + '-' + longT);              //katsoo onko checkonlatT arrayssa samoja koordinantteja
      if (includecheckT === false) {                                                 //Poistaa duplicatet
        let popupInfoT = myHelsinkiTapahtumat.data[i].name.fi;                       // tapahtuman nimi suomeksi
        checklonlatT.push(latT + '-' + longT);                                     //lisää lon + lat listaan, jotta ei tule duplicateja
        L.marker([latT, longT], {icon: redIcon}).addTo(kartta).
            bindPopup(popupInfoT).          //tapahtuman nimi popupissa
        on('click', function(){
          document.getElementById('tapahtumanNimiT').innerHTML = myHelsinkiTapahtumat.data[i].name.fi;  //tapahtuman nimi
          document.getElementById('tapahtumanOsoite').innerHTML = myHelsinkiTapahtumat.data[i].location.address.street_address;  //tapahtuman osoite
          document.getElementById('tapahtumanKaupunkiT').innerHTML = myHelsinkiTapahtumat.data[i].location.address.locality;  //tapahtuman Kaupunki
          document.getElementById('tapahtumanSummary').innerHTML = myHelsinkiTapahtumat.data[i].description.intro; //tapahtuman kuvaus
          document.getElementById('tapahtumaLinkki').href = innerHTML = myHelsinkiTapahtumat.data[i].info_url;  //lisää tapahtuman linkin, tapahtuman nimeen
        })
      }
      else{}
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