var geolocation = (function () {
    var dfd = jQuery.Deferred();

    function getUF() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }
        else {
            console.log("Browser unable to get geolocation.");
        }
        return dfd.promise();
    }

    //Get the latitude and the longitude;
    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng)
    }

    function errorFunction() {
        console.log("Geolocation failed to get UF");
    }

    function codeLatLng(lat, lon) {
        $.get("https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}".replace('{lat}', lat).replace('{lon}', lon), function (data) {
            dfd.resolve(data.address.state);
        });
    }

    return {
        getUF: getUF
    };
})();
