const sounds = [
    '1. no games 165 prod by Chase Moore',
    'advancement',
    'bob prod by chase moore 167 1',
    'CAME TO ROCK',
    'vienna173 prod. by chase moore',
];
const countdown = 5000;
const wordTimer = 7000;
const words = [
    'Air',
    'Air Mass',
    'Altitude',
    'Asteroid',
    'Atsmosphere',
    'Axis',
    'CO2',
    'Catastrophic',
    'Climate',
    'Climate Change',
    'Cloud',
    'Complexity',
    'Condensation',
    'continent',
    'Coriolois',
    'Crystallization',
    'Cycle',
    'Dam',
    'Density',
    'Drought',
    'Earth',
]

let audio;
let timer;

let startFreestyle = (topic) => {
    $('#menu').animate({
        top: 2000
    }, 400, () => {
        $('.exit').show();
        $('.countdown-container').css('display', 'flex');

        audio = new Audio(`sounds/${sounds[Math.floor(Math.random() * sounds.length)]}.mp3`);
        audio.loop = true;
        audio.play();

        timer = new Timer(countdown, document.getElementById('countdown'), words, wordTimer);
        timer.start(() => {
            $('.countdown-container').hide();
        });
    });
};

let stopFreestyle = () => {
    audio.pause(); 
    audio = null;
    timer.reset();

    $('.countdown-container').hide();
    $('.exit').hide();
    $('#menu').animate({
        top: 0
    }, 400);
};