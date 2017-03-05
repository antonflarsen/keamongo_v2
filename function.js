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
	//GRÆNSEVÆRDIER TIL OVERLAY
	var bounds = {
		north: 55.70732627720079,
		south: 55.70536769825661,
		east: 12.540836071441618,
		west: 12.537359928558317
	}

	//OVERLAY

	var overlay = new google.maps.GroundOverlay('overlay-01.svg', bounds);

	overlay.setMap(map);

//
	//GEOLOCATION MARKER
//
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(function (position) {

			var minPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			map.setCenter(minPos);

			var mig = new google.maps.Marker ({
				position: minPos,
				icon: 'marker.svg',
				map: map
			});
		});
	} else {
		alert("Geolocation failed");
	}
//JSON FILEN ER BLEVET KALDT, OG FØRER VIDERE TIL VIS STEDER, SÅ VI KAN TJEKKE OM DEN ER BLEVET HENTET KORREKT.
	$.getJSON("database.json", visSteder);

}
//VISER AT JSON FIL ER KALDT OG FØRER VIDERE TIL AT LAVE MARKERS
function visSteder(listen) {
	console.log("JSON er kaldt");
	console.table(listen);
	listen.forEach(makeMarker);
}

//MARKERS RUNDT OMKRING
function makeMarker(sted) {
	console.log("marker er placeret");




//DEFINERER MARKER PROPERTIES UD FRA JSON FIL
	var marker = new google.maps.Marker({
		position: sted.position,
		icon: sted.icon,
		map: map,
		//		icon: 'marker.svg',
		title: sted.navn
	})
//MARKER KLIKFUNCTION
	marker.addListener("click", clickOnMarker);

	function clickOnMarker() {
		console.log("marker er blevet klikket");
//		map.setCenter(sted.position);
//KLONSTART
		var klon = document.querySelector("#infoboks").content.cloneNode(true);

		//Sæt data ind i klon -
		klon.querySelector(".data_navn").textContent = sted.navn;
		klon.querySelector(".data_adresse").textContent = sted.adresse;
		klon.querySelector(".data_beskrivelse").textContent = sted.beskrivelse;
		klon.querySelector(".data_billede img").src = sted.billede;


		var infowindow = new google.maps.InfoWindow({
			content: klon
		})

		infowindow.open(map, marker);
	}
}

