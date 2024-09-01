const url = './assets/conteudo.json';

function encontrarDestino() {
    const cidadeInput = document.getElementById('input-destino').value.toLowerCase();

    fetch(url)
        .then(resposta => resposta.json())
        .then(dado => {
            dado.destinos.forEach(cidades => {
                if (cidades.cidade.toLowerCase() == cidadeInput) {

                    cidades.categorias.forEach(categoria => {
                        categoria.locais.forEach(local => {
                            const nomeImagem = local.imagem_url;

                            const destino = dado.destinos.find(destino => destino.cidade.toLowerCase() === cidadeInput);
                            if (destino) {
                                document.getElementById('conteudo').innerHTML = `
                                
                                <img id="imagemPrincipal" src='./assets/${nomeImagem}'>
                                <p  class='fundo-branco'>${destino.descricao}</p>`;
                            } else {
                                alert('Destino não encontrado.');
                            };
                        })
                    })
                }
            }
            );
        })
        .catch(e => {
            alert('Erro ao buscar o destino');
        });
}


let descricaoLocal = () => {
    const cidadeInput = document.getElementById('input-destino').value.toLowerCase();

    fetch(url)
        .then(resposta => resposta.json())
        .then(dado => {

        });
}

document.getElementById('buscar-destino').addEventListener('click', descricaoLocal);




/*

            dado.destinos.find(destino => {
                if(destino=='descricao'){
                    const descricaoLocal = document.getElementById('conteudo');
                    descricaoLocal.innerHTML = `<p>${destinos.descricao}</p>`;
                    alert('eba')
                    alert(descricaoLocal);
                }

                
            }
                
            
            
            
            
            
            );


*/