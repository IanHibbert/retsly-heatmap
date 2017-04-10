var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('heatmap'), {
        zoom: 13,
        center: {lat: 37.775, lng: -122.434},
        mapTypeId: 'satellite'
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}


function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ];
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function getPoints() {
    var listingCoords = [];
    $.get("https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21", function (data) {
        var listings = data.bundle;
        for (var i = 0; i < listings.length; i++) {
            var lat = listings[i].coordinates[1];
            var long = listings[i].coordinates[0];
            listingCoords.push(new google.maps.LatLng(lat,long));
        }
    });
    return listingCoords;
}

function retrieveDataset(name, callback) {
    $.get("https://rets.io/api/v1/datasets/test?access_token=6baca547742c6f96a6ff71b138424f21", function (data) {
        if (!data){
            callback({ error: "dataset not found" });
        }
        callback(data);
    });
}

