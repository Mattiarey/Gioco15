mosse = 0
pausa = false
function randomizzare(a) {
    pausa = true
    var stringa = "img1";

    //array con tutti gli oggetti delle immagini
    const immagini = document.getElementsByTagName("img");

    for (var nomeS = [], i = 0; i < 16; ++i) { nomeS[i] = i; }
    nomeS = mischia(nomeS)

    //for per prendere tutti i valori di imgN, perchè non mettere la parte letterale era troppo facile
    for (i = 1; i <= immagini.length; i++) {
        if (stringa.length == 4) {
            stringa = stringa.substring(0, stringa.length - 1);
            stringa += i;
        } else {
            stringa = stringa.slice(0, -2)
            stringa += i;
        }
        var img_name = "./images/" + nomeS[i - 1] + ".gif"
        document.getElementById(stringa).src = img_name
    }
    mosse = 0

    //resettare il tutto
    if (a.id == "id_reset") {
        minuti = 0
        secondi = 0
        mosse = "0"
        parti()
        document.getElementById("ora").innerHTML = "00:00"
        document.getElementById("id_visualizzaMosse").value = "Mosse: 0"
        pausa = true
    }
    else parti()

    //in css non si poteva fare
    if (a.id == "id_bottoneMischia")
        a.style.display = "none"

}

//generatore di numeri casuali
function mischia(array) {
    var a, b, c = array.length;
    while (--c) {
        b = Math.floor(Math.random() * (c + 1));
        a = array[b];
        array[b] = array[c];
        array[c] = a;
    }
    return array;
}

//check delle quattro direzioni
function premi(a) {
    if (pausa) {
        idpm = a.id.slice(3, 5)
        idsrc = a.src;

        //togliendo tutto tranne N.gif
        filename = idsrc.replace(/^.*[\\\/]/, '')
        if (filename == "0.gif") {
            return
        }
        if (bordisu(idpm)) {
            sopra = "img" + String(idpm - 4)
            if (confronto(document.getElementById(sopra).src))
                Scambio(a, document.getElementById(sopra))
        }

        if (bordigiu(idpm)) {
            sotto = "img" + String(parseInt(idpm) + 4)
            if (confronto(document.getElementById(sotto).src))
                Scambio(a, document.getElementById(sotto))
        }

        if (bordisinistra(idpm)) {
            sinistra = "img" + String(idpm - 1)
            if (confronto(document.getElementById(sinistra).src))
                Scambio(a, document.getElementById(sinistra))
        }

        if (bordidestra(idpm)) {
            destra = "img" + String(parseInt(idpm) + 1)
            if (confronto(document.getElementById(destra).src))
                Scambio(a, document.getElementById(destra))
        }
        document.getElementById("id_visualizzaMosse").value = "Mosse: " + mosse
        controllone()
    }
}
function Scambio(posto1, posto2) {
    temp = posto2.src
    posto2.src = posto1.src
    posto1.src = temp
    mosse++
}

//controllo se la casella selezionata è quella vuota
function confronto(a) {
    filename = a.replace(/^.*[\\\/]/, '')
    if (filename == "0.gif") {
        return true
    }
    return false
}

//serie di controlli bruttissima
function bordisu(a) {
    if (a >= 1 && a <= 4) {
        return false
    }
    return true
}
function bordigiu(a) {
    if (a >= 13 && a <= 16) {
        return false
    }
    return true
}
function bordisinistra(a) {
    if (a == 1 || a == 5 || a == 9 || a == 13) {
        return false
    }
    return true
}
function bordidestra(a) {
    if (a == 4 || a == 8 || a == 12 || a == 16) {
        return false
    }
    return true
}

//debug veloce della vittoria (h)
function condizioneBase() {
    pausa = true                           
    var stringa = "img1";
    const immagini = document.getElementsByTagName("img");
    for (var nomeS = [], i = 1; i <= 16; ++i) {
        if (nomeS[i - 1] == 15) { nomeS[i] = 0 }
        else nomeS[i] = i;
    }
    for (i = 1; i <= immagini.length; i++) {
        if (stringa.length == 4) {
            stringa = stringa.substring(0, stringa.length - 1);
            stringa += i;
        } else {
            stringa = stringa.slice(0, -2)
            stringa += i;
        }
        var img_name = "./images/" + nomeS[i] + ".gif"
        document.getElementById(stringa).src = img_name
    }

    temp = document.getElementById("img16").src
    document.getElementById("img16").src = document.getElementById("img15").src
    document.getElementById("img15").src = temp
}

//controllo vittoria
function controllone() {
    var stringa = "img1";
    const immagini = document.getElementsByTagName("img");
    for (var nomeS = [], i = 1; i <= 16; ++i) {
        if (nomeS[i - 1] == 15) { nomeS[i] = 0 }
        else nomeS[i] = i;
    }
    vittoria = false

    //quello che fa questo ciclo è controllare se l'id corrisponde all'src
    for (i = 1; i <= immagini.length; i++) {
        if (stringa.length == 4) {
            stringa = stringa.substring(0, stringa.length - 1);
            stringa += i;
        } else {
            stringa = stringa.slice(0, -2)
            stringa += i;
        }
        isrc = immagini[i - 1].src

        imgsrc = isrc.replace(/^.*[\\\/]/, '')
        imgsrc = imgsrc.split(".")

        capendo = immagini[i - 1].id
        capendo = capendo.slice(3)

        if (capendo == imgsrc[0] || imgsrc[0] == 0) { vittoria = true }
        else { vittoria = false; return }
    }
    if (vittoria) {
        alert("Hai vinto!")
        parti()
        pausa = false
        document.getElementById("id_reset").disabled = false
    }
}

//variabili orologio
let minuti = 0
let secondi = 0
let mostraMinuti
let mostraSecondi

intervallo = null
stato = false


function parti() {
    if (stato == false) {

        //ogni 1000 millisecondi chiama la funzione orologio
        intervallo = window.setInterval(orologio, 1000)
        stato = true
        pausa = true
        document.getElementById("id_pausa").value = "Pausa"
    }
    else {

        //ferma il richiamo della funzione orologio
        window.clearInterval(intervallo)
        stato = false
        pausa = false
        document.getElementById("id_pausa").value = "riprendi"
    }
}
function orologio() {
    secondi++

    //cambio dei secondi a minuti carino
    if (secondi / 60 == 1) {
        secondi = 0
        minuti++
    }
    if (secondi < 10) {
        mostraSecondi = "0" + secondi.toString()
    }
    else {
        mostraSecondi = secondi
    }
    if (minuti < 10) {
        mostraMinuti = "0" + minuti.toString()
    }
    else {
        mostraMinuti = minuti
    }

    document.getElementById("ora").innerHTML = mostraMinuti + ":" + mostraSecondi
}   

//quando si preme h chiama la funzione 
//da notare la bellissima condizione freccia
document.addEventListener('keydown', (event) => {
    var name = event.key
    if (name == "h") {
        condizioneBase()
    }
}, false);
