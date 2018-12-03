$(document).ready(function() {
    let $botaoModal = $('#botao-modal');
    let $body = $('body');
    let $main = $('main');

    $botaoModal.click(function() {
        let $janela = $('<div class="janela"></div>');
        $janela.append($('<h2>Título</h2>'));

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