left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
var song = "";

function preload() {
    song = loadSound('music.mp3');
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modalloaded);
    posenet.on('pose', gotPoses);
}
function modalloaded() {
    console.log("posenet is initialized");
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("#00FFFF");
    stroke("#50C878");
    circle(left_wrist_x, left_wrist_x, 20);
    InNumberLeftWristY = Number(left_wrist_y);
    remove_decimal = floor(InNumberLeftWristY);
    volume = remove_decimal / 500;
    console.log(remove_decimal);
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        confidenceLeft = results[0].pose.leftWrist.y.confidence;
        if (confidenceLeft >= 0.5) {
            left_wrist_x = results[0].pose.leftWrist.x;
            left_wrist_y = results[0].pose.leftWrist.y;
            console.log("left wrist x= " + left_wrist_x + "left wrist y= " + left_wrist_y);
        }
        confidenceRight = results[0].pose.rightWrist.y.confidence;
        if (confidenceRight >= 0.5) {
            right_wrist_x = results[0].pose.rightWrist.x;
            right_wrist_y = results[0].pose.rightWrist.y;
            console.log("right wrist x= " + right_wrist_x + "right wrist y= " + right_wrist_y);
            confidenceLeft = results[0].pose.leftWrist.y.confidence;
        }
    }

}