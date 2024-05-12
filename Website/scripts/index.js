const vid_background = document.getElementById('video_background');
vid_background.volume = 0.2;
let playing = true;

function vidclick() {
    if(playing) {
        vid_background.pause();
    }
    else {
        vid_background.play();
    }
    playing = !playing;
}