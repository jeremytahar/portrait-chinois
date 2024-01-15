// Attendre que tout le contenu de la page soit chargé avant d'exécuter les scripts
document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments du formulaire par leur ID ou leur classe et mis dans des const
    const analogieNomInput = document.getElementById('analogieNom');
    const analogieValeurInput = document.getElementById('analogieValeur');
    const analogieExplicationInput = document.getElementById('analogieExplication');
    const imageInput = document.getElementById('img');
    const emailInput = document.getElementById('email');
    const formBtn = document.querySelector('.form-btn');
    const formMessage = document.getElementById('formMessage');

    // Exécution du script lorsqu'il y a un clic sur le bouton de validation du formulaire
    formBtn.addEventListener('click', (event) => {
        // Récupération des valeurs des champs du formulaire
        const analogieNom = analogieNomInput.value;
        const analogieValeur = analogieValeurInput.value;
        const analogieExplication = analogieExplicationInput.value;
        const imageUrl = imageInput.value;
        const email = emailInput.value;

        // Vérifications si les champs du formulaires sont remplis ou non et si le mail et l'url sont valides
        let errorMessage = '';
        if (!email) {
            errorMessage += 'Le champ "Adresse e-mail" est requis.\n';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorMessage += 'Veuillez fournir une adresse e-mail valide.\n';
        }
        if (!analogieNom) {
            errorMessage += 'Le champ "Nom de l\'analogie" est requis.\n';
        }
        if (!analogieValeur) {
            errorMessage += 'Le champ "Valeur de l\'analogie" est requis.\n';
        }
        if (!analogieExplication) {
            errorMessage += 'Le champ "Explication" est requis.\n';
        }
        if (!imageUrl) {
            errorMessage += 'Le champ "Lien de l\'image" est requis.\n';
        } else if (!/^http(s?):\/\/.*/.test(imageUrl)) {
            errorMessage += 'Veuillez fournir un lien d\'image valide (URL se terminant par .jpg, .gif, ou .png).\n';
        }

        // S'il y a des erreurs le formulaire n'est pas envoyé et renvoi les erreurs à corriger
        if (errorMessage !== '') {
            event.preventDefault();
            formMessage.innerHTML = ' <i class="icon iconoir-xmark"></i><p>' + errorMessage.replace(/\n/g, '<br>') + '</p>';
            formMessage.classList.add("error");
        } else {
            // Création un objet avec les données du formulaire
            const inputData = {
                analogieNom: analogieNom,
                analogieValeur: analogieValeur,
                analogieExplication: analogieExplication,
                imageUrl: imageUrl,
                email: email
            };

            // Appel à la fonction pour traiter les données du formulaire et créer la section
            traiterFormulaire(inputData);

            // Affichage du message de succès
            formMessage.innerHTML = ' <i class="icon iconoir-check"></i><p>Le formulaire a été soumis avec succès !</p>';
            formMessage.classList.add("success");

            // Envoi de la requête vers l'API de Philippe Gambette via l'URL
            let url = 'http://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=tahar&courriel=' + email + '&message=Si j\'étais ' + analogieNom + ' je serais ' + analogieValeur + ' car ' + analogieExplication + ' UrlImage:' + imageUrl;
            console.log(url);

            fetch(url).then(function (response) {
                response.json().then(function (data) {
                    console.log("Réponse reçue : ");
                    console.log(data);
                })
            });
        }
    });

    // Fonction pour traiter les données du formulaire et créer la section
    function traiterFormulaire(data) {
        // Récupération du contenu de template.html (où se trouve notre code HTML à ajouter à la page pour chaque analogie)
        fetch('template.html')
            .then(response => response.text())
            .then(template => {
                // Initialisation d'une variable htmlTemplate qui contiendra notre code extrait de template.html
                let htmlTemplate = '';

                // Création de la section avec les données du formulaire
                const sectionHTML = template
                    .replace('{{analogie}}', data.analogieNom)
                    .replace('{{valeurAnalogie}}', data.analogieValeur)
                    .replace('{{urlImage}}', data.imageUrl)
                    .replace('{{explication}}', data.analogieExplication)
                    .replace('{{numéro}}', '08');

                // Ajout de la nouvelle chaîne à la variable htmlTemplate
                htmlTemplate += sectionHTML;

                // Ajoutez le contenu du template modifié au document dans la div qui a la classe .analogie-user
                document.querySelector('.analogie-user').innerHTML = htmlTemplate;
            });
    }
});
