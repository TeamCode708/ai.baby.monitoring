var alertSound = "";
var objectStatus = "";
var babyStatus = "";
var objectDetector = "";
var objects = [];
function preload() {
    alertSound = loadSound("alert.mp3");
}
function setup() {
    canvas = createCanvas(380, 270);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 270);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
    }
    objects = results;
    console.log(objects);
}
function draw() {
    image(video, 0, 0, 380, 270);
    if (objectStatus != "") {
        objectDetector.detect(video, gotResult);
        r = random(5);
        g = random(5);
        b = random(5);
        if (objects.length > 0) {
            for (i = 0; i < objects.length; i++) {
                if (objects[i].label == "person") {
                    document.getElementById("babyStatus").innerHTML = "Baby Found";
                    fill(r,g,b);
                    text(objects[i].label, objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke(r,g,b);
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    alertSound.stop();
                }
            }
        }
        else {
            document.getElementById("babyStatus").innerHTML = "Baby Not Found";
            alertSound.play();
            alertSound.setVolume(1);
            alertSound.rate(1);
        }
    }
}
function modelLoaded() {
    console.log("MODEL LOADED SUCCESSFULLY!!");
    objectStatus = true;
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby";
}