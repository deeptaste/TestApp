/**
 * @author Diptesh Shrestha
 */
var App = {
    "app_loaded": false,
    "testing_on_desktop": true,
 
    "init": function () {
	    //console.log("[init]");
	 	
	    if (document.URL.indexOf("http://") === -1) {
	        App.testing_on_desktop = false;
	    }
	 
	    jQuery(document).ready(function () {
		    //console.log("jQuery finished loading");
		 
		    var deviceReadyDeferred = jQuery.Deferred();
		    var jqmReadyDeferred    = jQuery.Deferred();
		    
		    if (App.testing_on_desktop) {
		        //console.log("PhoneGap finished loading");
		        _onDeviceReady();
		        deviceReadyDeferred.resolve();
		    } 
		    else {
		        document.addEventListener("deviceReady", function () {
		            //console.log("PhoneGap finished loading");
		            _onDeviceReady();
					deviceReadyDeferred.resolve();
		        }, false);
	        }
	        
		    jQuery(document).one("pageinit", function () {
				//console.log("jQuery.Mobile finished loading");
		        jqmReadyDeferred.resolve();
		    });
		 
		    jQuery.when(deviceReadyDeferred, jqmReadyDeferred).then(function () {
		        //console.log("PhoneGap & jQuery.Mobile finished loading");
		        initPages();
		        //console.log("App finished loading");
		        App.app_loaded = true;
		    });
		});
		
		function _onDeviceReady () {
		    //console.log("[onDeviceReady]");
		    PGproxy.navigator.notification.alert(device.name, null, 'ERROR', 'OK');
		};
		
		function initPages () {
		    //console.log("[initPages]");
		    jQuery(document).bind("pageinit", _initPages);
		    
		    window.addEventListener('load', function () {
				FastClick.attach(document.body);
			}, false);
		};
		
		function _initPages () {
	   	};
	},
    "data": {
    	"isNull": function (value) {
	    	return value == null ? 0 : ( value[1] || 0 );
	    },
	    "isUndefined": function (value) {
	    	if(typeof(value) === 'undefined') {
				return '-';
			}
	    },
	    "numLength": function (len, num) {
	    	var num = '' + num;
			
			if (num.length < len) {
				for(i = 1; i < len; i++) {
					num = "0" + num;
				}
			}
			return num;
	    },
		"showError": function (err) {
			//console.log("[App.data.showError]");
			var msg = 'code: ' + err.code + '\n' + 'message: ' + err.message + '\n';
			PGproxy.navigator.notification.alert(msg, null, 'ERROR', 'OK');
	    },
    },
    "feature": {
    	"reachability": function () {
			if(PGproxy.navigator.network.connection.type == Connection.NONE || PGproxy.navigator.network.connection.type == Connection.UNKNOWN) {
		        return false;
		    }
		    else {
		        return true;
		    }
		},
		"deviceInfo": {
			"showData": function () {
				//console.log("[App.feature.deviceInfo.showData]");
				var element = document.getElementById('deviceProperties');
				element.innerHTML = '' + 
					'<label class=\'data-title\'>Device Name:</label> '     		+ 
					'<label class=\'data-info\'>' + device.name + '</label>' 		+ 
					'<label class=\'data-title\'>Device Platform:</label> ' 		+ 
					'<label class=\'data-info\'>' + device.platform + '</label>' 	+ 
					'<label class=\'data-title\'>Device Version:</label> '  		+ 
					'<label class=\'data-info\'>' + device.version + '</label>' 	+ 
					'<label class=\'data-title\'>Device UUID:</label> '     		+ 
					'<label class=\'data-info\'>' + device.uuid + '</label>' 		+ 
					'<label class=\'data-title\'>Cordova Version:</label> '  		+ 
					'<label class=\'data-info\'>' + device.cordova + '</label>';
			},
		},
		"accelerometer": {
			"watchID": null,
			"showData": function(acceleration) {
				//console.log("[App.feature.accelerometer.showData]");
				var xVal = acceleration.x;
				var yVal = acceleration.y;
				var zVal = acceleration.z;
				var element = document.getElementById('accelerometer-details');
				var d = new Date(acceleration.timestamp);
				var date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
				date += ' ' + d.getHours() + ':' + App.data.numLength(2, d.getMinutes()) + ':' + App.data.numLength(2, d.getSeconds());
				
				element.innerHTML = '' + 
					'<table class=\'tbl-info\'>' +
					'<tr><th>Acceleration X</th><td>: ' + xVal + '</td></tr>' +
					'<tr><th>Acceleration Y</th><td>: ' + yVal + '</td></tr>' +
					'<tr><th>Acceleration Z</th><td>: ' + zVal + '</td></tr>' + 
					'<tr><th>Timestamp</th><td>: ' + date + '</td></tr></table>';
					
				var cell1 = document.getElementById('cell1');
				var cell2 = document.getElementById('cell2');
				var cell3 = document.getElementById('cell3');
				var cell4 = document.getElementById('cell4');
				var cell5 = document.getElementById('cell5');
				var cell6 = document.getElementById('cell6');
				var cell7 = document.getElementById('cell7');
				var cell8 = document.getElementById('cell8');
				var cell9 = document.getElementById('cell9');
				
				cell1.setAttribute('style','');
				cell2.setAttribute('style','');
				cell3.setAttribute('style','');
				cell4.setAttribute('style','');
				cell5.setAttribute('style','');
				cell6.setAttribute('style','');
				cell7.setAttribute('style','');
				cell8.setAttribute('style','');
				cell9.setAttribute('style','');
				
				var darkShadow = 'background: linear-gradient(45deg,#D8E2E9,#8BAABC);';
				var lightShadow = 'background: linear-gradient(45deg,#CBD9E2,#ECF1F4);';
				
				if(xVal == 0) {
					if(yVal > 0) {
						if(yVal < 2) {
							cell2.setAttribute('style',lightShadow);
						}
						else {
							cell2.setAttribute('style',darkShadow);
						}
					}
					else if(yVal < 0) {
						if(yVal > -2) {
							cell5.setAttribute('style',lightShadow);
						}
						else {
							cell8.setAttribute('style',darkShadow);
						}
					}
					else {
						cell5.setAttribute('style',darkShadow);
					}
				}
				
				if(xVal > 0) {
					if(yVal > 0) {
						if(yVal < 2) {
							if(xVal < 2) {
								cell2.setAttribute('style',lightShadow);
								cell3.setAttribute('style',lightShadow);
								cell6.setAttribute('style',lightShadow);
							}
							else {
								cell2.setAttribute('style',lightShadow);
								cell3.setAttribute('style',lightShadow);
								cell6.setAttribute('style',darkShadow);
							}
						}
						else {
							if(xVal < 2) {
								cell2.setAttribute('style',darkShadow);
								cell3.setAttribute('style',lightShadow);
								cell6.setAttribute('style',lightShadow);
							}
							else {
								cell2.setAttribute('style',lightShadow);
								cell3.setAttribute('style',darkShadow);
								cell6.setAttribute('style',lightShadow);
							}
						}
					}
					else if(yVal < 0) {
						if(yVal > -2) {
							if(xVal < 2) {
								cell6.setAttribute('style',lightShadow);
								cell8.setAttribute('style',lightShadow);
								cell9.setAttribute('style',lightShadow);
							}
							else {
								cell6.setAttribute('style',darkShadow);
								cell8.setAttribute('style',lightShadow);
								cell9.setAttribute('style',lightShadow);
							}
						}
						else {
							if(xVal < 2) {
								cell6.setAttribute('style',lightShadow);
								cell8.setAttribute('style',darkShadow);
								cell9.setAttribute('style',lightShadow);
							}
							else {
								cell6.setAttribute('style',lightShadow);
								cell8.setAttribute('style',lightShadow);
								cell9.setAttribute('style',darkShadow);
							}
						}
					}
				}
				
				if(xVal < 0 ){
					if(yVal > 0) {
						if(yVal < 2) {
							if(xVal > -2) {
								cell1.setAttribute('style',lightShadow);
								cell2.setAttribute('style',lightShadow);
								cell4.setAttribute('style',lightShadow);
							}
							else {
								cell1.setAttribute('style',lightShadow);
								cell2.setAttribute('style',lightShadow);
								cell4.setAttribute('style',darkShadow);
							}
						}
						else {
							if(xVal > -2) {
								cell1.setAttribute('style',lightShadow);
								cell2.setAttribute('style',darkShadow);
								cell4.setAttribute('style',lightShadow);
							}
							else {
								cell1.setAttribute('style',darkShadow);
								cell2.setAttribute('style',lightShadow);
								cell4.setAttribute('style',lightShadow);
							}
						}
					}
					else if(yVal < 0) {
						if(yVal > -2) {
							if(xVal > -2) {
								cell4.setAttribute('style',lightShadow);
								cell7.setAttribute('style',lightShadow);
								cell8.setAttribute('style',lightShadow);
							}
							else {
								cell4.setAttribute('style',darkShadow);
								cell7.setAttribute('style',lightShadow);
								cell8.setAttribute('style',lightShadow);
							}
						}
						else {
							if(xVal > -2) {
								cell4.setAttribute('style',lightShadow);
								cell7.setAttribute('style',lightShadow);
								cell8.setAttribute('style',darkShadow);
							}
							else {
								cell4.setAttribute('style',lightShadow);
								cell7.setAttribute('style',darkShadow);
								cell8.setAttribute('style',lightShadow);
							}
						}
					}
				}
			},
			"startService": function(acceleration) {
				//console.log("[App.feature.accelerometer.startService]");
				var options = { 
					frequency: 3000 
				};
				App.feature.accelerometer.watchID = navigator.accelerometer.watchAcceleration(App.feature.accelerometer.showData, App.data.showError, options);
			},
			"stopService": function() {
				//console.log("[App.feature.accelerometer.stopService]");
				if (App.feature.accelerometer.watchID) {
					navigator.accelerometer.clearWatch(App.feature.accelerometer.watchID);
					App.feature.accelerometer.watchID = null;
				}
			},
		},
		"camera": {
			"pictureSource": null,
			"destinationType": null,
			
			"startService": function() {
				//console.log("[App.feature.camera.startService]");
				App.feature.camera.pictureSource = navigator.camera.PictureSourceType;
				App.feature.camera.destinationType = navigator.camera.DestinationType;
			},
			"onPhotoDataSuccess": function(imageData) {
				//console.log("[App.feature.camera.onPhotoDataSuccess]");
				var imgPreview = document.getElementById('img-preview');
				imgPreview.style.display = 'block !important';
				imgPreview.src = "data:image/jpeg;base64," + imageData;
			},		
			"onPhotoURISuccess": function(imageURI) {
				//console.log("[App.feature.camera.onPhotoURISuccess]");
				var largeImage = document.getElementById('largeImage');
				largeImage.style.display = 'block !important';
				largeImage.src = imageURI;
			},
			"capturePhoto": function() {
				//console.log("[App.feature.camera.capturePhoto]");
				var options = { 
						quality: 50, 
						destinationType: App.feature.camera.destinationType.DATA_URL,
                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                        encodingType: 0     // 0=JPG 1=PNG
				};
				navigator.camera.getPicture(App.feature.camera.onPhotoDataSuccess, App.data.showError, options);
			},
			"capturePhotoEdit": function() {
				//console.log("[App.feature.camera.capturePhotoEdit]");
				var options = { 
						quality: 20, 
						allowEdit: true,
						destinationType: App.feature.camera.destinationType.DATA_URL,
                        sourceType: 1,
                        encodingType: 0
				};
				navigator.camera.getPicture(App.feature.camera.onPhotoDataSuccess, App.data.showError, options);
			},
			"getPhoto": function(source) {
				//console.log("[App.feature.camera.getPhoto]");
				var options = { 
						quality: 50, 
						destinationType: App.feature.camera.destinationType.FILE_URI,
						sourceType: source 
				};
				navigator.camera.getPicture(App.feature.camera.onPhotoURISuccess, App.data.showError, options);
			},
		},
		"geolocation": {
			"watchID": null,
			"createMarker": function(map, placeLoc, desc) {
				//console.log("[App.feature.geolocation.createMarker]");
				var marker = new google.maps.Marker({
					map : map,
					position : placeLoc,
					title: desc
				});
				
				var infowindow = new google.maps.InfoWindow();
			
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(desc);
					infowindow.open(map, this);
				});
				
				return marker;
			},
			"showMap": function(position) {
				//console.log("[App.feature.geolocation.showMap]");
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				
				var mapFrame 	= document.getElementById('map-frame');
				var curLocation = new google.maps.LatLng(lat, lng);
				
				var map = new google.maps.Map(mapFrame, {
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					center : curLocation,
					zoom : 11
				});
				
				var homeMarker = App.feature.geolocation.createMarker(map, curLocation, "YOU ARE HERE");
				
				iconFile = 'css/images/green-dot.png';
				homeMarker.setIcon(iconFile);
			},
			"showData": function(position) {
				//console.log("[App.feature.geolocation.showData]");
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				var alt = position.coords.altitude;
				var acc = position.coords.accuracy;
				var alc = position.coords.altitudeAccuracy;
				var hed = position.coords.heading;
				var spd = position.coords.speed;
				
				var geoInfo = document.getElementById('geolocation-details');
				
				geoInfo.innerHTML = '' + 
					'<table class=\'tbl-info\'>' +
					'<tr><th>Latitude</th><td>: ' + lat + '</td></tr>' +
					'<tr><th>Longitude</th><td>: ' + lng + '</td></tr>' +
					'<tr><th>Altitude</th><td>: ' + alt + '</td></tr>' +
					'<tr><th>Accuracy</th><td>: ' + acc + '</td></tr>' +
					'<tr><th>Altitude Accuracy</th><td>: ' + alc + '</td></tr>' +
					'<tr><th>Heading</th><td>: ' + hed + '</td></tr>' +
					'<tr><th>Speed</th><td>: ' + App.data.isNull(spd) + '</td></tr></table>';
				
				App.feature.geolocation.showMap(position);
			},
			"startService": function(position) {
				//console.log("[App.feature.geolocation.startService]");
				if(!App.feature.reachability()){
			        PGproxy.navigator.notification.alert('No internet connection available', null, '', 'OK');
			    }
			    else{
			    	//var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
			    	//var options = { maximumAge: 5000, enableHighAccuracy: true };
			    	var options = { enableHighAccuracy: true };
			        App.feature.geolocation.watchID = navigator.geolocation.watchPosition(App.feature.geolocation.showData, App.data.showError, options);
			    }
			},
			"stopService": function() {
				//console.log("[App.feature.geolocation.stopService]");
				if (App.feature.geolocation.watchID != null) {
			        navigator.geolocation.clearWatch(App.feature.geolocation.watchID);
			        App.feature.geolocation.watchID = null;
			    }
			},
		},
    },
};

// emulate PhoneGap for testing on Chrome
var PGproxy = {
    "navigator": {
        "connection": function () {
            if (navigator.connection) {
                return navigator.connection;
            } 
            else {
                console.log('navigator.connection');
                return {
                    "type":"WIFI" // Avoids errors on Chrome
                };
            }
        },
        "network": {
        	"connection": {
        		"type": function () {
        			if(navigator.network.connection.type) {
        				return navigator.network.connection.type;
        			}
        			else {
        				console.log('navigator.network.connection.type');
        			}
        		},
        	}
        },
        "notification": {
            "vibrate": function (a) {
                if (navigator.notification && navigator.notification.vibrate) {
                    navigator.notification.vibrate(a);
                } else {
                    console.log("navigator.notification.vibrate");
                }
            },
            "alert": function (a, b, c, d) {
                if (navigator.notification && navigator.notification.alert) {
                    navigator.notification.alert(a, b, c, d);
                } else {
                    console.log("navigator.notification.alert");
                    alert(a);
                }
            }
        },
        "splashscreen": {
            "hide": function () {
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                } else {
                    console.log('navigator.splashscreen.hide');
                }
            }
        },
    }
};

$(document).on('pageshow', '#home', function(){  
	
	// User Login via Ajax Functionalities
	$(document).on('click', '#login', function(e) {
		var uName = $('#username').val();
		var pWord = $('#password').val();
		
		if(uName.length > 0 && pWord.length > 0) {
			PGproxy.navigator.notification.alert('Processing...', null, '', 'OK');
			
			if(!App.feature.reachability()){
		        PGproxy.navigator.notification.alert('No internet connection available', null, 'ERROR', 'OK');
		    }
		    else{
		    	$.ajax({
				    url        		: "http://localhost/SoapWebServiceForMobileApp/login.php?callback=myCallBack",
				    type       		: "POST",
				    crossDomain		: true,
				    data       		: {username : uName, password : pWord},
				    contentType		: "application/json; charset=utf-8",
				    dataType		: "jsonp",
				    jsonp			: "callback",
				    jsonpCallback	: "jsonpCallbackfunction",
				    success    		: function(data) {
				    	PGproxy.navigator.notification.alert(data, null, '', 'OK');
				    },
				    error      		: function(xhr, ajaxOptions, thrownErrorw) {
				        PGproxy.navigator.notification.alert('Some error occurred. Please try again later.', null, 'ERROR', 'OK');           
				    }
				});
		    }
		}
		else {
			PGproxy.navigator.notification.alert('Please provide the required login details.', null, 'ERROR', 'Login');
		}
	});
	
	// User Registration via Ajax Functionalities
	$(document).on('click', '#register', function(e) {
		var uName = $('#username').val();
		var pWord = $('#password').val();
		var cWord = $('#confirmPassword').val();
		var eMail = $('#email').val();
		
		if(uName.length > 0 && pWord.length > 0 && eMail.length > 0) {
			if(pWord == cWord) {
				PGproxy.navigator.notification.alert('Processing...', null, '', 'OK');
				
				if(!App.feature.reachability()){
			        PGproxy.navigator.notification.alert('No internet connection available', null, 'ERROR', 'OK');
			    }
			    else{
			    	$.ajax({
					    url        		: "http://localhost/SoapWebServiceForMobileApp/register.php?callback=myCallBack",
					    type       		: "POST",
					    crossDomain		: true,
					    //beforeSend 	: function() {$.mobile.loading('show');},
					    //complete   	: function() {$.mobile.loading('hide');},
					    data       		: {username : uName, password : pWord, email: eMail},
					    contentType		: "application/json; charset=utf-8",
					    dataType		: "jsonp",
					    jsonp			: "callback",
					    jsonpCallback	: "jsonpCallbackfunction",
					    success    		: function(data) {
					    	PGproxy.navigator.notification.alert(data, null, '', 'OK');
					    },
					    error      		: function(xhr, ajaxOptions, thrownErrorw) {
					        PGproxy.navigator.notification.alert('Some error occurred. Please try again later.', null, '', 'OK');        
					    }
					});
			    }
		    }
			else {
				PGproxy.navigator.notification.alert('Password does not match.', null, 'ERROR', 'OK');
			}
		}
		else {
			PGproxy.navigator.notification.alert('Please provide the required login details.', null, 'ERROR', 'OK');
		}
	});
});

function userRegistrationDisplay() {
	document.getElementById('userRegistrationSection').setAttribute('style', 'display: block !important;');
	document.getElementById('userLoginLink').setAttribute('style', 'display: block !important;');
	
	document.getElementById('userLoginSection').setAttribute('style', 'display: none !important;');
	document.getElementById('userRegistrationLink').setAttribute('style', 'display: none !important;');
}

function userLoginDisplay() {
	document.getElementById('userLoginSection').setAttribute('style', 'display: block !important;');
	document.getElementById('userRegistrationLink').setAttribute('style', 'display: block !important;');
	
	document.getElementById('userRegistrationSection').setAttribute('style', 'display: none !important;');
	document.getElementById('userLoginLink').setAttribute('style', 'display: none !important;');
}
