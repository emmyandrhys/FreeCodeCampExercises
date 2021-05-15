function playDrumClick(){
    const name = this["id"];
    const audio = this.children[0];
     //const drum = document.querySelector(`circle[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    displayname.innerHTML=`<h3>Now Playing:</h3><p>${name}</p>`
    //drum.classList.add('.playing')
  }
  
  function playDrumType(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if(!audio) return;
    const key = document.querySelector(`button[datakey="${e.keyCode}"]`);
    const name = key["id"]
    audio.currentTime = 0;
    audio.play();
    displayname.innerHTML=`<h3>Now Playing:</h3><p>${name}</p>`
    //drum.classList.add('.playing')
  }
  //const drums = document.querySelectorAll('circle');
  //drums.forEach(drum=>drum.addEventListener('transitionend',drum.classList.remove('.playing')));
  const displayname = document.getElementById('display');
  window.addEventListener('keydown', playDrumType);
  //const boxes = document.querySelectorAll('.drum-pad');
  //boxes.forEach(box=>box.addEventListener('click',playDrumClick(box)));
  //boxes.forEach(box=>box.addEventListener('keydown',playDrumType(box)));
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.addEventListener('click', playDrumClick));
  