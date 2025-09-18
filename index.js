function drawViz(data, element) {
  element.innerHTML = "<div id='map' style='width:100%;height:100%;'></div>";

  // Initialize map centered at Batam
  var map = L.map('map').setView([1.13, 104.05], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Read data rows from Looker Studio
  data.tables.DEFAULT.forEach(row => {
    let lat = parseFloat(row["Latitude"]);
    let lng = parseFloat(row["Longitude"]);
    let klinik = row["Nama Klinik"];
    let alamat = row["Alamat"];
    let sisa = row["Sisa Vaksin"];

    if (!isNaN(lat) && !isNaN(lng)) {
      // Custom pulsing marker
      let icon = L.divIcon({
        className: "pulse-marker",
        html: "",
        iconSize: [20, 20]
      });

      L.marker([lat, lng], { icon: icon })
        .addTo(map)
        .bindPopup(
          `<b>Klinik:</b> ${klinik}<br><b>Alamat:</b> ${alamat}<br><b>Sisa Vaksin:</b> ${sisa}`
        );
    }
  });
}
