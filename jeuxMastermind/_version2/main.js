let computerColors = [];
let b = 0

function getResponse() {
    let playerColors = []
    let idInc = (b * 4) + 1

    let color1 = document.getElementById('color-select' + idInc)
    let color2 = document.getElementById('color-select' + (idInc + 1))
    let color3 = document.getElementById('color-select' + (idInc + 2))
    let color4 = document.getElementById('color-select' + (idInc + 3))

    let selectedColors1 = color1.selectedOptions;
    let selectedColors2 = color2.selectedOptions;
    let selectedColors3 = color3.selectedOptions;
    let selectedColors4 = color4.selectedOptions;

    for (let i = 0; i < selectedColors1.length; i++) {
        playerColors.push(selectedColors1[i].label)
        playerColors.push(selectedColors2[i].label)
        playerColors.push(selectedColors3[i].label)
        playerColors.push(selectedColors4[i].label)
    }


    console.log(playerColors, "getResponse")

    // Appeler la fonction de vérification avec les couleurs sélectionnées
    verifyColor(playerColors, computerColors)
    b++
}

function randomColor() {
    let colors = ['red', 'blue', 'green', 'yellow'];

    // Choisir 4 couleurs aléatoires
    while (computerColors.length < 4) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        computerColors.push(color);
    }

    // Mélanger l'ordre des couleurs
    for (let i = computerColors.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [computerColors[i], computerColors[j]] = [computerColors[j], computerColors[i]];
    }

    console.log(computerColors, "randomColor");
}

function verifyColor(playerColors, computerColors) {
    idInc = (b * 4) + 1;
    let btnId = b + 1;
    let selectId = b + 1;

    // Afficher les couleurs dans la console
    console.log(playerColors, "verifyColor playerColors");
    console.log(computerColors, "verifyColor computerColors");

    let correctColors = 0;
    let correctPositions = [];
    let wrongPositionColors = 0;

    for (let i = 0; i < computerColors.length; i++) {
        let colorSelect = document.getElementById('color-select' + (idInc + i));

        if (computerColors[i] === playerColors[i]) {
            correctColors++;
            correctPositions.push(i + 1); // Ajouter la position correcte (1-indexé)
            colorSelect.style.backgroundColor = '#90EE90'; // Bonne couleur et bonne position
        } else if (computerColors.includes(playerColors[i])) {
            wrongPositionColors++;
            colorSelect.style.backgroundColor = '#FFD580'; // Bonne couleur mais mauvaise position
        } else {
            colorSelect.style.backgroundColor = "#FFFFFF"; // Mauvaise couleur
        }
    }

    if (correctColors === computerColors.length) {
        alert("Félicitation vous avez trouvé la bonne combinaison !");
        location.reload();
    } else {
        alert(`Il y a ${correctColors} couleur(s) correcte(s) à la bonne position : ${correctPositions.join(', ')}. Et ${wrongPositionColors} couleur(s) correcte(s) mais mal positionnée(s).`);
        document.getElementById('color-select' + idInc).disabled = true;
        document.getElementById('color-select' + (idInc + 1)).disabled = true;
        document.getElementById('color-select' + (idInc + 2)).disabled = true;
        document.getElementById('color-select' + (idInc + 3)).disabled = true;
        document.getElementById("btn" + btnId).disabled = true;

        let nextSelection = document.getElementById("selection" + (selectId + 1));

        if (nextSelection) {
            nextSelection.hidden = false;
        }

        if (selectId >= 4) {
            alert(`C'est perdu, la bonne combinaison était ${computerColors}`);
            location.reload();
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    randomColor();
});