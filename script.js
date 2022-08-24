var peer = new Peer();

const localId = document.getElementById('localPeerId');
const remoteId = document.getElementById('remotePeerId');
const btn = document.getElementById('btn-call');
let localstream;
navigator.mediaDevices.getUserMedia({ video: true,})
    .then(stream => {
        localstream = stream;
      const videoE = document.getElementById("localVideo");
      videoE.srcObject = localstream;
      videoE.onloadedmetadata = () => videoE.play()
    });

peer.on("open", id => {
    localId.textContent = "Your id:     "+id;
});

btn.addEventListener('click', () => {
    const remotePeerId = remoteId.value;
    const call = peer.call(remotePeerId, localstream);
    call.on('stream', stream => {
        const remotevideo = document.createElement('video');
        document.getElementById("vedio").appendChild(remotevideo)
        remotevideo.classList.add('remoteVideo');
        remotevideo.srcObject = stream;
        remotevideo.onloadedmetadata = () => remotevideo.play();
        console.log();
    })
});

peer.on('call', call => {
    call.answer(localstream);
    call.on("stream", stream => {
        const remotevideo = document.createElement('video');
        document.getElementById("vedio").appendChild(remotevideo);
        remotevideo.classList.add('remoteVideo');
        remotevideo.srcObject = stream;
        remotevideo.onloadedmetadata = () => remotevideo.play();
    })
})