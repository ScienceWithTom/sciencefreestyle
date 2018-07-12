/* Sound Titles*/
const sounds = [
    '1. no games 165 prod by Chase Moore',
    'advancement',
    'bob prod by chase moore 167 1',
    'CAME TO ROCK',
    'vienna173 prod. by chase moore',
];

const countdownTimer = 5000;
const wordTimer = 7000;
var topicName = null; 
var current_level= 1;
var word_levels = {1:[],2:[],3:[]};
var index1 = 0;
var index2 = 0;

let audioPlayer = document.getElementById('player');
let timer = new Timer(countdownTimer, document.getElementById('countdown'), [], wordTimer, current_level);

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
                    console.log(words); 
                } catch (error) {
                    console.error(error);
                    stopFreestyle();
                }
                // split words into dictionary with different levels
                for (let i=1; i<words.length; i++) {
                  let level=parseInt(words[i][5]);
                  let word=words[i];
                  word_levels[level].push(word);
                }
                // randomly switch the order of words in the dictionary
                for (let i=1; i<4; i++) {
                  for (let j=0; j<word_levels[i].length; j++) {
                    var randomInt=Math.floor(Math.random() * word_levels[i].length);
                    index1=word_levels[i][j];
                    index2=word_levels[i][randomInt];
                    word_levels[i][j]=index2;
                    word_levels[i][randomInt]=index1;
                  }
                  for (let k=0; k<word_levels[i].length; k++) {
                  }
                }
                timer.setWords(word_levels[current_level]);
                timer.start();
            })
            .fail(() => {
                console.error(`Error while loading the CSV`);
                stopFreestyle();
            });
    });
};

/*Function: stopFreestyle() */ 
let stopFreestyle = () => {
    audioPlayer.pause();
    timer.reset();
    topicName = null; 

    $('.countdown-container').hide();
    $('.actions').hide();
    $("#level1").css('color', '#FF5722'); 
    $("#level3").css('color', 'white');
    $("#level3").css('color', 'white');  
    $('#menuWrapper').animate({
        top: 0
    }, 400);
    
};

let newList = (level) => {
  current_level = level;
  timer.setWords(word_levels[level]);
}
// $('#countdown').click((e) => {
//     timer.toggleDefinition();
// });

$(document).keypress((e) => {
  timer.checkKey(e);
});

$(".topic").click((e) => {
    topicName = $(e.currentTarget).data('name')

    if (topicName) {
        audioPlayer.src = `sounds/${sounds[Math.floor(Math.random() * sounds.length)]}.mp3`;
        audioPlayer.play(); // Play the empty element to get control
        startFreestyle(topicName);
    }
});

$("#level1").click((e) => {
    // let topicName = $(e.currentTarget).data('name')
    $(e.currentTarget).css('color', '#FF5722');
    $("#level2").css('color', 'white'); 
    $("#level3").css('color', 'white');  
    current_level = 1;
    timer.reset(); 
    timer = new Timer(countdownTimer, document.getElementById('countdown'), [], wordTimer, current_level);
    startFreestyle(topicName);
    console.log('idk');
});

$("#level2").click((e) => {
    $(e.currentTarget).css('color', '#FF5722');
    $("#level1").css('color', 'white'); 
    $("#level3").css('color', 'white');  
    current_level = 2;
    timer.reset(); 
    timer = new Timer(countdownTimer, document.getElementById('countdown'), [], wordTimer, current_level);
    startFreestyle(topicName);
});

$("#level3").click((e) => {
    $(e.currentTarget).css('color', '#FF5722');
    $("#level1").css('color', 'white'); 
    $("#level2").css('color', 'white');  
    current_level = 3;
    timer.reset(); 
    timer = new Timer(countdownTimer, document.getElementById('countdown'), [], wordTimer, current_level);
    startFreestyle(topicName);
});

/* KeyListener: Left and Right Arrow Keys */
window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    
    if (key == 39) {
        timer.changeWord(); 
    } else if (key == 37) {
        timer.changeWord("leftArrowKey");
    }
}
