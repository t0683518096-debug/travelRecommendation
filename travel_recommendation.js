/**
 * Effectue la recherche selon la recommandation fournie sur le moteur de recherche selon certains mots clefs
 */
function recommandations() {
    const searchItem=document.getElementById("searchInput").value.toLowerCase();  // mot clef
    if (searchItem) {   // mot clef non vide
        console.log(searchItem);

        resultZone=document.getElementById("result");       // Zone html pour afficher le résultat de la recherche

        fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.table(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Défini les résultats selon les mots clefs proposés
        const section="";
        switch(searchItem) {
            case "beach", "beaches", "plage", "plages":
                console.log("Plages");
                section="beaches";
                break;
            case "country", "countries", "pays":
                console.log("Pays");
                section="countries";
                break;
            case "temple", "temples":
                console.log("Temples");
                section="temples";
                break;
            default:
                console.log(`Mot-clef ${searchItem} inconnu`);
        }
    }
  }


document.getElementById("btnSearch").addEventListener("click",recommandations);
