// Vi opretter en variabel som skal indholde værdien af, hvilket rum der er valgt.
var selectedRoom;

var roomId;
var roomName;
var roomTemp;
var roomPower;
var roomLight;
var roomCurtain;

// Initialize Firebase med de oplysninger vi har
var firebaseConfig = {
    apiKey: "AIzaSyAPkMM8Cnwo_Sx8W8WzxRroQvmRWOfDbEg",
    authDomain: "smarthome-8a924.firebaseapp.com",
    databaseURL: "https://smarthome-8a924.firebaseio.com",
    projectId: "smarthome-8a924",
    storageBucket: "smarthome-8a924.appspot.com",
    messagingSenderId: "223242417336",
    appId: "1:223242417336:web:edcfe9699372862519304d"
  };

firebase.initializeApp(firebaseConfig);

// Getting the Selected Room from database

// Vi laver en variabel som indeholder stien til de forskellige rum, Houses > Rooms >
var getData = firebase.database().ref('Houses').child('Rooms');
// Her beder vi firebase om at sende et snapshot, af dataen, hver gang der ændres en "value"
getData.on('value', function (snapshot) {

  snapshot.forEach(function (childSnapshot) {
    var isRoomSelected = childSnapshot.val().imSelected;
    
    if (isRoomSelected == true) {
      getRoomDetails(childSnapshot.val());
    }
  });
});



// Nedenstående kode viser information fra databasen for det pågældene rum
// Når denne funktion bliver kørt sendes det rum som er "selected" i databasen med

function getRoomDetails(selectedRoom) {
  // Vi opdatere de variabler som viser dataen med den data som er tilknyttet rummet
  roomId = selectedRoom.id;
  roomName = selectedRoom.name;
  roomTemp = selectedRoom.temp;
  roomPower = selectedRoom.power;
  roomLight = selectedRoom.light;
  roomCurtain = selectedRoom.gardiner;
  updateGUI();
};

function updateGUI(){
  // Vi opdatere vores HTML / GUI med værdien fra variablerne
  document.getElementById('room-id').innerHTML = roomId;
  document.getElementById('room-title').innerHTML = roomName;
  document.getElementById('room-power').innerHTML = roomPower;
  document.getElementById('room-light').innerHTML = roomLight;
  document.getElementById('room-temp').innerHTML = roomTemp;
  document.getElementById('room-curtain').innerHTML = roomCurtain;
}