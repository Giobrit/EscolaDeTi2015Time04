
function salvar(){
	senha = document.cadastroUsuario.senha.value
	confirmarSenha = document.cadastroUsuario.confirmarSenha.value

	if (senha == confirmarSenha)
		alert("Ta certo")
	else
		alert("Erooouu")
};


function  OnFocusOutForm(event){
	senha = document.cadastroUsuario.senha.value
	confirmarSenha = document.cadastroUsuario.confirmarSenha.value

	if (senha != confirmarSenha)
		alert("Senha não conferem")
}