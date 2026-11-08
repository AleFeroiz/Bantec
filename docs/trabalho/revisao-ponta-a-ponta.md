# Revisão de ponta a ponta

## Estado

Em andamento. Revisar regras e ações autoritativas, recuperação de conexão, interface desktop e mobile, testes existentes e fluxos completos; reproduzir problemas e corrigir com regressão. Registrar limites de validação e escolhas pendentes.

## Fatos e decisões

- Suíte inicial com loopback: 427 testes passaram e builds web e servidor concluíram; build avisa sobre arquivo principal acima de 500 kB.
- Playtest inicial: criação de sala, bot e início de partida; bot comprou imóvel; console sem erros ou avisos. Desktop, construção e rede degradada ainda precisam de revisão.
- O usuário escolheu impedir nomes repetidos na sala. A regra atual de reconexão compara nome normalizado de maneira sensível a maiúsculas; preservar essa convenção.
- Implementado: rejeição no servidor com mensagem específica, nomes livres para bots e manutenção da retomada de cadeira desconectada. Teste novo falhou antes da correção; após ela, 429 testes e builds passaram. Dois clientes no navegador confirmaram rejeição com mensagem e entrada com outro nome.
- A recuperação pelo nome e código permite assumir cadeira desconectada a quem conheça ambos; é comportamento atual, distinto da ambiguidade de nomes repetidos.
- Relatório visual anterior registra possível sobreposição do HUD em 1280 × 720; confirmar no estado atual.

## Próximo passo

Revisar a concorrência e os demais fluxos de conexão, exercitar partida e interface em desktop e mobile, e investigar a sobreposição registrada. Há alterações locais anteriores em documentos e assets; não incorporá-las inadvertidamente na publicação.
