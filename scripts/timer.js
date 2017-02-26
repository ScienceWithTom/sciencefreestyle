class Timer {
    constructor(duration, element, words, wordTimer) {
        let self = this;
        this.duration = duration;
        this.element = element;
        this.words = words;
        this.wordTimer = wordTimer;
        this.running = false;
        
        this.els = {
            ticker: document.getElementById('ticker'),
            seconds: document.getElementById('seconds'),
            definition: document.getElementById('definition'),
        };
    }
    
    start(callback) {
        let self = this;
        let start = null;
        this.running = true;
        let remainingSeconds = this.els.seconds.textContent = this.duration / 1000;
        this.els.definition.textContent = '';
        
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
                self.timeout = setTimeout(() => { self.changeWord(); }, 500);
            }
        };
        
        self.frameReq = window.requestAnimationFrame(draw);
    }

    changeWord() {
        // Reset CSS animation
        this.element.classList.remove('countdown--ended');
        void this.element.offsetWidth;
        this.element.classList.add('countdown--ended');

        // Update word until different from previous one
        let newWord;
        do {
            newWord = this.words[Math.floor(Math.random() * this.words.length)];
        } while (newWord[2] === this.els.seconds.textContent);
        this.word = newWord;
        this.els.seconds.textContent = newWord[2];
        if(this.helper) {
            this.els.definition.textContent = this.word[4];
        }

        // timer for next word
        this.timeout = setTimeout(() => { this.changeWord(); }, this.wordTimer);
    }

    toggleHelpers() {
        if (this.helper) {
            this.helper = false;
            this.els.definition.textContent = '';
        }
        else {
            this.helper = true;
            this.els.definition.textContent = this.word[4];
        }
    }

    toggleDefinition() {
        if (this.definition) {
            this.definition = false;
            this.timeout = setTimeout(() => { this.changeWord(); }, this.wordTimer);
            if (this.helper) {
                this.els.definition.textContent = this.word[4];
            }
            else {
                this.els.definition.textContent = '';
            }
        }
        else {
            this.definition = true;
            clearInterval(this.timeout);
            this.timeout = null;
            this.els.definition.textContent = `"${this.word[3]}"`;
        }
    }
    
    reset() {
        this.running = false;
        window.cancelAnimationFrame(this.frameReq);
        clearTimeout(this.timeout);
        this.els.seconds.textContent = this.duration / 1000;
        this.els.ticker.style.height = null;
        this.element.classList.remove('countdown--ended');
    }
    
    setDuration(duration) {
        this.duration = duration;
        this.els.seconds.textContent = this.duration / 1000;
    }
    
    setWords(words) {
        this.words = words;
    }
}