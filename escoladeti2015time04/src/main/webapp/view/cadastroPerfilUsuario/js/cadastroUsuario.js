
	
function  OnFocusOutForm(event){
	senha = document.cadastroUsuario.senha.value
	confirmarSenha = document.cadastroUsuario.confirmarSenha.value

	if (senha.length < 6){
		alert("Senha muito curta")		
	}else if (senha != confirmarSenha) {
		alert("Senhas diferentes")
	}
};

	
	
		
