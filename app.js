
var selectedRoom;
var isRoomSelected;
var roomName;
var roomId;
var roomPower;
var roomLight;
var roomTemp;

var oldSelectedRoom;
var newSelectedRoom;

var checker = document.getElementById("check");


//---------------------------------------- * INIT FIREBASE * --------------------------------
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAPkMM8Cnwo_Sx8W8WzxRroQvmRWOfDbEg",
    authDomain: "smarthome-8a924.firebaseapp.com",
    databaseURL: "https://smarthome-8a924.firebaseio.com",
    projectId: "smarthome-8a924",
    storageBucket: "smarthome-8a924.appspot.com",
    messagingSenderId: "223242417336",
    appId: "1:223242417336:web:edcfe9699372862519304d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Browserify Setup
//----------------------- * INIT DATA * --------------------
var getDb = firebase.database().ref('Houses').child('Rooms');

getDb.once('value', function (snapshot) {
  console.log("check nummer 1")
  snapshot.forEach(function (childSnapshot) {
    isRoomSelected = childSnapshot.val().imSelected;
    if (childSnapshot.val().imSelected === true && childSnapshot.val().id != oldSelectedRoom) {
      console.log("check nummer 2")
      oldSelectedRoom = childSnapshot.val().id;
      getRoomDetails(childSnapshot.val());
    }
  });
});
//----------------------- * HENTER DATA NÅR DER TRYKKES PÅ RUM* --------------------
function getRoomData(selectedRoom) {
  var getRoom = firebase.database().ref('Houses/Rooms').child(selectedRoom);

  getRoom.once('value', function (snapshot) {

    if (oldSelectedRoom != selectedRoom && oldSelectedRoom != "undefined") {
      oldSelectedRoom = snapshot.val().id;
      getRoomDetails(snapshot.val());
    }
  })
}
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

function updateGUI() {
  // Vi opdatere vores HTML vise værdien fra variablerne
  document.getElementById('room-id').innerHTML = roomId;
  document.getElementById('room-title').innerHTML = roomName;
  document.getElementById('room-temp').innerHTML = roomTemp;
  document.getElementById('room-power').innerHTML = roomPower;
  document.getElementById('room-light').innerHTML = roomLight;

  document.getElementById('room-curtain').innerHTML = roomCurtain;
  // indstiller sliders
  document.getElementById("myRangeTemp").value = roomTemp;
  document.getElementById("slider-text2").innerText = roomTemp + "°"
   if (document.getElementById("slider-text2").innerText < 10){
    document.getElementById("slider-text2").innerText =  0 +  roomTemp + "°"
  }


  document.getElementById("myRangeLight").value = roomLight;
  document.getElementById("slider-text1").innerText = 0 + roomLight;
  if ( document.getElementById("slider-text1").innerText == 10){
    document.getElementById("slider-text1").innerText = roomLight;
  }
  document.getElementById("myRangeCurtain").value = roomCurtain;
  document.getElementById("slider-text3").innerText = roomCurtain;
  if (roomPower === true) {
    document.getElementById("switcher").checked = true;
  } else {
    document.getElementById("switcher").checked = false;
  }
}

//--------- * Viser data ved tryk på et bestemt rum * ---------
$('#roomPicker').on('click', function (ev) {
  if (ev.target.id != oldSelectedRoom && ev.target.id != "roomPicker" && ev.target.id != "switcher") {
    updateSelectedRoom(ev.target.id, oldSelectedRoom);
    switch (ev.target.id) {
      case 'Bedroom':
        getRoomData("Bedroom");
        document.getElementById("picture").src = "svg/image 8.svg"
        break;
      case 'Kidsroom1':
        getRoomData("Kidsroom1");
        document.getElementById("picture").src = "svg/image 6.svg"
        break;
      case 'Kidsroom2':
        getRoomData("Kidsroom2");
        document.getElementById("picture").src = "svg/image 7.svg"
        break;
      case 'Kitchen':
        getRoomData("Kitchen");
        document.getElementById("picture").src = "svg/image 5.svg"
        break;
      case 'Livingroom':
        getRoomData("Livingroom");
        document.getElementById("picture").src = "svg/image 9.svg"
        break;
      case 'Bathroom':
        getRoomData("Bathroom");
        document.getElementById("picture").src = "svg/image 4.svg"
        break;
    }
  }
});

// Når der trykkes på et rum
function updateSelectedRoom(newSelectedRoom, selectedRoom) {
  firebase.database().ref('Houses/Rooms').child(newSelectedRoom).update({
    imSelected: true
  });
  firebase.database().ref('Houses/Rooms').child(selectedRoom).update({
    imSelected: false
  });
}
// updateTemp("999");
// _____------ HER INTERAKTIONER -----_____

// Slidertemp
var sliderTemp = document.getElementById("myRangeTemp");
var outputTemp = document.getElementById("room-temp").innerHTML = roomTemp;
// outputTemp.innerHTML = sliderTemp.value; // Display the default slider value
sliderTemp.oninput = function () {
  outputTemp.innerHTML = this.value;

}
// Når du interagere med checkboxen
$('#switcher').change(function () {
  console.log("Du skal ændre dig! : " + this.checked)
  var poweroutput = document.getElementById("room-power");
  poweroutput.innerHTML = this.checked;
  updatePower(this.checked);
});

//---------------------------------------- * Update Rum * --------------------------------

// Send new data for Temp
function updateTemp(newTemp) {
  firebase.database().ref('Houses/Rooms').child(oldSelectedRoom).update({
    temp: newTemp
  });
}
// Send new data for Power
function updatePower(newPower) {
  firebase.database().ref('Houses/Rooms').child(oldSelectedRoom).update({
    power: newPower
  });
}

// Send new data for Lys
function updateLys(newLight) {
  firebase.database().ref('Houses/Rooms').child(oldSelectedRoom).update({
    light: newLight
  });
}

// Send new data for Curtain
function updateCurtain(newCurtain) {
  firebase.database().ref('Houses/Rooms').child(oldSelectedRoom).update({
    gardiner: newCurtain
  });
}

var asd = 0;
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function togNav() {
  // var closeBtn = document.getElementById("close-btn")
  // closeBtn.classList.add("openbtn-slide");
  if (asd == 0){
    document.getElementById("close-btn").style.animation = "opening 0.5s 1";
    document.getElementById("close-btn").style.marginLeft = "-7px";
    asd = 1;
  } else {
    document.getElementById("close-btn").style.animation = "closing 0.5s 1";
    document.getElementById("close-btn").style.marginLeft = "120px";
    asd = 0;
  }
  // document.getElementById("close-btn").style.animation = "opening 4s 1"
  // document.getElementById("close-btn").style.animationIterationCount  = "1";
  // document.getElmentById("roomPicker").style.width = "300px";
  var nav = document.getElementById("sideBar");
  if (nav.style.width == "150px") {
    nav.style.width = '0';
    nav.style.opacity = '0'
  } else {
    nav.style.width = "150px"
    nav.style.opacity = '1'
  }
  // document.getElementById("main").style.marginLeft = "300px";
}


// Slidertemp
var sliderTemp = document.getElementById("myRangeTemp");
var outputTemp = document.getElementById("room-temp");
outputTemp.innerHTML = sliderTemp.value; // Display the default slider value
sliderTemp.oninput = function () {
  outputTemp.innerHTML = this.value;
  //updateTemp(this.value)
}

// Slidercurtain
var sliderCurtain = document.getElementById("myRangeCurtain");
var outputCurtain = document.getElementById("room-curtain");
outputCurtain.innerHTML = sliderCurtain.value; // Display the default slider value
sliderCurtain.oninput = function () {
  outputCurtain.innerHTML = this.value;
  updateCurtain(this.value)
}

var sliderLight = document.getElementById("myRangeLight");
var outputLight = document.getElementById("room-light");
var textLys = document.getElementById("slider-text1")
$(".slideContainer1").change(function (ev) {
  
  roomLight = ev.target.value;
  updateLys(roomLight);
  textLys.innerText = 0 + roomLight;
  if (roomLight == 10){
    textLys.innerText = roomLight;
  }
  outputLight.innerHTML = roomLight;
  sliderLight.value = 0 + outputLight.innerHTML;
})


var sliderTemp = document.getElementById("myRangeTemp");
var outputTemp = document.getElementById("room-temp");
var textTemp = document.getElementById("slider-text2")
$(".slideContainer2").change(function (ev) {
  
  roomTemp = ev.target.value;
  updateTemp(roomTemp);
  if (roomTemp >= 10){
    textTemp.innerText = roomTemp + "°";
  } else {
    textTemp.innerText = 0 + roomTemp + "°";
  }
  outputTemp.innerHTML = roomTemp;
})


var sliderCurtain = document.getElementById("myRangeCurtain");
var outputCurtain = document.getElementById("room-curtain");
var textCurtain = document.getElementById("slider-text3")
sliderCurtain = outputCurtain;
$(".slideContainer3").change(function () {
  textCurtain.innerHTML = sliderCurtain.innerHTML;
})