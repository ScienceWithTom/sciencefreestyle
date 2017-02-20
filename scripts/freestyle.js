const sounds = [
    '1. no games 165 prod by Chase Moore',
    'advancement',
    'bob prod by chase moore 167 1',
    'CAME TO ROCK',
    'vienna173 prod. by chase moore',
];
const countdown = 5000;
const wordTimer = 7000;

let audio = new Audio();
let timer = new Timer(countdown, document.getElementById('countdown'), [], wordTimer);

let startFreestyle = (topic) => {
    $('#menu').animate({
        top: 2000
    }, 400, () => {
        $('.exit').show();
        $('.countdown-container').css('display', 'flex');

        audio.src = `sounds/${sounds[Math.floor(Math.random() * sounds.length)]}.mp3`;
        audio.load();
        audio.loop = true;
        audio.play();

        $.get(`data/${topic}.csv`)
            .done((csv) => {
                let words = [];
                try {
                    words = $.csv.toArrays(csv, { separator: ',', delimiter: '"', startIndex: 2});
                } catch (error) {
                    console.error(error);
                    // TODO display error
                    stopFreestyle();
                }

                timer.setWords(words);
                timer.start(() => {
                    $('.countdown-container').hide();
                });
            })
            .fail(() => {
                console.error(`Error while loading the CSV`);
                // TODO display error
                stopFreestyle();
            });
    });
};

let stopFreestyle = () => {
    audio.pause(); 
    timer.reset();

    $('.countdown-container').hide();
    $('.exit').hide();
    $('#menu').animate({
        top: 0
    }, 400);
};