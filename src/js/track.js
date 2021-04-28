'use strict';
const searchParams = location.search;
const urlSearchParams = new URLSearchParams(searchParams);
console.log(urlSearchParams.get('id'));
const trackId = urlSearchParams.get('id');

window.fetch(`https://api.deezer.com/track/${trackId}`) //on récupère les infos de l'API grâce à search-bar & dw-select
.then(response => response.json())
.then(result => {
    console.log(result);



/*     const artistCover = result.picture_xl;
    artistCnt.style.backgroundImage = `url('${result.picture_xl}')`;

    let artistFans = numFormatter(result.nb_fan);

    const artistInfos = document.createElement('a');

    artistCnt.appendChild(artistInfos);
    artistInfos.innerHTML = `
            <h2>${result.name}</h2>
            <p>${result.nb_album} albums</p>
            <p>${artistFans} fans</p>
            <a href="${result.link}" id="search-button" target="_blank">Voir sur Deezer</a>
        `; */
});