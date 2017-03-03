var map;
var center = {
	lat: 55.706347,
	lng: 12.539098
};



function initMap() {
	var myLatLng1 = {
		lat: 55.695095,
		lng: 12.547976
	};
	console.log("initMap fungerer");
	//55.695095, 12.547976
	//Variabel for at få infowindow frem -> funktion er under marker.
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 18,
		center: center,
	});
	$.getJSON("database.json", visSteder);
}

function visSteder(listen) {
	console.log("JSON er kaldt");
	console.table(listen);
	listen.forEach(makeMarker);
}


function makeMarker(marker) {
	console.log("marker er placeret", visSted);

	var fredagsbarloc;


	var marker = new google.maps.Marker({
		position: marker.position,
		map: map,
		icon: 'marker.svg',
		title: marker.navn
	})

}

function visSted(location) {
	//Klon template
	var klon = document.querySelector(".infoboks").content.cloneNode(true);

	//Sæt data ind i klon -
	klon.querySelector(".data_navn").textContent = location.navn;
	klon.querySelector(".data_adresse").textContent = location.adresse;
	klon.querySelector(".position").textContent = location.position;
	klon.querySelector(".beskrivelse").textContent = location.beskrivelse;

	//
}

//
//
//		 //Event listener på markers skal skrives som addListener, altså minus "event"
//		 marker1.addListener("click", clickPaaIkon);
//
//		 //INFOWINDOW Variabel!
//		 var infowindow = new google.maps.InfoWindow({
//
//        });
//
//
//
//
//		 //Zoom, center og window funktion funktion
//		 function clickPaaIkon() {
//			 console.log("er blevet klikket");
//			 map.setCenter(myLatLng1);
//			 map.setZoom(18);
//			infowindow.setContent(klon);
//
//			 infowindow.open(map, marker1);
//		 }
//
//
//
//
