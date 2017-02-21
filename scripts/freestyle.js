const sounds = [
    '1. no games 165 prod by Chase Moore',
    'advancement',
    'bob prod by chase moore 167 1',
    'CAME TO ROCK',
    'vienna173 prod. by chase moore',
];
const countdown = 5000;
const wordTimer = 7000;

let player = document.getElementById('player');
let timer = new Timer(countdown, document.getElementById('countdown'), [], wordTimer);

let startFreestyle = (topic) => {
    $('#menuWrapper').animate({
        top: '100%'
    }, 400, () => {
        $('.exit').show();
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
    player.pause(); 
    timer.reset();

    $('.countdown-container').hide();
    $('.exit').hide();
    $('#menuWrapper').animate({
        top: 0
    }, 400);
};

$(".topic").click(function(e) {
    let topicName = $(e.currentTarget).data('name')
    console.log(topicName);

    if (topicName) {
        player.src = `sounds/${sounds[Math.floor(Math.random() * sounds.length)]}.mp3`;
        player.play(); // Play the empty element to get control
        startFreestyle(topicName);
    }
});
