const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function() {
    console.log('reproduciendo');
});


player.on('pause', function(data) {
    console.log('pausado en: ' + Math.floor(data.percent * 100) + '% - ' + data.seconds + 'segundos' );
});


player.getVideoTitle().then(function(title) {
    console.log('titulo:', title);
});

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
  document.getElementById('state').innerHTML = '<i style="color:hsl(116, 68%, 61%)" class="fa-solid fa-circle-check"></i>';
}
