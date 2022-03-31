const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function() {
    console.log('reproduciendo');
});


player.on('pause', function(data) {
    let update = document.getElementById('playing');
    update.value = 'Pausado en: ' + Math.floor(data.percent * 100) + '%';
    console.log('pausado en: ' + Math.floor(data.percent * 100) + '% - ' + data.seconds + 'segundos' );
});

player.on('loaded', function(data) {
    player.getVideoEmbedCode().then(function(embedCode) {
        if(localStorage.getItem(embedCode) && localStorage.getItem(embedCode) === 'ended') ; 
        document.getElementById('state').innerHTML = '<i style="color:hsl(116, 68%, 61%)" class="fa-solid fa-circle-check"></i>';
        console.log('ended');
    }).catch(function(error) {
        console.log(error);
    });
});

player.on('timeupdate', function(data){
    let update = document.getElementById('playing');
    update.value = 'Reproduciendo: ' + Math.floor(data.percent * 100) + '%';
})

player.on('ended', ()=>{completado()})

player.on('playing', function(data){
    console.log('reproduciendo en: ' + Math.floor(data.percent * 100) + '% - ' + data.seconds + 'segundos' );
})

function playevideo(){
    player.play();
    let imp = document.getElementById('playedAt');
    player.getCurrentTime().then(segundos => imp.value = segundos);
}
function pausevideo(){
    player.pause();
    let imp = document.getElementById('pausedAt');
    player.getCurrentTime().then(segundos => imp.value = segundos);
}
function forwardvideo(time){
    player.forward(time);
}

function completado(){
    player.getVideoEmbedCode().then(function(embedCode) {
        localStorage.setItem(embedCode, 'ended'); 
    }).catch(function(error) {
        console.log(error);
    });
  document.getElementById('state').innerHTML = '<i style="color:hsl(116, 68%, 61%)" class="fa-solid fa-circle-check"></i>';
}
