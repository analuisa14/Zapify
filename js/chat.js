let $chat = $('#chat');
let $box = $('#box');

function criaMensagem(lado, texto) {
    let $mensagem = $('<p class="mensagem ' + lado + '"></p>').hide();
    if(lado == 'esquerda') $mensagem.html(texto);
    else $mensagem.text(texto);
    $chat.append($mensagem);
    $mensagem.show(100);
    for(let i = 0; i < 150; i++)
        setTimeout(function() { $chat.scrollTop(999999) }, i); 
}

setTimeout(function() {
    let mensagem = ['Olá!', 'Oi oi', 'Olá, Zapify a seu serviço'];
    criaMensagem('esquerda', mensagem[Math.floor(Math.random() * mensagem.length)]);
}, 250);

$box.keyup(function(e) {
    if(e.which == 13 && $box.val() != '') {
        criaMensagem('direita', $box.val());
        leMensagem($box.val());
        $box.val('');
    }
});


let local = null;

let bot = [
    {
        entrada: ['tchau', 'falou', 'flw'],
        saida: ['Tchau!', 'Falou!', 'Até mais :)'],
        continuacao: null
    },
    {
        saida: ['O que deseja escutar?<br>1 - Uma música da sua playlist<br>2 - Uma música nova<br>3 - Nada'],
        continuacao: [
            {
                entrada: ['1', 'um'],
                saida: ['Qual gênero quer escutar?', 'Escolha um gênero para ouvir!', 'Me fale um gênero que você queira escutar'],
                continuacao: 'escolher-musica'
            },
            {
                entrada: ['2', 'dois'],
                saida: ['Qual gênero quer escutar?', 'Escolha um gênero para ouvir!'],
                continuacao: 'escolher-musica-nova'
            },
            {
                entrada: ['3', 'tres', 'três', 'nada', 'nadinha'],
                saida: ['Ok, até mais :)', 'Ok, tchau tchau!', 'Tchauzinho'],
                continuacao: null
            },
            {
                saida: ['Não entendi :/', '?'],
                continuacao: null
            }
        ]
    }
]
let playlistZapify;
axios.get('../playlist.json').then(function(res){
    playlistZapify = res;
});

function escolherMusica(genero) {
    genero = genero.toLowerCase();
    if(!playlist.length) criaMensagem('esquerda', 'Você não tem músicas na sua playlist<br>Adicione uma no botão +');
    else {
        let musicas = [];
        for(let i = 0; i < playlist.length; i++)
            if(playlist[i].genero == genero) musicas.push(i);
        if(!musicas.length) {
            let musica = playlist[Math.floor(Math.random() * playlist.length)];
            criaMensagem('esquerda', 'Você não tem músicas desse gênero na sua playlist<br>Mas que tal <a target="_blank" href="' + musica.link + '">' + musica.nome + '</a>?');
        } else {
            let musica = playlist[musicas[Math.floor(Math.random() * musicas.length)]];
            criaMensagem('esquerda', 'Que tal ouvir <a target="_blank" href="' + musica.link + '">' + musica.nome + '</a>?');
        }
    }
    local = null;
}

function escolherMusicaNova(genero) {
    genero = genero.toLowerCase();
    let musicas = [];
    for(let i = 0; i < playlistZapify.length; i++)
        if(playlistZapify[i].genero == genero) {
            let achado = false;
            for(let j = 0; j < playlist.length; j++) {
                if(playlistZapify[i].nome == playlist[j].nome)
                    achado = true;
            }
            if(!achado) musicas.push(i);
        }
    if(!musicas.length) {
        for(let i = 0; i < playlistZapify.length; i++) {
            let achado = false;
            for(let j = 0; j < playlist.length; j++) {
                if(playlistZapify[i].nome == playlist[j].nome)
                    achado = true;
            }
            if(!achado) musicas.push(i);
        }
        if(!musicas.length) {
            let musica = playlistZapify[Math.floor(Math.random() * playlistZapify.length)];
            criaMensagem('esquerda', 'Não temos mais músicas que você não tenha na sua playlist<br>Mas que tal <a target="_blank" href="' + musica.link + '">' + musica.nome + '</a>?');
        } else {
            let musica = playlistZapify[musicas[Math.floor(Math.random() * musicas.length)]];
            criaMensagem('esquerda', 'Não temos mais músicas desse gênero<br>Mas que tal <a target="_blank" href="' + musica.link + '">' + musica.nome + '</a>?');
        }
    } else {
        let musica = playlistZapify[musicas[Math.floor(Math.random() * musicas.length)]];
        criaMensagem('esquerda', 'Que tal ouvir <a target="_blank" href="' + musica.link + '">' + musica.nome + '</a>?');
    }
    local = null;
}

function leMensagem(mensagem) {
    if(local == 'escolher-musica') {
        escolherMusica(mensagem);
        return;
    }
    if(local == 'escolher-musica-nova') {
        escolherMusicaNova(mensagem);
        return;
    }

    if(!local) local = bot;
    
    let achado = false;
    for(let i = 0; !achado && i < local.length - 1; i++) {
        for(let j = 0; !achado && j < local[i].entrada.length; j++) {
            if(mensagem == local[i].entrada[j]) {
                achado = true;
                criaMensagem('esquerda', local[i].saida[Math.floor(Math.random() * local[i].saida.length)]);
                local = local[i].continuacao;
            }
        }
    }
    if(!achado) {
        criaMensagem('esquerda', local[local.length - 1].saida[Math.floor(Math.random() * local[local.length - 1].saida.length)]);
        local = local[local.length - 1].continuacao;
    }
}

