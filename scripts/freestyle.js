const sounds = [
    '1. no games 165 prod by Chase Moore',
    'advancement',
    'bob prod by chase moore 167 1',
    'CAME TO ROCK',
    'vienna173 prod. by chase moore',
];
const countdownTimer = 5000;
const wordTimer = 7000;
var current_level=1;

let audioPlayer = document.getElementById('player');
let timer = new Timer(countdownTimer, document.getElementById('countdown'), [], wordTimer);

let startFreestyle = (topic) => {
    $('#menuWrapper').animate({
        top: '100%'
    }, 400, () => {
        $('.actions').show();
        $('.countdown-container').css('display', 'flex');

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
                // split words into dictionary with different levels
                console.log(words);
                let word_levels = {1:[],2:[],3:[]}
                for (let i=1; i<words.length; i++) {
                  let level=parseInt(words[i][5]);
                  console.log(level);
                  let word=words[i][2];
                  word_levels[level].push(word);
                }
                console.log(word_levels);

                timer.setWords(words);
                timer.start();
            })
            .fail(() => {
                console.error(`Error while loading the CSV`);
                // TODO display error
                stopFreestyle();
            });
    });
};

let stopFreestyle = () => {
    audioPlayer.pause();
    timer.reset();

    $('.countdown-container').hide();
    $('.actions').hide();
    $('#menuWrapper').animate({
        top: 0
    }, 400);
};

$('#countdown').click((e) => {
    timer.toggleDefinition();
});

$(".topic").click((e) => {
    let topicName = $(e.currentTarget).data('name')
    console.log(topicName);
    console.log(current_level);

    if (topicName) {
        audioPlayer.src = `sounds/${sounds[Math.floor(Math.random() * sounds.length)]}.mp3`;
        audioPlayer.play(); // Play the empty element to get control
        startFreestyle(topicName);
    }
});
