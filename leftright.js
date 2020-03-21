class Player {
    constructor(audios) {
      this.audios = []
      this.audios.push(...audios)
      this.audioIndex = 0;
      this.playing = false;
      this.mode = "alternating"
      for(var i=0; i<this.audios.length; i++){
          this.audios[i].addEventListener('ended', this.nextAudio.bind(this));
      }
    }

    setmode(mode) {
        this.mode = mode;
    }

    currentAudio() {
        return this.audios[this.audioIndex];
    }

    nextAudio(event) {
        if (this.playing){
            if (this.mode == "Simultaneous"){
                event.srcElement.play()
            } else if (this.mode == "Alternating"){
                this.incrementCounter()
                this.currentAudio().play()
            }
        }
    }

    play() {
        if (!this.playing){
            this.playing = true
            if (this.mode == "Simultaneous"){
                for(var i=0; i<this.audios.length; i++) this.audios[i].play();
            } else if (this.mode == "Alternating"){
                this.currentAudio().play();
            }
        }
    }

    stop() {
        
        if (this.playing){
            this.playing = false;
            for(var i=0; i<this.audios.length; i++){
                this.audios[i].pause();
                this.audios[i].currentTime = 0;
            }
            this.audioIndex = 0;
            this.playing = false;
        } else {
            
        }
        
    }

    incrementCounter() {
        this.audioIndex = (this.audioIndex + 1) % this.audios.length;
    }
  }



var left = new Audio('left.mp3');
var right = new Audio('right.mp3')
var myPlayer = new Player([left, right]);



function playClicked(type) {
    var button = document.getElementById(type + "Button");
    button.classList.toggle('buttonPlaying');
    if (myPlayer.playing){
        myPlayer.stop()
        if (myPlayer.mode != type){
            var otherButton = document.getElementById(myPlayer.mode + "Button");
            otherButton.classList.toggle('buttonPlaying');
            myPlayer.mode = type
            myPlayer.play()
        }
    } else {
        myPlayer.mode = type
        myPlayer.play();
    }

}
