var config = {
    apiKey: "AIzaSyBfASD9-eLihPxW58yl3BBQTKjRORjHv_M",
    authDomain: "train-schedule-24436.firebaseapp.com",
    databaseURL: "https://train-schedule-24436.firebaseio.com",
    projectId: "train-schedule-24436",
    storageBucket: "",
    messagingSenderId: "59780457634"
  };
 

  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainTime = $("#time").val().trim();
  var trainFrequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

   alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // Prettify the employee start
  var trainTimeClean = moment.unix(trainTime).format("HH:MM");

  // Calculate the minutes in frequency


  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainTimeClean + "</td><td>" + trainFrequency + "</td>")

});

 
 