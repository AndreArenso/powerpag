// Funções de interatividade básica
document.addEventListener('DOMContentLoaded', function() {
    // Configurações iniciais
    console.log('Site carregado!');
    configurarFormularios();
});

// Configura os eventos dos formulários
function configurarFormularios() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validarFormulario(this)) {
                e.preventDefault();
            }
        });
    });
}

// Função para exibir mensagens
function exibirMensagem(tipo, mensagem, elemento) {
    const div = document.createElement('div');
    div.className = `mensagem ${tipo}`;
    div.textContent = mensagem;
    
    // Remove mensagens anteriores
    const mensagensAnteriores = elemento.querySelector('.mensagem');
    if (mensagensAnteriores) {
        mensagensAnteriores.remove();
    }
    
    elemento.insertBefore(div, elemento.firstChild);
}

// Função para validação de formulários
function validarFormulario(form) {
    let valido = true;
    const campos = form.querySelectorAll('input, textarea, select');
    
    campos.forEach(campo => {
        // Limpa erros anteriores
        campo.classList.remove('erro');
        
        // Validação de campos obrigatórios
        if (campo.required && !campo.value.trim()) {
            exibirMensagem('erro', `O campo ${campo.name} é obrigatório.`, campo.parentElement);
            campo.classList.add('erro');
            valido = false;
        }
        
        // Validação de e-mail
        if (campo.type === 'email' && campo.value.trim()) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(campo.value)) {
                exibirMensagem('erro', 'Por favor, insira um e-mail válido.', campo.parentElement);
                campo.classList.add('erro');
                valido = false;
            }
        }
        
        // Validação de arquivo (currículo)
        if (campo.type === 'file' && campo.required) {
            const extensoesPermitidas = ['pdf', 'doc', 'docx'];
            const extensao = campo.value.split('.').pop().toLowerCase();
            
            if (!extensoesPermitidas.includes(extensao)) {
                exibirMensagem('erro', 'Por favor, envie um arquivo PDF ou Word.', campo.parentElement);
                campo.classList.add('erro');
                valido = false;
            }
        }
    });
    
    if (valido) {
        exibirMensagem('sucesso', 'Formulário enviado com sucesso!', form);
    }
    
    return valido;
}
