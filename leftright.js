class Player {
    constructor(audios) {
      this.audios = []
      this.audios.push(...audios)
      this.audioIndex = 0;
      this.playing = false;
      this.mode = "alternating"
      this.channels = "2"
      this.channel_map = {
          "2": [0,1],
          "3": [2,4],
          "5": [5,9],
          "7": [10,16]
      }
      for(var i=0; i<this.audios.length; i++){
          this.audios[i].addEventListener('ended', this.nextAudio.bind(this));
      }
    }

    setmode(mode) {
        this.mode = mode;
    }

    setchannels(channels) {
        this.channels = channels;
        this.audioIndex = this.channel_map[this.channels][0]
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
                var start_index = this.channel_map[this.channels][0];
                var end_index = this.channel_map[this.channels][1];
                for(var i=start_index; i<=end_index; i++) this.audios[i].play();
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
        var start_index = this.channel_map[this.channels][0];
        var end_index = this.channel_map[this.channels][1];
        var index_delta = end_index - start_index;

        //this.audioIndex = ((this.audioIndex + 1 - (start_index) % index_delta) + start_index;
        this.audioIndex = (((this.audioIndex - start_index) + 1) % (index_delta + 1)) + start_index;

        console.log(this.audioIndex)
    }
  }



var _2left = new Audio('audio/2left.m4a')
var _2right = new Audio('audio/2right.m4a')

var _3left = new Audio('audio/3left.m4a')
var _3center = new Audio('audio/3center.m4a')
var _3right = new Audio('audio/3right.m4a')

var _5left = new Audio('audio/5left.m4a')
var _5center = new Audio('audio/5center.m4a')
var _5right = new Audio('audio/5right.m4a')
var _5backright = new Audio('audio/5backright.m4a')
var _5backleft = new Audio('audio/5backleft.m4a')

// var _7left = new Audio('audio/7left.m4a')
// var _7center = new Audio('audio/7center.m4a')
// var _7right = new Audio('audio/7right.m4a')
// var _7surroundright = new Audio('audio/7surroundright.m4a')
// var _7backright = new Audio('audio/7backright.m4a')
// var _7backleft = new Audio('audio/7backleft.m4a')
// var _7surroundleft = new Audio('audio/7surroundleft.m4a')

//audio_files = [_2left, _2right, _3left, _3center, _3right, _5left, _5center, _5right, _5backright, _5backleft, _7left, _7center, _7right, _7surroundright, _7backright, _7backleft, _7surroundleft]

audio_files = [_2left, _2right, _3left, _3center, _3right, _5left, _5center, _5right, _5backright, _5backleft]
var myPlayer = new Player(audio_files);


function playClicked(type, channels) {
    var button = document.getElementById(type + "Button" + channels);
    button.classList.toggle('buttonPlaying');
    if (myPlayer.playing){
        myPlayer.stop()
        if (myPlayer.mode != type || myPlayer.channels != channels){
            var otherButton = document.getElementById(myPlayer.mode + "Button" + myPlayer.channels);
            otherButton.classList.toggle('buttonPlaying');
            myPlayer.mode = type
            myPlayer.setchannels(channels)
            myPlayer.play()
        }
    } else {
        myPlayer.mode = type
        myPlayer.setchannels(channels)
        myPlayer.play();
    }

}
