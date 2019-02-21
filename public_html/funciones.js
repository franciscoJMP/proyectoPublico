var aciertos = 0;
window.onload = agregarAccion;
function agregarAccion() {
    var tabla = document.getElementById("puzzle");
    añadirAtributosTD(tabla);
    añadirAtributosImagenes(obtenerImagenes());

   



}
function añadirAtributosImagenes(imagenes) {
    var divisiones = document.getElementById("divisiones");
    for (var i = 0; i < imagenes.length; i++) {

        divisiones.appendChild(imagenes[i]);
    }
}
function añadirAtributosTD(tabla) {

    for (var i = 0; i < 4; i++) {
        var tr = document.createElement("tr");
        tabla.appendChild(tr);
    }
    var trs = tabla.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
        for (var j = 0; j < 3; j++) {
            var td = document.createElement("td");

            trs[i].appendChild(td);
        }
    }

    td = tabla.getElementsByTagName("td");
    var id = td.length;
    for (var i = 0; i < td.length; i++) {
        td[i].id = "tdrag" + id;
        td[i].addEventListener("drop", drop);
        td[i].setAttribute("draggable", "true");
        td[i].addEventListener("dragover", allowDrop);
        id--;

    }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

    ev.preventDefault();
    var idtabla, idimagen, img;
    if (!this.hasChildNodes()) {

        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        if (this.id.length == 7 && data.length == 9) {
            idtabla = this.id.toString().substr(-2);
            idimagen = data.toString().substr(-2);
        } else {
            idtabla = this.id.toString().substr(-1);
            idimagen = data.toString().substr(-1);
        }

        if (idtabla == idimagen) {
            aciertos++;
            this.style.border = "2px solid green";
            img = document.getElementById(data);
            img.setAttribute("draggable", "false");
        }
    }
    var div = document.getElementById("divisiones");
    var img = div.getElementsByTagName("img");
    for (var i = 0; i < img.length; i++) {
        if (img[i].src == ev.dataTransfer.getData("text")) {
            img[i].remove();
        }
    }
    comprobarAciertos();
    comprobarTabla();

}
function obtenerImagenes() {
    var cadena = "divisiones/"
    var img;
    var imagenes = [];
    for (var i = 1; i < 13; i++) {
        img = document.createElement("img");
        img.src = cadena + i + ".jpg"
        img.id = "imgdrag" + i;
        img.setAttribute("draggable", "true");
        img.addEventListener("dragstart", drag);
        imagenes.push(img);
    }
    return mezclarArray(imagenes);
}
function mezclarArray(imagenes) {
    var i, j, temp;
    for (i = imagenes.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = imagenes[i];
        imagenes[i] = imagenes[j];
        imagenes[j] = temp;
    }
    return imagenes;
}
function comprobarAciertos() {

    var reseteo = document.getElementById("reseteo");
   
    if (aciertos == 12) {
        alert("Has ganado");
       

    }
    reseteo.addEventListener("click", function () {
        location.reload();
    });
}
function comprobarTabla(){
    var comprobar=0;
    var td=document.getElementsByTagName("td");
    for(var i=0;i<td.length;i++){
        if(td[i].hasChildNodes()){
            comprobar++;
        }
    }
    if(comprobar==12){
        alert("Has perdido, pulsa el boton para resetear");
    }
}

