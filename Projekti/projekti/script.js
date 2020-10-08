// jshint ignore: start
let paikka = null;
let currentLon = '';
let currentLat = '';
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
  paivitaKartta(crd, 10);
  currentLon = pos.coords.longitude;
  currentLat = pos.coords.latitude
  L.marker([currentLat, currentLon], {icon: imHereMarker}).addTo(kartta).bindPopup('Olet tässä').openPopup();  // tekee markerin ja popupin, joka näyttää nykyisen paikkasi.

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
//---------------------params-------------------------------

/**
 * @param type.L -
 * @param type.tileLayer -
 * @param type.addTo -
 * @param type.bindPopup -
 * @param type.openPopup -
 * @param type.setView -
 * @param type.layerGroup -
 * @param type.event_dates - event dates
 * @param type.date -date
 * @param type.lon - longitude
 * @param type.lat - Latitude
 * @param type.fi - Suomi
 * @param type.address - osoite
 * @param type.street_address - katuosoite
 * @param type.locality -
 * @param type.info_url - info urli
 * @param type.copyright_holder - copyrightholder kuvassa
 * @param type.where_and_when - missa ja milloin
 * @param type.where_when_duration - missa milloin kesto
 * @param type.features -
 * @param type.properties -
 * @param type.Zone - vyöhyke
 * @param type.geometry -
 * @param type.coordinates -
 * @param type.Address_help_fi -
 * @param type.Tyyppi -
 * @param type.Address_fi -
 * @param type.City_fi -
 * @param type.clearLayers - poistaa layerit leaflet
 */

//---------------------------------Iconit-------------------------------------------------------------------------

const imHereMarker = L.icon({                   // olet tässä ikoni
  iconUrl: 'iconit/location-marker-1.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],     // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});

const yellowIcon = L.icon({                   // keltainen ikoni
  iconUrl: 'iconit/marker-yellow.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],     // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});

const greenIcon = L.icon({                   // vihreä ikoni
  iconUrl: 'iconit/marker-green.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],     // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});
const redIcon = L.icon({                    //punainen iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/marker-red.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});
const VHSLpurpleIcon = L.icon({                    //purplehsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-purple.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});
const VHSLpinkIcon = L.icon({                    //pinkkihsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-pink.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});
const VHSLblueIcon = L.icon({                    //sininenhsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-blue.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});
const VHSLlightblueIcon = L.icon({                    //vaaleansininenhsl iconi esim. L.marker([lat, long], {icon: redIcon}).addTo(kartta)}
  iconUrl: 'iconit/HSL-marker-lightblue.png',
  iconSize: [50,41],  //iconin koko
  iconAnchor: [14, 41],    // point of the icon which will correspond to marker's location
  popupAnchor:  [10, -41] // point from which the popup should open relative to the iconAnchor
});

//------------------------------------------------------------------------------------------------------------------

let markerGroup = L.layerGroup().addTo(kartta);  //Laittaa markkerit grouppiin, että ne voi tyhjentää

function footerStyling(latT,longT,myHelsinkiTapahtumat,i){ // tulostaa footterin
  document.getElementById("footerId").innerHTML =`
  <article class="tapahtumatiedotT">
            <h3 id="tapahtumanNimiT"><a id="tapahtumaLinkki"></a></h3>
            <figure id="tapahtumaKuva"></figure>
            <div id="tapahtumaTeksti">
               <h4 id="tapahtumanOsoite"></h4>
                <p id="tapahtumanKaupunkiT"></p>
                <hr class="tekstiVali">
                <p id="tapahtumanAjankohta"></p>
                <hr class="tekstiVali">
                <div id="tapahtumanSummary"></div>
            </div>
            <a id="reittiopasLinkki"><img src="iconit/reittiopas.png" id="reittiopasKuva" alt="reittiopasimg" style="display: none"></a>
            <a id="googleNav"><img src ="iconit/google-maps-icon.png" id="googleIcon" alt="GoogleImg" style="display: none"></a>
        </article>`;
  document.getElementById('footerId').className = "footerVisible";
  document.getElementById('reittiopasKuva').src = "iconit/reittiopas.png";  //reittiopas logo ja linkki kuvasta reittioppaaseen kyseiselle reitille
  document.getElementById('reittiopasKuva').style.display = "block";
  document.getElementById('reittiopasLinkki').href = "https://reittiopas.hsl.fi/reitti/" + currentLat + "," + currentLon + "/" + latT + "," + longT;
  document.getElementById('googleIcon').src = "iconit/google-maps-icon.png";
  document.getElementById('googleIcon').style.display = "block";
  document.getElementById('googleNav').href = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLon}&destination=${latT},${longT}&travelmode=driving`;
  document.getElementById('tapahtumaLinkki').href  = myHelsinkiTapahtumat.data[i].info_url;  //lisää tapahtuman linkin, tapahtuman nimeen
  document.getElementById("tapahtumaKuva").innerHTML = "";  //tyhjentää aijemat kuvat
  document.querySelector(".tekstiVali").style.visibility = "visible"; // palauttaa <hr>tagin
  document.getElementById('tapahtumaLinkki').innerHTML = myHelsinkiTapahtumat.data[i].name.fi;  //tapahtuman nimi
  document.getElementById('tapahtumanOsoite').innerHTML = myHelsinkiTapahtumat.data[i].location.address.street_address;  //tapahtuman osoite
  document.getElementById('tapahtumanSummary').innerHTML = myHelsinkiTapahtumat.data[i].description.body; //tapahtuman kuvaus
  document.getElementById('tapahtumanKaupunkiT').innerHTML = myHelsinkiTapahtumat.data[i].location.address.locality;  //tapahtuman Kaupunki
}
function kuvaForLoop(myHelsinkiTapahtumat,i){
  document.getElementById('tapahtumaKuva').style.visibility = "visible";  //jos tapahtumassa ei ole kuvaa se piilottaa divin
  for(let te = 0; myHelsinkiTapahtumat.data[i].description.images.length > te; te++){ //for looppi kuvien tulostukseen
    let tapahtumaUrl = myHelsinkiTapahtumat.data[i].description.images[te].url;
    document.getElementById("tapahtumaKuva").innerHTML +=`
                  <figure>
                  <a href="${tapahtumaUrl}" data-lightbox="10">
                    <img class = "mySlides" src="${tapahtumaUrl}" alt ="kuva">
                    </a>
                    <figcaption class="copyrightHolder">${myHelsinkiTapahtumat.data[i].description.images[te].copyright_holder}</figcaption>
                  </figure>
                  `;
  }
}

function imageIfstatements(i,myHelsinkiTapahtumat){ //tarkistaa että kuvat ovat valideja
  if(myHelsinkiTapahtumat.data[i].description.images !== null){
    if (myHelsinkiTapahtumat.data[i].description.images.length !== 0){    //liittää tapahtumaan kuuluvat kuvat
      kuvaForLoop(myHelsinkiTapahtumat,i);
    }
    else{document.getElementById('tapahtumaKuva').style.visibility = "hidden";}
  }
  else{document.getElementById('tapahtumaKuva').style.visibility = "hidden";}
}

//haetaan tapahtumien tiedot myHelsinki API:sta
function myHelsinkiEvents(etaisyysInput){
const proxyOsoite = 'https://cors-anywhere.herokuapp.com/' //proxy osoite-API joka enabloi cross-origin requestit
const myHelsinkiEventsOsoite = 'http://open-api.myhelsinki.fi/v1/events/?distance_filter=' + currentLat + '%2C' + currentLon + '%2C' + etaisyysInput;
fetch(proxyOsoite + myHelsinkiEventsOsoite).then((vastaus) => {
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
        L.marker([latT, longT], {icon: redIcon}).addTo(markerGroup).bindPopup(popupInfoT).          //lisää markerin + tapahtuman nimi popupissa
        on('click', function(){
          footerStyling(latT,longT,myHelsinkiTapahtumat,i);
          document.getElementById('tapahtumanAjankohta').innerHTML = myHelsinkiTapahtumat.data[i].event_dates.starting_day;
          imageIfstatements(i,myHelsinkiTapahtumat);
        })
      }
      else{}
    }
}).catch(function(error){console.log(error);
})}



//haetaan tapahtumien tiedot myHelsinki API:sta
function myHelsinkiActivities(etaisyysInput){
  const proxyOsoite = 'https://cors-anywhere.herokuapp.com/' //proxy osoite-API joka enabloi cross-origin requestit
  const myHelsinkiEventsOsoite = 'http://open-api.myhelsinki.fi/v1/activities/?distance_filter=' + currentLat + '%2C' + currentLon + '%2C' + etaisyysInput;
  fetch(proxyOsoite + myHelsinkiEventsOsoite).then((vastaus) => {
    return vastaus.json();
  }).then(function(myHelsinkiTapahtumat){
    let checklonlatT = [];
    console.log(myHelsinkiTapahtumat);
    for (let i = 0; i < myHelsinkiTapahtumat.data.length; i++){ //Poimii listasta koordinantit jokaiseen tapahtumaan ja tekee siitä markerin
      let longT = myHelsinkiTapahtumat.data[i].location.lon;    //longitude
      let latT = myHelsinkiTapahtumat.data[i].location.lat;     //latitude
      let includecheckT = checklonlatT.includes(latT + '-' + longT);              //katsoo onko checkonlatT arrayssa samoja koordinantteja
      if (includecheckT === false) {                                                 //Poistaa duplicatet
        let popupInfoT = myHelsinkiTapahtumat.data[i].name.fi;                       // tapahtuman nimi suomeksi
        checklonlatT.push(latT + '-' + longT);                                     //lisää lon + lat listaan, jotta ei tule duplicateja
        L.marker([latT, longT], {icon: greenIcon}).addTo(markerGroup).bindPopup(popupInfoT).          //lisää markerin + tapahtuman nimi popupissa
            on('click', function(){
              footerStyling(latT,longT,myHelsinkiTapahtumat,i);
              document.getElementById('tapahtumanAjankohta').innerHTML = myHelsinkiTapahtumat.data[i].where_when_duration.where_and_when + '<br>' + 'Kesto: ' + myHelsinkiTapahtumat.data[i].where_when_duration.duration; // Aktiviteetin aukiolo ja kesto
              imageIfstatements(i,myHelsinkiTapahtumat);
            })
      }
      else{}
    }
  }).catch(function(error){console.log(error);
  })}



//haetaan tapahtumien tiedot myHelsinki API:sta
function myHelsinkiPlaces(etaisyysInput){
  const proxyOsoite = 'https://cors-anywhere.herokuapp.com/' //proxy osoite-API joka enabloi cross-origin requestit
  const myHelsinkiEventsOsoite = 'http://open-api.myhelsinki.fi/v1/places/?distance_filter=' + currentLat + '%2C' + currentLon + '%2C' + etaisyysInput;
  fetch(proxyOsoite + myHelsinkiEventsOsoite).then((vastaus) => {
    return vastaus.json();
  }).then(function(myHelsinkiTapahtumat){
    let checklonlatT = [];
    console.log(myHelsinkiTapahtumat);
    for (let i = 0; i < myHelsinkiTapahtumat.data.length; i++){ //Poimii listasta koordinantit jokaiseen tapahtumaan ja tekee siitä markerin
      let longT = myHelsinkiTapahtumat.data[i].location.lon;    //longitude
      let latT = myHelsinkiTapahtumat.data[i].location.lat;     //latitude
      let includecheckT = checklonlatT.includes(latT + '-' + longT);              //katsoo onko checkonlatT arrayssa samoja koordinantteja
      if (includecheckT === false) {                                                 //Poistaa duplicatet
        let popupInfoT = myHelsinkiTapahtumat.data[i].name.fi;                       // tapahtuman nimi suomeksi
        checklonlatT.push(latT + '-' + longT);                                     //lisää lon + lat listaan, jotta ei tule duplicateja
        L.marker([latT, longT], {icon: yellowIcon}).addTo(markerGroup).bindPopup(popupInfoT).          //lisää markerin + tapahtuman nimi popupissa
            on('click', function(){
              footerStyling(latT,longT,myHelsinkiTapahtumat,i);
              document.getElementById('tapahtumaLinkki').innerHTML = myHelsinkiTapahtumat.data[i].name.fi;  //tapahtuman nimi
              document.getElementById('tapahtumanOsoite').innerHTML = myHelsinkiTapahtumat.data[i].location.address.street_address;  //tapahtuman osoite
              document.getElementById('tapahtumanAjankohta').innerHTML = ''; // tyhjentää aijemmat tiedot
              document.querySelector(".tekstiVali").style.visibility = "hidden";
              imageIfstatements(i,myHelsinkiTapahtumat);
            })
      }
      else{}
    }
  }).catch(function(error){console.log(error);
  })}


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
     if (VHSLPKspots.features[Vj].properties.Zone === 'A' || VHSLPKspots.features[Vj].properties.Zone === 'B' || VHSLPKspots.features[Vj].properties.Zone === 'C' || VHSLPKspots.features[Vj].properties.Zone === 'D') {
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
            L.marker([Vlong, Vlat],{icon: VHSLpurpleIcon}).addTo(markerGroup).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Myyntipiste') {
            L.marker([Vlong, Vlat],{icon: VHSLpinkIcon}).addTo(markerGroup).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Monilippuautomaatti') {
            L.marker([Vlong, Vlat],{icon: VHSLblueIcon}).addTo(markerGroup).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Kertalippuautomaatti') {
            L.marker([Vlong, Vlat],{icon: VHSLlightblueIcon}).addTo(markerGroup).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } /* if (VHSLPKpisteet[Vi].properties.Tyyppi === 'Pysäköintiautomaatti') {
            L.marker([Vlong, Vlat],{icon: VHSLlightblueIcon}).addTo(markerGroup).bindPopup(VHSLPKpisteet[Vi].properties.Tyyppi + '</br>' + VHSLPKpisteet[Vi].properties.Address_fi + '</br>' + VHSLPKpisteet[Vi].properties.City_fi + ' Vyöhyke: ' + VHSLPKpisteet[Vi].properties.Zone + '</br>' + Vaddhelp)

        } */

    }

 }).catch(function(error){console.log(error);
})}

//----------------------Filter Nappi ------------------

//Tämän avulla pystyy valistemaan, mitä markkereita haluaa nähdä

const paivitysNappiT = document.getElementById('sortNappi');
let paikatBox = document.getElementById('paikatBox');
let tapahtumaCheckBox = document.getElementById('tapahtumaCheck');
let eventCheckBox = document.getElementById('eventCheck');
let paikatInputfield = document.getElementById('paikatInput'); //katsoo etäisyyden input fieldistä
let lipunmyyntiCheckBox = document.getElementById('lipunmyyntiCheck');
paivitysNappiT.addEventListener('click', function(){
  markerGroup.clearLayers();  //tyhjentää kaikki markkerit
  if(tapahtumaCheckBox.checked === true){                                         // katsoo mitkä check boxit on tickattu
    myHelsinkiEvents(paikatInputfield.value);
  }

  if(eventCheckBox.checked === true){
    myHelsinkiActivities(paikatInputfield.value);
  }
  if(paikatBox.checked === true){
    myHelsinkiPlaces(paikatInputfield.value);
  }
  if(lipunmyyntiCheckBox.checked === true){
    VHSLlipunmyynti();
  }
})



//---------Sidebad------------------
const sidebar = document.querySelector('.sidebar');
const mainSidebar = document.querySelector('.main-sidebar');
document.querySelector('button').onclick = function () {
  sidebar.classList.toggle('sidebar_small');
  mainSidebar.classList.toggle('main-sidebar_large')

    if (sidebar.className === "sidebar sidebar_small") {
      setTimeout(function (){document.getElementById("kartta").style.zIndex = "12"},1000);
    }
    else {
      document.getElementById("kartta").style.zIndex = "0";
    }
  if (sidebar.className === "sidebar sidebar_small") {
    setTimeout(function (){document.getElementById("bottomFooter").style.zIndex = "12"},1000);
  }
  else {
    document.getElementById("bottomFooter").style.zIndex = "0";
  }
  if (sidebar.className === "sidebar sidebar_small") {
    setTimeout(function (){document.getElementById("footerId").style.zIndex = "12"},1000);
  }
  else {
    document.getElementById("footerId").style.zIndex = "0";
  }
}


