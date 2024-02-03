export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaHV5bmhuaHV0cXVhbmcxMjMiLCJhIjoiY2xyenM0N2VsMWFvODJrbXd6czVzeHFkZiJ9.nvS5ce5sC1Yk4wPpbg1CZg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/huynhnhutquang123/clrzsc4us006w01pahbash7l9',
    scrollZoom: false,
  });
  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });
};
