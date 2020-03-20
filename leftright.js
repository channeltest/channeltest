class Player {
    constructor(audios) {
      this.audios = []
      this.audios.push(...audios)
      this.audioIndex = 0;
      this.playing = false;
      this.mode = "alternating"
      for (var a of this.audios){
          a.addEventListener('ended', this.nextAudio.bind(this));
      }
    }

    setmode(mode) {
        this.mode = mode;
    }

    currentAudio() {
        return this.audios[this.audioIndex];
    }

    nextAudio() {
        if (this.playing){
            this.incrementCounter()
            this.currentAudio().play()
        }
    }

    play() {
        if (!this.playing){
            this.playing = true
            if (this.mode == "simultaneous"){

            } else if (this.mode == "alternating"){
                this.currentAudio().play();
            }
        }
    }

    stop() {
        this.playing = false;
        var current = this.currentAudio()
        current.pause();
        current.currentTime = 0;
        this.audioIndex = 0;
    }

    incrementCounter() {
        this.audioIndex = (this.audioIndex + 1) % this.audios.length;
    }
  }





var left = new Audio('left.mp3');
var right = new Audio('right.mp3')
var myPlayer = new Player([left, right]);
  



function playAlternating() {
    var button = document.getElementById("alternatingButton");
    button.classList.toggle('buttonPlaying');
    if (myPlayer.playing){
        myPlayer.stop()
    } else {
       myPlayer.play();
    }

}

function playSimultaneous() {
    var button = document.getElementById("simultaneousButton");
    button.classList.toggle('buttonPlaying');
    if (myPlayer.playing){
        myPlayer.stop()
    } else {
       myPlayer.play();
    }

}