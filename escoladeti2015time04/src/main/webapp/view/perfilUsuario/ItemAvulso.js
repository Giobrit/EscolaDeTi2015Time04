function ItemAvulso() {

    this.usuario = {};
    this.itemAcesso = {};
    this.tipoItemAvulso = "";
    
    this.defineTipoItemAvulso = function () {
        // TODO: tirar o aleatorio
        if (this.itemAcesso % 2 === 0) {
            this.tipoItemAvulso = "PERMISSAO";
        } else {
            this.tipoItemAvulso = "RESTRICAO";
        }
    } 
}