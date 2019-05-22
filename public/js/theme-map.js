(function ($) {
  // USE STRICT
  "use strict";

  var mapSelector = $('.js-google-map');

  function addMaker(makers, map, icon) {
      var marker, i;
      var infowindow = new google.maps.InfoWindow();
      for (i = 0; i < makers.length; i++) {
          var mapText = '<div class="map__box-info"><h4>'+ makers[i][0] +'</h4><p>'+ makers[i][1] +'</p></div>';
          marker = new google.maps.Marker({
              position: new google.maps.LatLng(makers[i][2], makers[i][3]),
              map: map,
              icon: icon,
              animation: google.maps.Animation.DROP
          });
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                  infowindow.setContent(mapText);
                  infowindow.open(map, marker);
              }
          })(marker, i));
      }
  }

  mapSelector.each(function () {
      var that = $(this);

      var mapStyleDefault = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
];

      var mapHolder = that.find('.js-map-holder');
      var idMapHolder = mapHolder.attr('id');

      var options = {
          makericon: '../images/icon-map.png',
          makers: '[["New Jersey", "Content", 21.04161, 105.775133]]',
          zoom : 11,
          center: new google.maps.LatLng(40.543557, -74.127108),
          scrollwheel: 0,
          navigationcontrol: true,
          maptypecontrol: false,
          scalecontrol: false,
          draggable: 1,
          styles: mapStyleDefault,
          maptypeId: google.maps.MapTypeId.ROADMAP
      };

      for (var k in options) {
          if (options.hasOwnProperty(k)) {
              if ($(this).attr('data-' + k) != null) {
                  options[k] = $(this).attr("data-"+k);
              }
          }
      }

      var locations = $.parseJSON(options.makers);
      var bound = new google.maps.LatLngBounds();

      for (var i = 0; i < locations.length; i++) {
          bound.extend(new google.maps.LatLng(locations[i][2], locations[i][3]));
      }

      var mapOptions = {
          zoom: options.zoom,
          scrollwheel: options.scrollwheel,
          navigationControl: options.navigationcontrol,
          mapTypeControl: options.maptypecontrol,
          scaleControl: options.scalecontrol,
          draggable: options.draggable,
          styles: options.styles,
          center: bound.getCenter(),
          mapTypeId: options.maptypeId,
      };

      var mapAPI = new google.maps.Map(document.getElementById(idMapHolder), mapOptions);
      addMaker(locations, mapAPI, options.makericon);
  });

})(jQuery);
