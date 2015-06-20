function timestampParaHora(timestamp) {
    var data = new Date(timestamp);
    var hora = completaString(data.getHours(), 2, "0");
    var minutos = completaString(data.getMinutes(), 2, "0");

    var horaFormatada = "" + hora + ":" + minutos;

    return horaFormatada;
}

function timestampParaData(timestamp) {
    var data = new Date(timestamp);
    var dia = completaString(data.getDate(), 2, "0");
    var mes = completaString(data.getMonth() + 1, 2, "0");
    var ano = data.getFullYear();
    var dataFormatada = "" + dia + "/" + mes + "/" + ano;

    return dataFormatada;
}

function completaString(string, tamanho, caracter, posicaoEsquerda) {
    if (!caracter) {
        caracter = " ";
    }

    if (!posicaoEsquerda) {
        posicaoEsquerda = true;
    }

    var caracterRepetido = caracter.repeat(tamanho - string.toString().length);
    var stringFinal;

    if (posicaoEsquerda) {
        stringFinal = caracterRepetido + string;
    } else {
        stringFinal = string + caracterRepetido;
    }

    return stringFinal;

}

function booleanToString(boolean) {
    return boolean ? "Sim" : "Não";
}