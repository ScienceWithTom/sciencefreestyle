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
        };
    }
    
    start(callback) {
        let self = this;
        let start = null;
        this.running = true;
        let remainingSeconds = this.els.seconds.textContent = this.duration / 1000;
        
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
                self.timeout = setTimeout(() => { self.startWords(); }, 1000);
            }
        };
        
        self.frameReq = window.requestAnimationFrame(draw);
    }

    startWords() {
        // Reset CSS animation
        this.element.classList.remove('countdown--ended');
        void this.element.offsetWidth;
        this.element.classList.add('countdown--ended');

        // Update word
        let newWord;
        do {
            newWord = this.words[Math.floor(Math.random() * this.words.length)];
        } while (newWord === this.els.seconds.textContent);
        this.els.seconds.textContent = newWord;

        // timer for next word
        this.timeout = setTimeout(() => { this.startWords(); }, this.wordTimer);
    }
    
    reset() {
        this.running = false;
        window.cancelAnimationFrame(this.frameReq);
        this.els.seconds.textContent = this.duration / 1000;
        this.els.ticker.style.height = null;
        this.element.classList.remove('countdown--ended');
    }
    
    setDuration(duration) {
        this.duration = duration;
        this.els.seconds.textContent = this.duration / 1000;
    }
}