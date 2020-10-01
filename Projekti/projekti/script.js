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
const VHSLpurpleIcon = L.icon({                    //purplehsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-icon-purple.png',
  shadowUrl: 'iconit/marker-shadow.png',

  iconSize: [25,41],  //iconin koko
  shadowSize: [50,64], //varjon koko
  shadowAnchor: [13, 64],  // point of the shadow which will correspond to marker's location
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -41] // point from which the popup should open relative to the iconAnchor
});
const VHSLpinkIcon = L.icon({                    //pinkkihsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-icon-pink.png',
  shadowUrl: 'iconit/marker-shadow.png',

  iconSize: [25,41],  //iconin koko
  shadowSize: [50,64], //varjon koko
  shadowAnchor: [13, 64],  // point of the shadow which will correspond to marker's location
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -41] // point from which the popup should open relative to the iconAnchor
});
const VHSLblueIcon = L.icon({                    //sininenhsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-icon-blue.png',
  shadowUrl: 'iconit/marker-shadow.png',

  iconSize: [25,41],  //iconin koko
  shadowSize: [50,64], //varjon koko
  shadowAnchor: [13, 64],  // point of the shadow which will correspond to marker's location
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -41] // point from which the popup should open relative to the iconAnchor
});
const VHSLlightblueIcon = L.icon({                    //vaaleansininenhsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-icon-lightblue.png',
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
  let checklonlatT = [];
  console.log(myHelsinkiTapahtumat);
    for (let i = 0; i < myHelsinkiTapahtumat.data.length; i++){ //Poimii listasta koordinantit jokaiseen tapahtumaan ja tekee siitä markerin
      if(myHelsinkiTapahtumat.data[i].event_dates.starting_day !== null) {
        myHelsinkiTapahtumat.data[i].event_dates.starting_day = myHelsinkiTapahtumat.data[i].event_dates.starting_day.replace(/[A-Z]/g, ' ');   //Poistaa päivämäärästä kirjaimet
        myHelsinkiTapahtumat.data[i].event_dates.starting_day = myHelsinkiTapahtumat.data[i].event_dates.starting_day.slice(0 ,-5);             //Poistaa päivämäärän ajasta millisekunnit
        myHelsinkiTapahtumat.data.sort(function(a, b) {   //sortaa tapahtumat aika järjestykseen
          return b.date > a.date;
        })
      }
      let longT = myHelsinkiTapahtumat.data[i].location.lon;    //longitude
      let latT = myHelsinkiTapahtumat.data[i].location.lat;     //latitude
      let includecheckT = checklonlatT.includes(latT + '-' + longT);              //katsoo onko checkonlatT arrayssa samoja koordinantteja
      if (includecheckT === false) {                                                 //Poistaa duplicatet
        let popupInfoT = myHelsinkiTapahtumat.data[i].name.fi;                       // tapahtuman nimi suomeksi
        checklonlatT.push(latT + '-' + longT);                                     //lisää lon + lat listaan, jotta ei tule duplicateja
        L.marker([latT, longT], {icon: redIcon}).addTo(kartta).
            bindPopup(popupInfoT).          //tapahtuman nimi popupissa
        on('click', function(){
          document.getElementById('tapahtumanNimiT').innerHTML = myHelsinkiTapahtumat.data[i].name.fi;  //tapahtuman nimi
          document.getElementById('tapahtumanAjankohta').innerHTML = myHelsinkiTapahtumat.data[i].event_dates.starting_day;
          document.getElementById('tapahtumanOsoite').innerHTML = myHelsinkiTapahtumat.data[i].location.address.street_address;  //tapahtuman osoite
          document.getElementById('tapahtumanKaupunkiT').innerHTML = myHelsinkiTapahtumat.data[i].location.address.locality;  //tapahtuman Kaupunki
          document.getElementById('tapahtumanSummary').innerHTML = myHelsinkiTapahtumat.data[i].description.body; //tapahtuman kuvaus
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
    let VHSLPKspots = VHSLlipunmyyntispot;
    let VHSLPKpisteet = [];


   for (let Vj = 0; Vj < VHSLPKspots.features.length; Vj++) {
     if (VHSLPKspots.features[Vj].properties.Zone === 'A' || VHSLPKspots.features[Vj].properties.Zone === 'B' || VHSLPKspots.features[Vj].properties.Zone === 'C') {
       VHSLPKpisteet.push(VHSLPKspots.features[Vj]);
     }
   }
   console.log(VHSLPKpisteet);
    for (let Vi = 0; Vi < VHSLPKpisteet.length; Vi++) {
      let Vlong = VHSLPKpisteet[Vi].geometry.coordinates[1];
      let Vlat = VHSLPKpisteet[Vi].geometry.coordinates[0];
      //console.log(Vlat + ' Lat - ' + Vlong + ' Lon');
      //Lisää avustavan tekstin popupiin, jos se ei ole null
      let Vaddhelp = '';
      if (VHSLPKpisteet[Vi].properties.Address_help_fi !== null){(Vaddhelp = VHSLPKpisteet[Vi].properties.Address_help_fi)} else {Vaddhelp = ''}

        //lisää markerin kartalle ja antaa sille popupiin tietoja
        //samalla antaa markerille värin
        if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Palvelupiste') {
            L.marker([Vlong, Vlat],{icon: VHSLpurpleIcon}).addTo(kartta).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Myyntipiste') {
            L.marker([Vlong, Vlat],{icon: VHSLpinkIcon}).addTo(kartta).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Monilippuautomaatti') {
            L.marker([Vlong, Vlat],{icon: VHSLblueIcon}).addTo(kartta).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Kertalippuautomaatti') {
            L.marker([Vlong, Vlat],{icon: VHSLlightblueIcon}).addTo(kartta).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Pysäköintiautomaatti') {
            L.marker([Vlong, Vlat],{icon: VHSLlightblueIcon}).addTo(kartta).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        }

    }

 }).catch(function(error){console.log(error);
})}
VHSLlipunmyynti();
*/
//VILI
