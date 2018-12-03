function criaMusica(nome, genero, link) {
    let $musica = $('<a target="_blank" class="musica"></a>');

    $musica.append($('<span class="nome-musica">' + nome + '</span>'));
    if(genero) $musica.append($('<span class="genero-musica">' + genero + '</span>'));
    $musica.attr('href', link);

    let $musicas = $('#musicas');
    $musicas.append($musica);
}

let $body = $('body');
let $main = $('main');
let playlist = JSON.parse(localStorage.getItem('playlist') || '[]');

for(musica of playlist) {
    criaMusica(musica.nome, musica.genero, musica.link);
}

function fecharJanela($janela) {
    $janela.fadeOut(250);
    setTimeout(function() { $janela.detach() }, 250);

    $main.css('opacity', '1');
    $main.css('pointer-events', 'auto');
}

function adicionarMusica() {
    let $janela = $('<div class="janela"></div>');

    $janela.append($('<h2>Adicionar música</h2>'));

    $nome = $('<input type="text" maxlength="40" placeholder="Nome">');
    $genero = $('<input type="text" maxlength="40" placeholder="Gênero">');
    $link = $('<input type="text" maxlength="40" placeholder="Link">');
    $adicionar = $('<button type="button">Adicionar</button>');
    $cancelar = $('<button type="button">Cancelar</button>');

    $janela.append($nome);
    $janela.append($genero);
    $janela.append($link);
    $janela.append($adicionar);
    $janela.append($cancelar);

    $janela.hide();
    $body.append($janela);
    $janela.fadeIn(250);

    $nome.focus();

    $main.css('opacity', '.5');
    $main.css('pointer-events', 'none');

    function adicionar() {
        let nome = $nome.val();

        if(nome) {
            let genero = $genero.val();
            let link = $link.val() || 'https://www.youtube.com/results?search_query=' + nome;

            playlist.push({ nome: nome, genero: genero, link: link });
            localStorage.setItem('playlist', JSON.stringify(playlist));

            criaMusica(nome, genero, link);

            fecharJanela($janela);
        }
    }

    $adicionar.click(adicionar);
    $janela.on('keypress', 'input', function(e) {
        if(e.which == 13) adicionar();
    });

    $cancelar.click(function() { fecharJanela($janela); });
}

let $adicionarMusica = $('#adicionar-musica');
$adicionarMusica.click(adicionarMusica);

function removerMusica() {
    let $janela = $('<div class="janela"></div>');

    $janela.append($('<h2>Remover música</h2>'));

    $nome = $('<input type="text" maxlength="40" placeholder="Nome">');
    $remover = $('<button type="button">Remover</button>');
    $cancelar = $('<button type="button">Cancelar</button>');

    $janela.append($nome);
    $janela.append($remover);
    $janela.append($cancelar);

    $janela.hide();
    $body.append($janela);
    $janela.fadeIn(250);

    $nome.focus();

    $main.css('opacity', '.5');
    $main.css('pointer-events', 'none');

    function remover() {
        let nome = $nome.val(), indice = -1;
        for(let i = 0; i < playlist.length && indice == -1; i++) {
            if(nome == playlist[i].nome) indice = i;
        }
        if(indice != -1) {
            playlist.splice(indice, 1);
            localStorage.setItem('playlist', JSON.stringify(playlist));
            fecharJanela($janela);
            $('.musica:eq(' + indice + ')').detach();
        }
    }

    $remover.click(remover);
    $nome.keypress(function(e) {
        if(e.which == 13) remover();
    });
    $cancelar.click(function() { fecharJanela($janela); });
}

let $removerMusica = $('#remover-musica');
$removerMusica.click(removerMusica);