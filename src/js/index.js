'use strict';
let searchBar = document.querySelector('#search-bar'); //on récupère la valeur de search-bar
let searchMode = document.querySelector('#dw-select'); //on récupère la valeur de dw-select
let cardsList = document.querySelector("#cards-list");
let resH2 = document.querySelector("#results h2");
let searchError = document.querySelector('#search-error');

document.querySelector("#search-button")
    .addEventListener("click", () => {
        if (searchBar.value) {
            window.fetch(`https://api.deezer.com/search?q=${searchBar.value}&order=${searchMode.value}`) //comment lier au résultat de la recherche ?
                .then(response => response.json())
                .then(result => {
                    const resultData = result.data;
                    //création du h2 "Résultats"
                    const resDataLength = resultData.length;

                    //si input recherche vide, afficher "Pas de résultat"
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
                        let newCard = document.createElement("figure");
                        let newCardCover = document.createElement("img");
                        newCardCover.setAttribute("src", resultData[i].album.cover_big);
                        let newCardCaption = document.createElement("figcaption");

                        cardsList.appendChild(newCard); //on crée la nouvelle card dans #cards-list
                        newCard.appendChild(newCardCover); //on ajoute l'image de l'album
                        newCard.appendChild(newCardCaption); //on ajoute figcaption

                        newCardCaption.innerHTML += `
                            <h3>${resultData[i].title_short}</h3>
                            <span>${resultData[i].artist.name} / <a href="pages/album.html?${resultData[i].album.id}">${resultData[i].album.title}</a></span>
                            <span>${resultData[i].duration}</span>
                        `;
                    }
                })
            /* .catch(err => {
            window.alert("La recherche n'a pas abouti !"); //gestion des erreurs
            }); */
        }
        else {
            searchError.innerHTML = `<h2>Aucun résultat</h2>`;
        }
    });
