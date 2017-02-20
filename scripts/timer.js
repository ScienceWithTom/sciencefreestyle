class Timer {
    constructor(duration, element, words) {
        let self = this;
        this.duration = duration;
        this.duration = duration;
        this.element = element;
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
                self.startWords()
            }
        };
        
        self.frameReq = window.requestAnimationFrame(draw);
    }

    startWords() {
        this.els.seconds.textContent = 0;
        this.element.classList.add('countdown--ended');
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