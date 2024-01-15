// Attendre que tout le contenu de la page soit chargé avant d'exécuter les scripts
document.addEventListener("DOMContentLoaded", function () {

  // Récupération du contenu de template.html (où se trouve notre code HTML à ajouter à la page pour chaque analogie)
  fetch('template.html')
    // Méthode .then utilisée pour exécuter fonction lorsque le fetch sera résolu
    // .then prend en paramètre reponse et reponse.text() sert à extraire le texte de la réponse
    .then(response => response.text())
    // .then qui prend en paramètre le texte extrait lors de la requête précédente
    .then(template => {
      // Récupération du contenu de data.json (qui contient toutes les informations sur nos analogies)
      fetch('scripts/data.json')
        // .then prend en paramètre response et response.json sert à extraire le contenu json
        .then(response => response.json())
        // .then prend en paramètre les données json extraite via data
        .then(data => {
          // initialisation d'une variable htmlTemplate qui contiendra notre code extrait de template.html
          let htmlTemplate = '';

          // forEach qui s'applique sur data (qui contient notre contenu json) et ouverture fonction afficheAnalogie prenant en entrée resultat
          data.forEach(function afficheAnalogie(resultat, index, array) {

            // Permet d'assigner à chaque flèche sur les analogie le lien vers l'analogie suivante
            let currentDataId = resultat.id;        
            let nextDataId = null;
            if (index < array.length - 1) {
                nextDataId = '#' + array[index + 1].id;
            }else {
              nextDataId = "#form";
          }

            // création d'une const sectionHTML prenant comme valeur template (qui contient le texte de template.html)
            const sectionHTML = template
              // remplacement du {{id}} dans le template html par l'id contenu dans le json
              .replace('{{id}}', resultat.id)
              // remplacement du {{analogie}} dans le template html par l'analogie contenu dans le json
              .replace('{{analogie}}', resultat.analogie)
              // remplacement du {{valeurAnalogie}} dans le template html par la valeur contenu dans le json
              .replace('{{valeurAnalogie}}', resultat.valeurAnalogie)
              // remplacement du {{urlImage}} dans le template html par l'url de l'image contenu dans le json
              .replace('{{urlImage}}', resultat.urlImage)
              // remplacement du {{altImage}} dans le template html par l'alternative textuelle de l'image contenu dans le json
              .replace('{{altImage}}', resultat.altImage)
              // remplacement du {{explication}} dans le template html par l'explication contenu dans le json
              .replace('{{explication}}', resultat.explication)
              // remplacement du {{numéro}} dans le template html par le numéro de l'analogie contenu dans le json
              .replace('{{numéro}}', resultat.numéro)
              // remplacement du {{id}} dans le template html par l'id de la prochaine analogie contenu dans le json
              .replace('{{id}}', nextDataId);
              
              
            // Ajout de la nouvelle chaîne à la variable htmlTemplate
            htmlTemplate += sectionHTML;
          });

          // Une fois que toutes les itérations de la boucle forEach sont terminées, le contenu de notre template modifié est ajouté au document dans la div qui a la classe .liste-analogies
          document.querySelector('.liste-analogies').innerHTML = htmlTemplate;



          // Détecteur de clic sur les éléments HTML ayant la classe .image-cliquable et .cache-fenetre
          document.querySelectorAll('.image-cliquable, .cache-fenetre').forEach(function (e) {
            e.addEventListener('click', function () {
              let popup = document.querySelector('.popup');
              // Ajout de la classe 'popup-visible' à l'élément ayant la classe 'popup'
              popup.classList.toggle('popup-visible');
              // Ajout de la classe 'popup-invisible' à l'élément ayant la classe 'popup'
              popup.classList.toggle('popup-invisible');
            });
          });


          // Agrandissement de l'image au clic sur cette dernière 
          document.addEventListener('click', function (e) {
            if (e.target.classList.contains('image-cliquable')) {
              console.log(e.target);

              // Récupération de la source de l'image sur laquelle on clique
              let imageUrl = e.target.getAttribute('src');

              console.log(imageUrl);

              // Modification de la source de l'image .popup
              let modalImage = document.querySelector('.popup-img');
              modalImage.setAttribute('src', imageUrl);

              console.log(modalImage);
            }
          });
        });
    });

    

});













