// Attendre que tout le contenu de la page soit chargé avant d'exécuter les scripts
document.addEventListener("DOMContentLoaded", function () {

  let theme = document.querySelector('.theme');

  // Gestion de la modification de l'icône soleil / lune en haut à gauche du site
  theme.addEventListener('click', () => {
    theme.classList.toggle('iconoir-half-moon');
    theme.classList.toggle('iconoir-sun-light');
    // Ajout ou suppression de la classe light-mode lorsque l'on clique sur le soleil ou la lune
    document.querySelectorAll('.dark-mode').forEach(function (e) {
      e.classList.toggle("light-mode");
    })
  });

  // Ouverture et fermeture de la fenêtre d'information via l'icône i en haut à droite de la page et également la croix lorsque la fenêtre modale est ouverte
  document.querySelectorAll('.info-btn, .info-modal .iconoir-xmark').forEach(function (e) {
    e.addEventListener('click', function () {
      let modal = document.querySelector('.info-modal');
      modal.classList.toggle('modal-visible');
    });
  })

  // Ouverture et fermeture de la fenêtre de mentions légales via le footer et également la croix lorsque la fenêtre modale est ouverte
  document.querySelectorAll('.mentions-btn, .mentions-legales .iconoir-xmark').forEach(function (e) {
    e.addEventListener('click', function () {
      let mentionsModal = document.querySelector('.mentions-legales');
      mentionsModal.classList.toggle('modal-visible');
    });
  })

  // Gestion de la navbar qui remonte de 10px pour ne pas chevaucher le footer
  var scrollContainer = document.querySelector('main');

  scrollContainer.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    var footer = document.querySelector('footer');

    var navbarHeight = navbar.offsetHeight;
    var footerOffset = footer.offsetTop;
    var scrollPosition = scrollContainer.scrollTop + window.innerHeight;

    if (scrollPosition > footerOffset) {
      navbar.style.bottom = scrollPosition - footerOffset + 10 + 'px';
    } else {
      navbar.style.bottom = '10px';
    }
  });

});