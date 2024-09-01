const url = './assets/conteudo.json';

function encontrarDestino() {
    const input = document.getElementById('input-destino').value.toLowerCase();
    
    // Verifica se o input é uma cidade ou uma busca por 'beach' ou 'temple'
    if (input === 'beach') {
        mostrarLocaisPorTipo('Beach');
    } else if (input === 'temple') {
        mostrarLocaisPorTipo('Temple');
    } else {
        mostrarCidade(input);
    }
}

function mostrarCidade(cidadeInput) {
    fetch(url)
        .then(response => response.json())
        .then(dado => {
            const destino = dado.destinations.find(dest => dest.city.toLowerCase() === cidadeInput);

            if (destino) {
                document.getElementById('conteudo').innerHTML = `
                    <img id="imagemPrincipal" src='./assets/${destino.categories[0].places[0].image_url}'>
                    <p class='fundo-branco'>${destino.description}</p>`;
            } else {
                document.getElementById('conteudo').innerHTML = '<p class="fundo-branco">Destino não encontrado.</p>';
            }
        })
        .catch(e => {
            alert('Erro ao buscar o destino');
        });
}

function mostrarLocaisPorTipo(tipo) {
    fetch(url)
        .then(response => response.json())
        .then(dado => {
            let conteudoHtml = '';

            dado.destinations.forEach(dest => {
                dest.categories.forEach(category => {
                    if (category.type.toLowerCase() === tipo.toLowerCase()) {
                        category.places.forEach(place => {
                            conteudoHtml += `
                                <div class='place-item'>
                                    <img src='./assets/${place.image_url}' alt='${place.name}'>
                                    <p class="fundo-branco">${place.name}</p>
                                    <p class="fundo-branco">${place.description}</p>
                                </div>`;
                        });
                    }
                });
            });

            if (conteudoHtml) {
                document.getElementById('conteudo').innerHTML = conteudoHtml;
            } else {
                document.getElementById('conteudo').innerHTML = `<p class="fundo-branco">Nenhum ${tipo.toLowerCase()} encontrado.</p>`;
            }
        })
        .catch(e => {
            alert(`Erro ao buscar os ${tipo.toLowerCase()}s`);
        });
}

document.getElementById('buscar-destino').addEventListener('click', encontrarDestino);
document.getElementById('limpar-destino').addEventListener('click', clear);

function clear() {
    document.getElementById('input-destino').value = '';
    document.getElementById('conteudo').innerHTML = '';
}
