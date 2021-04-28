'use strict';
const searchParams = location.search;
const urlSearchParams = new URLSearchParams(searchParams);
console.log(urlSearchParams.get('id'));
const trackId = urlSearchParams.get('id');
const track = document.querySelector('#track');
const trackCnt = document.querySelector('#track-ctn');

//on formate la date en jj/mm/aaaa
function dateFormatter(myDate) {
    let chunks = myDate.split('-');
    let formattedDate = chunks[2] + '/' + chunks[1] + '/' + chunks[0];
    return formattedDate;
}

window.fetch(`https://api.deezer.com/track/${trackId}`) //on récupère les infos de l'API grâce à search-bar & dw-select
    .then(response => response.json())
    .then(result => {
        const trackCover = result.artist.picture_xl;
        track.style.cssText = `background-image: linear-gradient(to bottom, #151515, transparent), url('${trackCover}');`;

        const trackInfos = document.createElement('div'); //on crée une nouvelle div pour le contenu
        const durationToHms = secondsToHms(result.duration); //variable durée en minutes et secondes
        const trackRelease = dateFormatter(result.release_date); //date en jj/mm/aaaa

        //on ajoute le HTML et les variables
        trackCnt.appendChild(trackInfos);
        trackInfos.innerHTML = `
            <img src="${result.album.cover_big}" alt="Couverture d'album">

            <figure>
                <audio controls src="${result.preview}">
                Your browser does not support the <code>audio</code> element.
                </audio>
            </figure>

            <h2>${result.title}</h2>
            <div id="trackLike">
                <a href="artist.html?id=${result.artist.id}">${result.artist.name}</a> • <span>${durationToHms}</span>
            </div>
            <p>sortie le ${trackRelease}</p>

            <a href="${result.link}" id="search-button" target="_blank">Voir sur Deezer</a>
        `;

        //on s'occupe du bouton favori
        const $favoriteTrack = document.createElement('button');

        //on vérifie si certaines musiques sont en fav ou non
        let trackList = localStorage.getItem('tracksIds');
        trackList = trackList ? JSON.parse(trackList) : [];

        if (trackList.includes(trackId)) {
            $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b"; //on remplit les cœurs au clic
        }
        else {
            $favoriteTrack.style.cssText = "font-weight: 400"; //on remplit les cœurs au clic
        }

        //on fait un event au clic pour mettre des musiques en fav
        $favoriteTrack.addEventListener("click", () => {
            let track_List = localStorage.getItem('tracksIds');

            //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
            track_List = track_List ? JSON.parse(track_List) : [];

            //on vérifie si l'id est déjà dans le tableau. si oui on l'enlève | sinon on l'ajoute
            if (track_List.includes(trackId)) {
                //déjà présent : on retire + vide le cœur au clic
                track_List.splice(track_List.indexOf(trackId), 1);
                $favoriteTrack.style.cssText = "font-weight: 400";
            }
            else {
                //pas encore là : on push l'id + remplit le cœur au clic
                track_List.push(trackId);
                $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b";
            }

            localStorage.setItem('tracksIds', JSON.stringify(track_List)); //on enregistre dans localstorage
        });

        let trackLike = document.querySelector('#trackLike');
        trackLike.appendChild($favoriteTrack);

    });