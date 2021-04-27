'use strict';
let searchBar = document.querySelector('#search-bar'); //on récupère la valeur de search-bar
let searchMode = document.querySelector('#dw-select'); //on récupère la valeur de dw-select
let cardsList = document.querySelector("#cards-list");
let resH2 = document.querySelector("#results h2");
let searchError = document.querySelector('#search-error');

function secondsToHms(duration) {
    duration = Number(duration);

    let min = Math.floor(duration % 3600 / 60);
    let sec = Math.floor(duration % 3600 % 60);

    return ('0' + min).slice(-2) + ":" + ('0' + sec).slice(-2);
}

document.querySelector("#search-button")
    .addEventListener("click", () => {
        if (searchBar.value) {
            window.fetch(`https://api.deezer.com/search?q=${searchBar.value}&order=${searchMode.value}`) //comment lier au résultat de la recherche ?
                .then(response => response.json())
                .then(result => {
                    const resultData = result.data;
                    //création du h2 "Résultats"
                    const resDataLength = resultData.length;

                    //si recherche sans résultat ou mauvaise recherche
                    if (resDataLength == 0) {
                        resH2.innerHTML = `<h2>Aucun résultat</h2>`;
                    }
                    else {
                        //afficher nombre de résultats
                        if (resDataLength < 2) {
                            resH2.innerHTML = `<h2>${resDataLength} Résultat</h2>`;
                        }
                        else {
                            resH2.innerHTML = `<h2>${resDataLength} Résultats</h2>`;
                        }
                    }

                    document.querySelector('#results').insertBefore(resH2, cardsList);

                    //création des cartes pour chaque résultat
                    cardsList.innerHTML = '';
                    searchError.innerHTML = '';

                    for (let i = 0; i < resDataLength; i++) {
                        let newCard = document.createElement("div");
                        let newCardLinks = document.createElement("div");
                        let newFigure = document.createElement("figure");
                        let newFigureCover = document.createElement("img");
                        newFigureCover.setAttribute("src", resultData[i].album.cover_big);
                        let newFigCaption = document.createElement("figcaption");

                        cardsList.appendChild(newCard); //on crée la nouvelle card dans #cards-list
                        newCard.appendChild(newCardLinks); //on crée div parent des liens dans la card
                        newCard.appendChild(newFigure); //on crée figure dans la card
                        newFigure.appendChild(newFigureCover); //on ajoute l'image de l'album dans figure
                        newFigure.appendChild(newFigCaption); //on ajoute figcaption dans figure

                        newCardLinks.innerHTML += `
                            <a href="pages/track.html?id=${resultData[i].id}"></a>
                        `;

                        const $favoriteTrack = document.createElement('button');

                        $favoriteTrack.onclick = () => {
                            $favoriteTrack.style.fontWeight = "900";

                            //on récupère les données existantes
                            let trackList = localStorage.getItem('trackId');

                            //s'il n'y en a pas on crée un tableau
                            //s'il y en a, on transforme la string en tableau
                            trackList = trackList ? trackList.split(',') : [];

                            //ajout de nouvelles données au tableau
                            trackList.push(resultData[i].id);

                            //on enregistre dans localstorage
                            localStorage.setItem('trackId', trackList.toString());

                            /*
                            let clicked = false;
                            if (clicked == false) {
                                document.querySelector("#favorite").style.fontWeight = "400";
                            }
                            else {
                                let clicked = false;
                                localStorage.removeItem(resultData[i].id);
                            } */
                        };

                        newFigure.appendChild($favoriteTrack);

                        let durationToHms = secondsToHms(resultData[i].duration); //on passe duration en heures/minutes/secondes

                        newFigCaption.innerHTML += `
                            <h3>${resultData[i].title_short}</h3>
                            <span><a href="pages/artist.html?id=${resultData[i].artist.id}">${resultData[i].artist.name}</a> / <a href="pages/album.html?id=${resultData[i].album.id}">${resultData[i].album.title}</a></span>
                            <span>${durationToHms}</span>
                        `;
                    }
                })
            /* .catch(err => {
            window.alert("La recherche n'a pas abouti !"); //gestion des erreurs
            }); */
        }
        else {
            searchError.innerHTML = `<h2>Aucun résultat</h2>`; //erreur si recherche vide
            cardsList.innerHTML = '';
            resH2.innerHTML = '';
        }
    });
