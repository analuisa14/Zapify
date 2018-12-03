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
                saida: ['Qual gênero quer escutar?', 'Escolha um gênero para ouvir!'],
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

let playlistZapify = [
    {
        nome: 'Despacito',
        genero: 'pop',
        link: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk'
    } , 
    {
        nome: 'thank u, next',
        genero: 'pop',
        link: 'https://www.youtube.com/watch?v=gl1aHhXnN1k'
    } ,
    {
        nome: 'Woman Like Me',
        genero: 'pop',
        link: 'https://www.youtube.com/watch?v=fSOpiZo1BAA'
    } ,
    {
        nome: 'Bad Romance',
        genero: 'pop',
        link: 'https://www.youtube.com/watch?v=qrO4YZeyl0I'
    } ,
    {
        nome: 'Bad Liar',
        genero: 'pop',
        link: 'https://www.youtube.com/watch?v=NZKXkD6EgBk'
    } ,
    {
        nome: 'Billie Jean',
        genero: 'pop',
        link: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y'
    } ,
    {
        nome: 'Brazil',
        genero: 'indie',
        link: 'https://www.youtube.com/watch?v=QHgh77iE6qc'
    } ,
    {
        nome: 'The Less I Know The Better',
        genero: 'indie',
        link: 'https://www.youtube.com/watch?v=sBzrzS1Ag_g'
    } ,
    {
        nome: 'Girls Like Me',
        genero: 'indie',
        link: 'https://www.youtube.com/watch?v=FJ66D7TcEWU'
    } ,
    {
        nome: 'Still Feel',
        genero: 'indie',
        link: 'https://www.youtube.com/watch?v=KOOhPfMbuIQ'
    } ,
    {
        nome: 'Feel It Still',
        genero: 'indie',
        link: 'https://www.youtube.com/watch?v=pBkHHoOIIn8'
    } ,
    {
        nome: 'Bohemian Rhapsody',
        genero: 'rock',
        link: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
    } ,
    {
        nome: 'Alexander The Great',
        genero: 'rock',
        link: 'https://www.youtube.com/watch?v=1oTEQf1d9Iw'
    } ,
    {
        nome: 'Uprising',
        genero: 'rock',
        link: 'https://www.youtube.com/watch?v=w8KQmps-Sog'
    } ,
    {
        nome: 'Come Together',
        genero: 'rock',
        link: 'https://www.youtube.com/watch?v=45cYwDMibGo'
    } ,
    {
        nome: 'Should I Stay Or Should I Go',
        genero: 'rock',
        link: 'https://www.youtube.com/watch?v=BN1WwnEDWAM'
    } ,
    {
        nome: 'Parado no Bailão',
        genero: 'funk',
        link: 'https://www.youtube.com/watch?v=upCptHeThio'
    } ,
    {
        nome: 'O Bebê',
        genero: 'funk',
        link: 'https://www.youtube.com/watch?v=Btyfrd-UtSw'
    } ,
    {
        nome: 'Vou Falar Pra Tu',
        genero: 'funk',
        link: 'https://www.youtube.com/watch?v=M5cXtRgZ3a8'
    } ,
    {
        nome: 'Agora Vai Sentar',
        genero: 'funk',
        link: 'https://www.youtube.com/watch?v=SHVkm-TqrT0'
    } ,
    {
        nome: 'Não Fala Não pra Mim',
        genero: 'sertanejo',
        link: 'https://www.youtube.com/watch?v=kpEQ3ReRQfg'
    } ,
    {
        nome: 'Quem Pegou, Pegou',
        genero: 'sertanejo',
        link: 'https://www.youtube.com/watch?v=X8VDYICEIYw'
    } ,
    {
        nome: 'Largado Às Traças',
        genero: 'sertanejo',
        link: 'https://www.youtube.com/watch?v=WcTRQXtXJPs'
    } ,
    {
        nome: 'Oi Nego',
        genero: 'sertanejo',
        link: 'https://www.youtube.com/watch?v=Id2cTK9TKPE'
    } ,
    {
        nome: 'Tanto Fez ou Tanto Faz',
        genero: 'pagode',
        link: 'https://www.youtube.com/watch?v=qFhvA5zZatU'
    } ,
    {
        nome: 'Ponto Fraco',
        genero: 'pagode',
        link: 'https://www.youtube.com/watch?v=Zl6X0BLV6bk'
    } ,
    {
        nome: 'Cheia de Manias',
        genero: 'pagode',
        link: 'https://www.youtube.com/watch?v=uJz0F36TGoc'
    } ,
    {
        nome: 'Nem de Graça',
        genero: 'pagode',
        link: 'https://www.youtube.com/watch?v=yfGcpnp9Wgc'
    } ,
    {
        nome: 'Deixa Acontecer',
        genero: 'pagode',
        link: 'https://www.youtube.com/watch?v=c4XeTP11EI8'
    } ,
    {
        nome: 'Me Apaixonei Pela Pessoa Errada',
        genero: 'pagode',
        link: 'https://www.youtube.com/watch?v=qiAoCkue1PE'
    }
]

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