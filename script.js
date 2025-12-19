// Effet de machine à écrire
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    // Index actuel du mot
    const current = this.wordIndex % this.words.length;
    // Récupérer le texte complet du mot actuel
    const fullTxt = this.words[current];

    // Vérifier si effacement
    if(this.isDeleting) {
        // Enlever un caractère
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Ajouter un caractère
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insérer dans l'élément HTML
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Vitesse de frappe initiale
    let typeSpeed = 100;

    if(this.isDeleting) {
        typeSpeed /= 2; // Plus rapide quand on efface
    }

    // Si le mot est complet
    if(!this.isDeleting && this.txt === fullTxt) {
        // Faire une pause à la fin
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500; // Pause avant de commencer le nouveau mot
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Démarrer le TypeWriter
    new TypeWriter(txtElement, words, wait);
}
