function showPopup(popup) {
    sessionParameters.tadaAudio.play();
    
    let template = document.querySelector(`.${popup}-popup`).content.cloneNode(true);
    document.body.appendChild(template);
} 