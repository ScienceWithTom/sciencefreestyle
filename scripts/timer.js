class Timer {
    constructor(duration, element, words, wordTimer, current_level) {
        let self = this;
        this.duration = duration;
        this.element = element;
        this.words = words;
        this.wordTimer = wordTimer;
        this.running = false;
        this.current_level = current_level;
        this.index = 0;
        this.els = {
            ticker: document.getElementById('ticker'),
            seconds: document.getElementById('seconds'),
            definition: document.getElementById('definition'),
            rhymes: document.getElementById('rhymes'),
            rhymes_below: document.getElementById('rhymes_below'),
        };
        this.pastWords = [];  
    }

    start(callback) {
        let self = this;
        let start = null;
        this.running = true;
        let remainingSeconds = this.els.seconds.textContent = this.duration / 1000;
        this.els.definition.textContent = '';
        this.els.rhymes.textContent = '';
        this.helper = true; 
        this.definition = true; 

        function draw(now) {
            if (!start) start = now;
            let diff = now - start;
            let newSeconds = Math.ceil((self.duration - diff)/1000);

            if (diff <= self.duration) {
                self.els.ticker.style.height = 100 - (diff/self.duration*100) + '%';

                if (newSeconds != remainingSeconds) {
                    self.els.seconds.textContent = newSeconds;
                    remainingSeconds = newSeconds;
                }

                self.frameReq = window.requestAnimationFrame(draw);
            } else {
                self.running = false;
                self.els.ticker.style.height = '0%';
                self.els.seconds.textContent = 0;
                self.changeWord();
            }
        };
        self.frameReq = window.requestAnimationFrame(draw);
    }

    /* 
    Function: changeWord(leftArrowKey)
    Parameters: leftArrowKey
    Changes word when timer is up or left/right arrow keys are pressed
    */
    changeWord(leftArrowKey) {
        if (!this.running) {
            // Reset CSS animation
            this.element.classList.remove('countdown--ended');
            void this.element.offsetWidth;
            this.element.classList.add('countdown--ended');

            // Update word until different from previous one
            let newWord;
            if (!leftArrowKey) {
                //Add last word list to words used
                this.pastWords.push(this.word); 

                do {
                newWord = this.words[this.index];
                this.index++;
                    if (this.index === this.words.length) {
                        this.index = 0;
                    }
                } while (newWord[2] === this.els.seconds.textContent);

            
            } else {
                if (this.pastWords.length > 1) {
                    newWord = this.pastWords[this.pastWords.length-1];
                    this.pastWords.pop(); 
                } else {
                    newWord = this.word; 
                } 
            }
            this.word = newWord;
            this.els.seconds.textContent = newWord[2];
            this.els.definition.textContent = `"${this.word[3]}"`
            this.els.rhymes.textContent = this.word[4];
            clearTimeout(this.timeout);
            // timer for next word
            this.timeout = setTimeout(() => { this.changeWord(); }, this.wordTimer);
        }
    }

    /*
    Function: toggleHelpers() 
    Show/hide rhyming helper content
    */
    toggleHelpers() {
        if (this.helper) {
            this.helper = false;
            $(document.getElementsByClassName('help')[0]).css('color', 'white');
            this.els.rhymes.hidden = true;
            this.els.rhymes_below.hidden = true; 
        }
        else if (this.definition) {
            console.log(this.definition); 
            this.helper = true;
            this.els.rhymes.textContent = this.word[4];
            $(document.getElementsByClassName('help')[0]).css('color', '#FF5722');
            this.els.rhymes.hidden = !this.els.rhymes.hidden;
        } else {
            this.helper = true;
            this.els.rhymes_below.textContent = this.word[4];
            this.els.rhymes_below.hidden = !this.els.rhymes_below.hidden; 
            $(document.getElementsByClassName('help')[0]).css('color', '#FF5722');
            
        }
    }

    /* 
    Function: toggleDefinition()
    Show/Hide definition content
    */
    toggleDefinition() {
        if (this.definition) {
            this.definition = false;
            $(document.getElementsByClassName('define')[0]).css('color', 'white');
            //this.timeout = setTimeout(() => { this.changeWord(); }, this.wordTimer);
        }
        else {
            this.definition = true; 
            this.els.definition.textContent = `"${this.word[3]}"`;
            $(document.getElementsByClassName('define')[0]).css('color', '#FF5722');

            if (this.helper) {
                this.els.rhymes.hidden = !this.els.rhymes.hidden; 
                this.els.rhymes_below.hidden = !this.els.rhymes_below.hidden;
            }
        }
        this.els.definition.hidden = !this.els.definition.hidden; 
    }

    /*Function: pause()
    Pauses the timer.
    */
    pauseResume(paused) {
        if (paused) {
            this.timeout = setTimeout(() => { this.changeWord(); }, this.wordTimer);
        } else {
            clearInterval(this.timeout);
            this.timeout = null;
        }
    }

    /* 
    Function: reset()
    Resets the timer, cancelling any ongoing function calls
    */
    reset() {
        this.running = false;
        window.cancelAnimationFrame(this.frameReq);
        clearTimeout(this.timeout);
        this.els.seconds.textContent = this.duration / 1000;
        this.els.ticker.style.height = null;
        this.els.definition.textContent = ''; 
        this.els.rhymes.textContent = ''; 
        this.element.classList.remove('countdown--ended');
    }

    setDuration(duration) {
        this.duration = duration;
        this.els.seconds.textContent = this.duration / 1000;
    }

    setWords(words) {
        this.words = words;
    }

    /*
    Function: checkKey(e)
    Change words on arrow key press
    */
    checkKey(e) {
      e = e || window.event;
      if (e.keyCode=='39') {
        this.running = false;
        this.els.ticker.style.height = '0%';
        this.els.seconds.textContent = 0;
        this.changeWord();
      }
    }
}
