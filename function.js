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


function makeMarker(sted) {
	console.log("marker er placeret");
//	visSted(sted);




	var marker = new google.maps.Marker({
		position: sted.position,
		icon: sted.icon,
		map: map,
//		icon: 'marker.svg',
		title: sted.navn
	})

marker.addListener("click", clickOnMarker);

	function clickOnMarker() {
	console.log("marker er blevet klikket");
	map.setCenter(sted.position);

	var klon = document.querySelector("#infoboks").content.cloneNode(true);

	//Sæt data ind i klon -
	klon.querySelector(".data_navn").textContent = sted.navn;
	klon.querySelector(".data_adresse").textContent = sted.adresse;
	klon.querySelector(".data_beskrivelse").textContent = sted.beskrivelse;
	klon.querySelector(".data_billede img").src = sted.billede;
	klon.querySelector.setAttribute()

	var infowindow = new google.maps.InfoWindow({
		content: klon
	})

	infowindow.open(map, marker);
}
}





