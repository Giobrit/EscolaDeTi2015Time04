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

function prepararDataParaSalvar(stringData, stringHora) {
    if (stringHora instanceof Date) {
        stringHora = formatarHora(stringHora);
    }

    var stringDataAnoMesDia = converterDataBRParaAnoMesDia(stringData);

    var objetoData = new Date(stringDataAnoMesDia + " " + stringHora);

    return formatarDataParaSql(objetoData) + "T" + formatarHora(objetoData) + "-03";


}

function formatarDataParaSql(data) {
    var ano = data.getFullYear();
    var mes = completaString(data.getMonth() + 1, 2, "0");
    var dia = completaString(data.getDate(), 2, "0");
    return  ano + "-" + mes + "-" + dia;
}

function formatarHora(data) {
    var hora = completaString(data.getHours(), 2, "0");
    var minutos = completaString(data.getMinutes(), 2, "0");
    return hora + ":" + minutos + ":00";
}

function converterDataBRParaAnoMesDia(data) {
    dataSeparada = data.split("/");
    return dataSeparada[2] + "/" + dataSeparada[1] + "/" + dataSeparada[0];
}

function completaString(string, tamanho, caracter, posicaoEsquerda) {
    if (!caracter) {
        caracter = " ";
    }

    if (typeof posicaoEsquerda === 'undefined') {
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

function stringToBoolean(string) {
    return string === "Sim" ? true : false;
}

function errorPadrao(data, growl) {
    var mensagemConsole = data.mensagemConsole ? data.mensagemConsole : JSON.stringify(data);
    var mensagemUsuario = data.mensagemUsuario ? data.mensagemUsuario : JSON.stringify(data);
    console.log(mensagemConsole);
    growl.error(mensagemUsuario);
}