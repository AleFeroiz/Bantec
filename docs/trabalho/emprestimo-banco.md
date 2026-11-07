# Empréstimo ao banco — plano de implementação

Estado: sistema inicial implementado e publicado em `main`; atualização de juros e vencimento pela casa marcada concluída em 2026-11-07. Escopo: jogo web React/Colyseus. Apostas, alterações de leilão e protótipo Unity não fazem parte desta etapa.

## Regras confirmadas

- Cada jogador escolhe um valor entre R$ 10.000 e 25% do saldo inicial configurado da sala. O seletor terá controles de ± R$ 10.000 e ± R$ 100.000, respeitando os limites.
- Pode contratar a qualquer momento, inclusive fora da vez ou durante dívida, desde que não tenha empréstimo ativo e não tenha contratado outro desde a última passagem válida pela Partida. Na primeira volta, pode contratar normalmente.
- O primeiro empréstimo tem juros de 20%; cada contratação posterior aumenta a taxa em 10 pontos percentuais: 30%, 40%, 50% e assim por diante. Exemplo: R$ 500.000 produzem cobranças de R$ 600.000, R$ 650.000 e R$ 700.000 nas três primeiras contratações.
- Ao contratar, a casa onde a ficha está fica marcada visualmente com um feixe na cor do jogador e o nome dele. Não há pagamento antecipado. A cobrança integral ocorre após percorrer uma volta completa e cruzar novamente a casa marcada. Movimento normal e cartas que percorrem casas contam; teletransportes não contam. Uma animação iniciada antes da contratação não conta para o empréstimo recém-contratado. Se o saldo não bastar, aplicar o fluxo existente de dívida com o banco, sem débito parcial.
- A passagem válida também libera uma nova contratação por volta, mas a existência de empréstimo ativo continua impedindo outra. Crédito contratado durante dívida quita automaticamente a dívida anterior quando o saldo se torna suficiente.
- Movimento que percorre o tabuleiro, inclusive Volta ao Brasil, conta para o vencimento após completar o percurso até a casa marcada. Teletransporte, como Troca-Troca, não conta. Não alterar implicitamente a regra existente de volta para construções.
- No fim por tempo, descontar o valor integral pendente do patrimônio. Vitória imediata por monopólio permanece válida mesmo com empréstimo ativo.
- Bots podem contratar para tentar pagar dívidas, sem contratar para comprar propriedades.

## Decisões técnicas aplicadas

- O teto de 25% é arredondado para baixo a múltiplos de R$ 10.000. Se ficar abaixo do mínimo de R$ 10.000, empréstimos ficam indisponíveis.
- O estado por jogador guarda valor contratado, valor devido, contagem de empréstimos, espaço marcado e passos válidos restantes; a dívida pendente é descontada uma vez no patrimônio final.
- Se não houver saldo para quitar tudo quando chegar à marca, o sistema usa o fluxo existente de dívida bancária, sem pagamento parcial, e mantém o empréstimo até a quitação.
- A liberação de uma nova contratação por volta continua vinculada à passagem pela Partida. Teletransportes como Troca-Troca não liberam a contratação.

## Passo a passo

1. Inspecionar implementação atual de saldo inicial, movimentos, passagem, dívida, patrimônio, bots, mensagens e testes. Atualizar decisões e regras oficiais para refletir as regras aprovadas antes de alterar o comportamento.
2. Acrescentar estado serializável por jogador para contratação, valor devido, contagem de empréstimos e disponibilidade por passagem. Validar valores, limites, fase e identidade no servidor autoritativo; impedir mensagens repetidas e contratações concorrentes inválidas.
3. Integrar crédito e quitação de dívida, passagem válida, bônus, cobrança e retomada do fluxo. Garantir que teletransportes não disparem cobrança nem liberação e que a passagem não altere outras regras indevidamente.
4. Ajustar patrimônio para final por tempo, com tratamento consistente da dívida já vencida; preservar vitória imediata por monopólio e revisar coroa e chapéu, que usam o mesmo cálculo.
5. Criar botão e painel DOM responsivos: valor, incrementos de R$ 10 mil e R$ 100 mil, limite, juros, total a pagar, confirmação, estado ativo e motivo de indisponibilidade. Manter o tabuleiro legível.
6. Integrar bots ao fluxo de dívida com decisão limitada a essa finalidade; contemplar desconexão e retomada de controle.
7. Criar testes de regras e integração para limites, escala, uma contratação por volta, fora da vez, dívida, bônus antes da cobrança, passagem próxima, movimentos de carta e teletransporte, insuficiência e falência, patrimônio, monopólio, bots, reconexão e requisições inválidas ou duplicadas.
8. Executar `npm run verify`, fazer playtest real com clientes e bots em desktop e celular conforme o procedimento do README, registrar evidências em `docs/VALIDACAO.md` e atualizar o andamento. Revisar diff e publicar conforme o fluxo do projeto.

## Implementação e validação

Estado serializável por jogador: `server/src/rooms/schema/LobbyState.ts`. Validação autoritativa, crédito, cobrança, movimentos e bots: `server/src/rooms/GameRoom.ts`. Painel DOM: `src/ui/App.tsx` e `src/ui/styles.css`. Limite e escala de juros: `shared/game.ts`. Testes: `shared/game.test.ts` e `server/test/GameRoom.test.ts`.

`npm run verify` passou com 382 testes em 66 arquivos e builds do Vite e do servidor. Playtest desktop conectado confirmou seletor, contratação e sincronização de saldo e vencimento. A revisão visual em viewport de 390 × 844 confirmou que seletor e controles do empréstimo cabem na interface móvel. A passagem com cobrança foi exercitada pelo teste Colyseus, que movimenta o jogador através da Partida e verifica o bônus antes da quitação; não foi repetida numa partida ao vivo nesta revisão. A sala de teste já aberta estava conectada a um servidor legado na porta 2567, então foi preservada. Os servidores isolados iniciados para a revisão foram encerrados.

### Atualização de juros e casa marcada — 2026-11-07

`loanRepayment` agora usa juros de 20% na primeira contratação e acrescenta 10 pontos percentuais por empréstimo anterior. No servidor, cada empréstimo registra o espaço de contratação e 40 passos válidos restantes; movimentos caminhados reduzem esse saldo, enquanto teletransportes não cobram nem reduzem a volta. O pagamento ocorre depois da resolução de chegada ao completar o percurso. Se houver outra dívida aberta, o vencimento permanece pendente e é cobrado assim que essa dívida for quitada. O painel informa a casa marcada e o total devido; a cena 3D mostra feixe na cor do jogador com seu nome.

`npm run verify` passou com 423 testes em 74 arquivos e concluiu os builds web e do servidor. O playtest local confirmou contratação fora da vez, taxa de 20%, marcador no tabuleiro com nome e cor, painel enquadrado em viewport móvel e console sem erros. A revisão visual do marcador foi feita na Partida; o acionamento do vencimento e a exclusão de teletransportes são cobertos por integração Colyseus e teste da regra de passos. O build mantém o aviso existente para o bundle principal acima de 500 kB.
