

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

// Button for adding trains
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
  $("#train-name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  //  Consol
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

 
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "hh:mm A");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // Add each train's data into the table
  $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainTime + "</td><td>" + nextTrain.format("hh:mm A") + "</td><td>" + trainFrequency + "</td>");

});

 
 