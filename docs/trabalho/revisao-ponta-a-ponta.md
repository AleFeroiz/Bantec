# Revisão de ponta a ponta

## Estado

Em andamento. Revisar regras e ações autoritativas, recuperação de conexão, interface desktop e mobile, testes existentes e fluxos completos; reproduzir problemas e corrigir com regressão. Registrar limites de validação e escolhas pendentes.

## Fatos e decisões

- Suíte inicial com loopback: 427 testes passaram e builds web e servidor concluíram; build avisa sobre arquivo principal acima de 500 kB.
- Playtest inicial: criação de sala, bot e início de partida; bot comprou imóvel; console sem erros ou avisos. Desktop, construção e rede degradada ainda precisam de revisão.
- O usuário escolheu impedir nomes repetidos na sala. A regra atual de reconexão compara nome normalizado de maneira sensível a maiúsculas; preservar essa convenção.
- Implementado: rejeição no servidor com mensagem específica, nomes livres para bots e manutenção da retomada de cadeira desconectada. Teste novo falhou antes da correção; após ela, 429 testes e builds passaram. Dois clientes no navegador confirmaram rejeição com mensagem e entrada com outro nome.
- A recuperação pelo nome e código permite assumir cadeira desconectada a quem conheça ambos; é comportamento atual, distinto da ambiguidade de nomes repetidos.
- Decisão do usuário: manter a recuperação simples por código da sala e nome, mesmo com a possibilidade de outra pessoa que conheça ambos assumir a cadeira desconectada.
- Relatório visual anterior registra possível sobreposição do HUD em 1280 × 720; confirmar no estado atual.
- Confirmação visual em 1280 × 720: os cartões cobriam o canto superior. O usuário escolheu reduzir e afastar o tabuleiro; enquadramento corrigido e revisto nessa resolução e em 390 × 844 com propriedades compradas. Teste de projeção falhou antes e passou depois; console sem avisos ou erros.
- Recarregar uma partida local retomou a sala com saldos e propriedades; ainda não simula rede instável ou todas as fases de jogo.
- Partida com uma pessoa e cinco bots: revisão visual em 1280 × 720 e 390 × 844 mostrou os seis cartões e o tabuleiro sem sobreposição; console sem avisos ou erros. O cenário foi observado no início da partida, não em todas as decisões.
- A suíte de integração existente cobre queda e reconexão no lobby, bot assumindo o turno, preservação de imóveis, retomada com seis lugares e dívida durante desconexão. Esses testes não simulam latência, perda de pacotes ou interrupções do serviço em produção.
- Teste de integração adicional confirmou que, após a queda do vendedor com pedido de leilão pendente, o bot responde e a reserva do comprador permanece no lance inicial.

## Próximo passo

Revisar demais fluxos de conexão e fases da partida, incluindo rede instável e decisões durante a partida; ampliar a revisão de interface em outras proporções. Há alterações locais anteriores em documentos e assets; não incorporá-las inadvertidamente na publicação.
