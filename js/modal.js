$(document).ready(function() {
    let $botaoModal = $('#botao-modal');
    let $body = $('body');
    let $main = $('main');

    $botaoModal.click(function() {
        let $janela = $('<div class="janela"></div>');
        $janela.append($('<h2>Desenvolvedores</h2>'));
        $janela.append($('<h3>Ana</h3>'));
        $janela.append($('<p>Ana <del>não</del> é uma boa programadora, estudante de Informática no CEFET-MG. Gosta de música e alguns jogos. </p>'));
        $janela.append($('<h3>Soco</h3>'));
        $janela.append($('<p>Guilherme Batista é estudante de Informática no CEFET-MG. Quando não está vagabundando na escola, estuda e joga em casa.</p>'));
        $janela.append($('<h3>Filardi</h3>'));
        $janela.append($('<p>Também estudante de Informática no CEFET-MG, Artur Filardi joga em horas vagas, apesar de não ter paciência para jogar jogos longos e gosta de robótica.</p>'));
        $janela.append($('<h3>Henrique</h3>'));
        $janela.append($('<p>Infboy também que quando não está estudando, está dormindo nas aulas ou vendo memes no twitter.</p>'));
        let $fechar = $('<button type="button">Fechar</button>');
        $janela.append($fechar);

        $janela.hide();
        $body.append($janela);
        $janela.fadeIn(250);

        $main.css('opacity', '.5');
        $main.css('pointer-events', 'none');

        $fechar.click(function() {
            $janela.fadeOut(250);
            setTimeout(function() { $janela.detach() }, 250);

            $main.css('opacity', '1');
            $main.css('pointer-events', 'auto');
        })
    });
});