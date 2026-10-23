/**
 * Effectue la recherche selon la recommandation fournie sur le moteur de recherche selon certains mots clefs
 */
function recommandations() {
    const searchItem=document.getElementById("searchInput").value.toLowerCase();  // mot clef
    if (searchItem) {   // mot clef non vide
        console.log(searchItem);

        const resultZone=document.getElementById("result");       // Zone html pour afficher le résultat de la recherche
        const resultZoneGrid = [];
        resultZoneGrid[1]=document.getElementById("resultat1");       // Zone html pour afficher le résultat de la recherche
        resultZoneGrid[2]=document.getElementById("resultat2");

        let dataJSON

        fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(dataJSON => {
            console.table(dataJSON);
            let section=""
            // Défini les résultats selon les mots clefs proposés
            if(searchItem.includes("beach")) {
                section="beaches";
                resultZone.innerHTML="";
                dataJSON.beaches.forEach(beach => {
                    console.log(beach.id);
                    console.log(beach.name);
                    console.log(beach.imageUrl);
                    console.log(beach.description);
                    const image = document.createElement("img");
                    image.src=beach.imageUrl;
                    image.alt=beach.description;
                    image.classList="grille-item"
                    image.style="width: auto; height: auto; max-width: none;"
                    resultZone.appendChild(image);
                    const p = document.createElement("p");
                    p.innerText=beach.name+" - "+beach.description;
                    p.style="max-width: none;"
                    resultZone.appendChild(p);
                });
            }else if(searchItem.includes("temple")) {
                section="temples";
            }else if(searchItem.includes("countr")) {
                section="countries";
            }else if(dataJSON.includes(searchItem)) {
                // le mot clef a été trouvé dans les données
                console.log(`Données ${section} présente dans les données`);
            }
            console.log(`Section choisie = ${section}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }
    
  }

  function reset() {
    const searchInput=document.getElementById("searchInput");  // champ de recherche
    searchInput.value="";
  }

document.getElementById("btnSearch").addEventListener("click",recommandations);
document.getElementById("btnReset").addEventListener("click",reset);
