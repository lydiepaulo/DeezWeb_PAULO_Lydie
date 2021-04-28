'use strict';
const searchParams = location.search;
const urlSearchParams = new URLSearchParams(searchParams);
console.log(urlSearchParams.get('id'));
const trackId = urlSearchParams.get('id');
const track = document.querySelector('#track');
const trackCnt = document.querySelector('#track-ctn');

window.fetch(`https://api.deezer.com/track/${trackId}`) //on récupère les infos de l'API grâce à search-bar & dw-select
.then(response => response.json())
.then(result => {
    console.log(result);
    console.log(result.title);
    console.log(result.album.link);
    console.log(result.album.cover_big);
    console.log(result.artist.name);
    console.log(result.artist.picture_xl);
    console.log(result.artist.id);
    console.log(result.duration);
    console.log(result.release_date);
    console.log(result.preview);
    console.log(result.link);

    const trackCover = result.artist.picture_xl;
    track.style.cssText = `background-image: linear-gradient(to bottom, #151515, transparent), url('${trackCover}');`;

    const trackInfos = document.createElement('div');

    let durationToHms = secondsToHms(result.duration);

    trackCnt.appendChild(trackInfos);
    trackInfos.innerHTML = `
            <img src="${result.album.cover_big}" alt="Couverture d'album">

            <figure>
                <audio controls src="${result.preview}">
                Your browser does not support the <code>audio</code> element.
                </audio>
            </figure>

            <h2>${result.title}</h2>
            <a href="pages/artist.html?id=${result.artist.id}">${result.artist.name}</a> • <span>${durationToHms}</span>
            <p>sortie le ${result.release_date}</p>

            <a href="${result.link}" id="search-button" target="_blank">Voir sur Deezer</a>
        `;
});