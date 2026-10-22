function recommandations() {
    fetch('./travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        console.table(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  recommandations();