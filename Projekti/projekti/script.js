let paikka = null;

// liitetään kartta elementtiin #map
const kartta = L.map('kartta');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(kartta);
paivitaKartta({latitude: 64, longitude: 24}, 5);

// Asetukset paikkatiedon hakua varten
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

