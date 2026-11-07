# Modo de times

Data: 2026-11-07. Estado: **implementado**.

## Escopo confirmado

- A anfitriã escolhe Individual, Duplas ou Trios no lobby; jogadores escolhem uma equipe. Bots podem completar vagas. Duplas aceitam duas ou três equipes completas; trios exigem duas equipes completas. A ordem continua individual e sorteada pelo servidor.
- Dinheiro, imóveis, dívidas, impostos, empréstimos, apostas, posição e turnos continuam individuais. Um aliado que cai numa cidade pode pagar melhorias nela; a primeira volta é verificada para quem constrói, e o imóvel e melhorias seguem pertencendo ao dono.
- Aliados não pagam aluguel entre si. Todas as condições de vitória existentes se aplicam ao time somando títulos; o último time com integrante solvente vence. O fim por tempo soma o patrimônio dos integrantes solventes.
- Cada equipe escolhe uma cor principal. Integrantes recebem tons claros/escuros da mesma família, com diferença ampla; nome e identificador de equipe também aparecem na partida.

## Encaminhamentos implementados

- Imóvel aliado não cobra aluguel nem consome o modificador pendente de aluguel; não há recompra forçada entre aliados. A contagem de companhias considera títulos da equipe e o bônus regional alcança cidades de seus integrantes.
- Ladrão, Apagão, Terremoto e Aniversário só miram adversários. Generoso, Troca-troca e Comunismo podem envolver aliados. Proteção e efeitos que exigem titularidade própria continuam individuais. Bots usam os mesmos critérios.
- Pedidos e lances de leilão entre aliados são recusados. A falência e a liquidação permanecem individuais; o time continua enquanto houver integrante solvente.
- No fim por tempo, o patrimônio solvente é somado por time e a tela final mostra a equipe. A classificação local de cada jogador permanece individual para acessórios de patrimônio.
- Mudar formato ou equipe invalida prontidão dos humanos afetados; o início é validado pelo servidor. Cor de equipe e tons individuais são sincronizados.

## Implementação

- Contrato e schema de lobby: formato e equipe sincronizados, mensagens de seleção e validação de equipes completas no servidor.
- Servidor autoritativo: aluguel, construções em imóvel aliado, monopólios regionais/linha/companhias, cartas, leilões, bots, falência, vitória e patrimônio por tempo.
- Interface: seletores no lobby, apresentação de equipe e cores, identificação de aliados no HUD, controles de melhoria e classificação final por equipe.
- O modo individual continua disponível.

## Validação concluída

- `npm run verify`: 416 testes em 73 arquivos passaram; builds Vite e servidor passaram. O bundle principal ainda gera o aviso de tamanho conhecido.
- Playtest local: sala de Duplas com dois times completos (um humano e bot por time), tons de azul claro/azul escuro visualmente distintos, times identificados no HUD, partida iniciada e compra de AgroBrasil sincronizada. Captura da revisão em 608 × 900; não houve revisão num viewport menor de celular.
- Testes de integração cobrem validação do lobby, cores, vitória por monopólio em títulos divididos entre aliados, isenção e modificador de aluguel, melhoria paga pelo visitante com título mantido pelo dono e continuidade após falência.
- `npm run graphify -- update .` atualizou o grafo após a mudança de código.

## Pendências conhecidas

- Rever visualmente o lobby e o HUD em viewport estreito de celular.
- Fazer playtest manual da melhoria paga por aliado; o comportamento está coberto pela integração Colyseus.
- Confirmar compatibilidade do protocolo com o cliente Unity Web antes de publicar mudanças de protocolo para esse cliente.
- Observar ritmo e duração em partidas humanas de duplas e trios para avaliar equilíbrio, sem alterar as condições de vitória acordadas.
