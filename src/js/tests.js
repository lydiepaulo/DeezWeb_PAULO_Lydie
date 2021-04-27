'use strict';
/* 
function searchSongs() {
    let results = document.getElementById("results");
    if (results.style.display === "block") {
        results.style.display = "none";
    } 
    else {
        results.style.display = "block";
        window.fetch("https://api.deezer.com/search?q=${search-bar}")
            .then(response => response.json())
            .then(result => {
                // 2. créer une "card"
                console.log(result.albums.data.cover_big);

                let cover_big = '';
                for (let i = 0; i < result.length; i++) {
                    this.cover_big = this.result;
                    console.log(this.cover_big);
                }

                // 3. remplir "card" : a. cover
                //3. b. title
                //3. c. artist
                //3. d. album
                //3. e. duration

                //const cover = result.data[0].album.cover_big;
            })
            .catch(err => {
                alert("La recherche n'a pas abouti !"); //gestion des erreurs
            });
    }
}
 */

document.querySelector("#search-button")
.addEventListener("click", () => {
    window.fetch("https://api.deezer.com/chart") //rendre le lien dynamique
    .then(response => response.json())
    .then(result => {
        console.log(result);
        displayCards(result.albums.data);
    })
    .catch(err => {
    window.alert("La recherche n'a pas abouti !"); //si pas de résultat, gestion des erreurs
    });
});

//AVOIR L'URL DES PAGES ALBUM
const $ctnr = document.querySelector("#albums-list");

const displayCards = albums => {
    albums.forEach(album => {
        /* $ctnr.HTML += `
        <li>
            <a href="pages/album.html?id=${album.id}">${album.title}</a> / ${album.artist.name}
        </li>
        ` */
        const $li = document.createElement("li");
        const $buttonIdAlbum = document.createElement("button");
        $buttonIdAlbum.onclick = () => {
            const storedIds = window.localStorage.getItem("deezWeb_album_id"); //on vérifie s'il y a déjà des infos affichées
            console.log(storedIds[1]);

            window.localStorage.setItem("deezWeb_album_id", JSON.stringify([album.id])); //on fait un tableau qui stocke dans le localstorage les id sur lesquels je clique
            location.href = `pages/album.html?id=${album.id}`;
        };
        $buttonIdAlbum.innerHTML = `${album.artist.name}`;
        $li.appendChild($buttonIdAlbum);
        $ctnr.appendChild($li);
    });
}










