/**
 * Ajoute un résultat dans la page HTML - mise en page
 */
function ajouteObjetHTML(objet) {
    const resultZone=document.getElementById("result");       // Zone html pour afficher le résultat de la recherche
    console.log(objet.id);
    console.log(objet.name);
    console.log(objet.imageUrl);
    console.log(objet.description);

    const blocResultat = document.createElement("div");
    blocResultat.classList="grille-item";
    const image = document.createElement("img");
    image.src=objet.imageUrl;
    image.alt=objet.description;
    image.style="width: 93vw;"
    blocResultat.appendChild(image);
    const p = document.createElement("p");
    const fuseauHoraire=createTimeZone(objet.name);
    p.innerText=objet.name+affichageHeure(fuseauHoraire)+" - "+objet.description;
    const blocHoraire=document.getElementById("heureLocale");
    blocHoraire.innerText="font-size:10px";
    blocResultat.appendChild(p);
    resultZone.appendChild(blocResultat);
}

/**
 * Création du timeZone à partir du nom de la ville et du pays
 */
function createTimeZone(nomDuLieu) {
    const position=nomDuLieu.indexOf(", ");
    console.log("position = " + position);
    const continent = nomDuLieu.slice(position+1).trim()
    console.log("continent = " + continent);
    const pays = nomDuLieu.slice(0,position).trim()
    console.log("pays = " + pays);

    const fuseauHoraire=continent+"/"+pays;
    console.log("fuseauHoraire = " + fuseauHoraire);
    return fuseauHoraire
}
/**
 * Effectue la recherche selon la recommandation fournie sur le moteur de recherche selon certains mots clefs
 */
function recommandations() {
    const searchItem=document.getElementById("searchInput").value.toLowerCase();  // mot clef
    if (searchItem) {   // mot clef non vide
        console.log(searchItem);

        let dataJSON

        fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(dataJSON => {
            console.table(dataJSON);
            // Défini les résultats selon les mots clefs proposés
            if(searchItem.includes("beach")) {
                document.getElementById("result").innerHTML="";       // Vide la zone de résultat html pour afficher le résultat de la recherche
                dataJSON.beaches.forEach(beach => {
                    ajouteObjetHTML(beach);
                });
            }else if(searchItem.includes("temple")) {
                document.getElementById("result").innerHTML="";       // Vide la zone de résultat html pour afficher le résultat de la recherche
                dataJSON.temples.forEach(temple => {
                    ajouteObjetHTML(temple);
                });
            }else if(searchItem.includes("countr")) {
                document.getElementById("result").innerHTML="";       // Vide la zone de résultat html pour afficher le résultat de la recherche
                dataJSON.countries.forEach(country => {
                    console.log(country.name);
                    country.cities.forEach(city => {
                        ajouteObjetHTML(city);
                    });      
                });
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

function affichageHeure(zoneGeo) {
    const options = { timeZone: zoneGeo, hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
	const horaire = new Date().toLocaleTimeString('fr-fr', options);
	console.log("Current time :", horaire);
    return " (Heure locale : "+ horaire +")"
}

function reset() {
    const searchInput=document.getElementById("searchInput");  // champ de recherche
    searchInput.value="";
}

document.getElementById("btnSearch").addEventListener("click",recommandations);
document.getElementById("btnReset").addEventListener("click",reset);
document.getElementById("heureLocale").textContent = affichageHeure('Europe/Paris');    // Afficher l'heure locale sur la page d'accueil

