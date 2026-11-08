# Graph Report - BancoImobiliarioOnline  (2026-11-07)

## Corpus Check
- 195 files · ~167,137 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .glb 8, .blend 6, (none) 2)

## Summary
- 1482 nodes · 2760 edges · 103 communities (89 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cd213b8a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Posicionamento de propriedades e bandeiras — 2026-11-02
- package.json
- gameFeedback.ts
- Validação visual e de navegador
- Apostas — plano detalhado de implementação
- snapshotStability.ts
- compilerOptions
- Andamento do projeto
- compilerOptions
- steps
- roomRecovery.ts
- compilerOptions
- graphify.mjs
- scripts
- Instruções do projeto
- Como contribuir
- PULL_REQUEST_TEMPLATE.md
- Banco Imobiliário Online
- bug_report.md
- feature_request.md
- tsconfig.json
- lobby.ts
- sceneRenderWake.ts
- gameAudio.ts
- playerColors.ts
- Referências visuais da partida
- vitest
- game.ts
- HUD, cartas, dados e roleta
- getCameraFraming
- App
- BoardScene.tsx
- Seletor de fichas de personagem
- Regras do BANTEC
- GameRoom.test.ts
- VALIDACAO.md
- dependencies
- App.tsx
- CashHud.tsx
- turnActivity.ts
- dicePresentation.ts
- Leilão compartilhado — plano de implementação
- propertyRentLabel.ts
- Câmera por arraste e escolhas visuais
- Cena sem luzes e sombras
- Reforma BANTEC — plano de trabalho
- GameRoom
- Dogfood Report: BANTEC
- Bairros em sequência e tema da Sorte
- Board
- ANDAMENTO.md
- Medidor de FPS e playtest no Chrome
- Modelos low-poly e pisos diferenciados
- Otimização após relato de 2 FPS
- Otimização de renderização
- Polimento da cena e ferramentas DEV
- Deploy automático do Render
- betting.ts
- Playtests humanos de equilíbrio do BANTEC
- playerOwnershipHighlight.ts
- sequencia-visual-economia-camera.md
- Correção do painel de encerramento — 2026-10-31
- ANDAMENTO.md
- Zoom da câmera e destaque das fichas
- nightMode.ts
- normalizeRoomCode
- engines
- pawnPlacement.ts
- Reforma econômica inspirada em Business Tour — implementada (2026-11-01)
- 2026-10-31 — Smoke test público da sala e da partida BANTEC
- shared/board.ts
- selectedAuctionProperty
- Validação visual e de navegador
- auctionActions.ts
- scoreCriteria.ts
- Revisão de ponta a ponta
- cameraDrag.ts
- 2026-11-03 — Responsividade, leilão e controles DEV
- fpsMeter.ts
- services
- 2026-11-01 — Cancelamento de leilão em imóvel devolvido ao banco
- sequencia-jogada-janelas-construcao.md
- wealthHeadwear.ts
- Playtest manual das 12 cartas BANTEC — concluído (2026-10-31)
- vite
- Relatório — leilão compartilhado
- sceneLoading.ts
- throwableTrajectory.ts
- responsiveResults.test.ts
- @colyseus/sdk
- Revisão visual low-poly das fichas
- Reformulação do conjunto de fichas
- Prévia HTTPS do protótipo Unity Web — 2026-11-06
- lobby.ts
- revealCopy.ts
- getDiceDestinationSpaceId
- Empréstimo ao banco — plano de implementação
- Revisão do salto e do navio
- shouldOpenAuctionPanel
- getLobbyPlayerEntries
- stepDieValue
- multiSelect.test.ts
- canAffordPurchase

## God Nodes (most connected - your core abstractions)
1. `App()` - 101 edges
2. `GameRoom` - 81 edges
3. `2026-10-31 — Dados mais baixos sobre a FATEC` - 77 edges
4. `vitest` - 69 edges
5. `Andamento do projeto` - 39 edges
6. `Board()` - 28 edges
7. `2026-11-03 — Responsividade, leilão e controles DEV` - 27 edges
8. `LobbyPlayerState` - 18 edges
9. `AnimatedPawn()` - 18 edges
10. `compilerOptions` - 18 edges

## Surprising Connections (you probably didn't know these)
- `Fatos verificados` --references--> `AnimatedPawn()`  [INFERRED]
  docs/trabalho/seletor-fichas-personagem.md → src/ui/BoardScene.tsx
- `HUD de turno, atalhos e leitura do aluguel — 2026-10-30` --references--> `getBuildingRentLabelPosition()`  [INFERRED]
  docs/VALIDACAO.md → src/ui/modelPlacement.ts
- `Atualização de juros e casa marcada — 2026-11-07` --references--> `loanRepayment()`  [INFERRED]
  docs/trabalho/emprestimo-banco.md → shared/game.ts
- `Zoom da câmera e destaque das fichas — implementação validada (2026-10-29)` --references--> `AnimatedPawn()`  [INFERRED]
  docs/ANDAMENTO.md → src/ui/BoardScene.tsx
- `2026-10-28 — Dinheiro 3D e leitura de casas (em andamento)` --references--> `AnimatedPawn()`  [INFERRED]
  docs/VALIDACAO.md → src/ui/BoardScene.tsx

## Import Cycles
- None detected.

## Communities (103 total, 14 thin omitted)

### Community 0 - "Posicionamento de propriedades e bandeiras — 2026-11-02"
Cohesion: 0.33
Nodes (5): Correções aplicadas, Fatos verificados, Posicionamento de propriedades e bandeiras — 2026-11-02, Próximo passo, Validação

### Community 1 - "package.json"
Cohesion: 0.10
Nodes (26): allowScripts, esbuild@0.28.2, devDependencies, @colyseus/testing@^0.18.6, @colyseus/tools@^0.18.11, husky@^9.1.7, tsx@^4.23.15, @types/node@^24.19.2 (+18 more)

### Community 2 - "gameFeedback.ts"
Cohesion: 0.23
Nodes (13): CashChange, CashChangeToast(), CashChangeToastProps, formatCashDelta(), getCashChangeTone(), getCashToastPlacement(), getGameSound(), getLandingSpecialSound() (+5 more)

### Community 3 - "Validação visual e de navegador"
Cohesion: 0.03
Nodes (74): 2026-10-27 — Chrome: cartas Sorte ou Revés e prisão, 2026-10-27 — Chrome: dívida, sala e layout responsivo, 2026-10-27 — Chrome: estado de construções, 2026-10-27 — Chrome: hipoteca, resgate e carteira, 2026-10-27 — Chrome: sala, entrada de jogador e primeira compra, 2026-10-27 — Encerramento Express e placar final, 2026-10-27 — Lobby de sala, 2026-10-27 — Negociação entre participantes (+66 more)

### Community 4 - "Apostas — plano detalhado de implementação"
Cohesion: 0.09
Nodes (22): 10. Encerramento e evidência exigida, 11. Implementação e validação, 1. Regras confirmadas, 2. Parâmetros técnicos do plano, 3.1 Termos e fórmula, 3.2 Catálogo inicial proposto pelo plano, 3.3 Sorteio do resultado, 3. Economia e geração das opções (+14 more)

### Community 5 - "snapshotStability.ts"
Cohesion: 0.80
Nodes (3): areNumberPairsEqual(), areRecordArraysEqual(), areRecordMapsEqual()

### Community 6 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, jsx, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 7 - "Andamento do projeto"
Cohesion: 0.04
Nodes (46): Aluguéis 3D, opções em tela inteira, emotes e sons de chegada — implementação concluída (2026-10-30), Andamento do projeto, Correção do desempenho baixo — implementação validada localmente (2026-10-29), Correções de casas e interações — concluído (2026-10-29), Correções de compra, prisão e origens 3D — concluído (2026-10-30), Estado observado — 2026-10-28, Frente atual — fichas de veículo no lobby (2026-10-29), Frente atual — sons de dinheiro, ajuda e prazo de turno (2026-10-28) (+38 more)

### Community 8 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, lib, module, moduleDetection, moduleResolution, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 9 - "steps"
Cohesion: 0.09
Nodes (21): RENDER_DEPLOY_HOOK_URL, jobs, verify, name, on, pull_request, push, workflow_dispatch (+13 more)

### Community 10 - "roomRecovery.ts"
Cohesion: 0.31
Nodes (8): normalizePlayerName(), clearLastRoom(), configureRoomReconnection(), LastRoom, readLastRoom(), recoverRoomAfterRetries(), ROOM_RECONNECT_MAX_RETRIES, saveLastRoom()

### Community 11 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, esModuleInterop, lib, module, moduleResolution, noFallthroughCasesInSwitch, outDir, rootDir (+5 more)

### Community 12 - "graphify.mjs"
Cohesion: 0.22
Nodes (4): [command, ...args], graphifyBinDir, graphifyExecutable, projectRoot

### Community 13 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, build:server, dev, dev:server, graphify, prepare, preview (+3 more)

### Community 14 - "Instruções do projeto"
Cohesion: 0.17
Nodes (11): Autorização e bloqueios de validação, Blender para assets do jogo, Contexto durável e memória de trabalho, Fluxo de trabalho, Fonte da verdade, graphify, Instruções do projeto, Objetivo (+3 more)

### Community 15 - "Como contribuir"
Cohesion: 0.33
Nodes (5): Ativos e coordenação, Como contribuir, Implementação, testes e commits, Preparação, Pull requests

### Community 16 - "PULL_REQUEST_TEMPLATE.md"
Cohesion: 0.33
Nodes (5): Capturas ou vídeo (quando a mudança for visual), Como foi validado?, Impacto em regras, arquitetura ou documentação, O que muda?, Por que?

### Community 17 - "Banco Imobiliário Online"
Cohesion: 0.17
Nodes (11): Abrir a partida local no navegador, Abrir o Blender e os assets, Atualizar o projeto pelo GitHub, BANTEC, Desenvolvimento local, Direção visual, Economia atual, Estado atual (+3 more)

### Community 18 - "bug_report.md"
Cohesion: 0.40
Nodes (4): Ambiente, Como reproduzir?, O que aconteceu?, O que deveria acontecer?

### Community 19 - "feature_request.md"
Cohesion: 0.40
Nodes (4): Critérios de aceite, Problema ou necessidade, Regras, telas ou dispositivos afetados, Resultado esperado para quem joga

### Community 21 - "lobby.ts"
Cohesion: 0.13
Nodes (16): chooseBotAuctionBid(), shouldBotAcceptAuctionRequest(), shouldBotBuyback(), shouldBotBuyProperty(), createRoomCode(), AUCTION_MIN_BID_INCREMENT, CHARACTER_OPTIONS, DUPLICATE_PLAYER_NAME_ERROR (+8 more)

### Community 22 - "sceneRenderWake.ts"
Cohesion: 0.20
Nodes (13): SceneRenderWake(), CancelDelay, CancelFrame, ContextEventTarget, InvalidateScene, SceneWakeTarget, ScheduleDelay, ScheduleFrame (+5 more)

### Community 23 - "gameAudio.ts"
Cohesion: 0.10
Nodes (30): Aluguel ampliado, opções em tela cheia, emotes, hotel e sons de cantos — 2026-10-30, Compra depois de carta de avanço e piso sem texto — 2026-10-30, HUD de turno, atalhos e leitura do aluguel — 2026-10-30, Painel de compra, inspeção, controles e nitidez — 2026-10-30, Seleção de propriedades pelo tabuleiro — 2026-10-31, showGameFeedback(), SpaceLabel(), appendGameFeedback() (+22 more)

### Community 24 - "playerColors.ts"
Cohesion: 0.36
Nodes (7): getTeamMemberColor(), isPlayerColor(), isTeamPaletteColor(), PLAYER_COLOR_NAMES, PLAYER_COLORS, TEAM_COLOR_PALETTES, TeamPaletteColor

### Community 25 - "Referências visuais da partida"
Cohesion: 0.14
Nodes (13): Aplicação e limites, Apresentação por momento, Capturas de referência por estado, Composição, Direção visual para o nosso jogo, Fontes consultadas, Inventário de telas consultadas, Leitura visual das capturas (+5 more)

### Community 26 - "vitest"
Cohesion: 0.29
Nodes (4): vitest, stylesheet, appSource, stylesheet

### Community 27 - "game.ts"
Cohesion: 0.09
Nodes (51): getLineTitleIds(), ANIMATION_SPEEDS, applyRentMultiplier(), areDiceDoubles(), AUCTION_BID_SECONDS, AUCTION_GLOBAL_COOLDOWN_SECONDS, AUCTION_REQUEST_SECONDS, calculateNetWorth() (+43 more)

### Community 28 - "HUD, cartas, dados e roleta"
Cohesion: 0.40
Nodes (4): 2026-10-31 — Ajuste adicional de altura dos dados, Decisões confirmadas pelo pedido, HUD, cartas, dados e roleta, Implementação e validação

### Community 29 - "getCameraFraming"
Cohesion: 0.17
Nodes (11): BoardSceneCanvas(), CameraZoomBounds(), ResponsiveCamera(), CameraFraming, getCameraFraming(), CameraZoomLimits, getCameraZoomLimits(), DEFAULT_GRAPHICS_QUALITY (+3 more)

### Community 30 - "App"
Cohesion: 0.13
Nodes (11): App(), connectToRoom(), createRoom(), joinRoom(), leaveRoom(), BoardScene, CharacterIcon(), durationLabel() (+3 more)

### Community 31 - "BoardScene.tsx"
Cohesion: 0.09
Nodes (24): BUILDING_ANIMATION_DURATION_MS, LANDING_PULSE_DURATION_MS, areScenePropsEqual(), BoardSceneProps, CameraFollowTarget(), CameraOrbitControls, CityEffectEvent, CityEffectMarker() (+16 more)

### Community 32 - "Seletor de fichas de personagem"
Cohesion: 0.33
Nodes (5): Decisão de implementação, Fatos verificados, Pedido confirmado, Seletor de fichas de personagem, Validação e continuidade

### Community 33 - "Regras do BANTEC"
Cohesion: 0.05
Nodes (34): Cidades, regiões e cores, Confirmadas e vigentes, Decisões do projeto, Histórico de decisões substituídas, Lobby visual — decisão de 2026-11-04, Outras regras econômicas aprovadas, Propostas abertas e validações necessárias, Arquitetura confirmada (+26 more)

### Community 34 - "GameRoom.test.ts"
Cohesion: 0.15
Nodes (10): @colyseus/schema, LobbyState, PropertyState, BET_MINIMUM, EVENT_CARDS, EventCard, EventCardEffect, CARD_REVEAL_SECONDS (+2 more)

### Community 35 - "VALIDACAO.md"
Cohesion: 0.04
Nodes (54): 2026-10-31 — Início das durações e economia em sala local com bots, 2026-10-31 — Lançamento cosmético de objetos, 2026-10-31 — Trajetória do arremesso em movimento, 2026-11-01 — ajustes de cartas, movimento e duração, 2026-11-01 — Bandeira de festival e animação de rolagem, 2026-11-01 — Continuação após resolver carta com alvo, 2026-11-01 — Cronômetro de turno sem limite total, 2026-11-01 — Destaque das cidades por cartão e altura das construções (+46 more)

### Community 36 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, @colyseus/core@^0.18.23, @colyseus/schema@^5.0.42, @colyseus/ws-transport@^0.18.4, react@^19.1.0, react-dom@^19.1.0, three@^0.179.1, @colyseus/core (+3 more)

### Community 37 - "App.tsx"
Cohesion: 0.10
Nodes (26): AnimationSpeed, MatchDuration, MatchEndReason, PROPERTY_BUILD_LEVELS, PropertyHolding, getPlayerEmoteSymbol(), isPlayerEmote(), PLAYER_EMOTES (+18 more)

### Community 38 - "CashHud.tsx"
Cohesion: 0.10
Nodes (21): react, CashHudOverlay, AppErrorBoundary, AppErrorBoundaryProps, AppErrorBoundaryState, CashHudCamera(), CashHudOverlay, CashHudOverlayScene() (+13 more)

### Community 39 - "turnActivity.ts"
Cohesion: 0.43
Nodes (6): ActivityPhase, getTurnActivityLabel(), isBoardSelectionGuidanceActive(), shouldShowTurnCard(), shouldSuppressTurnCardForFeedback(), shouldSuppressTurnCardForSpaceSelection()

### Community 40 - "dicePresentation.ts"
Cohesion: 0.22
Nodes (13): AnimatedDie(), DICE_PRESENTATION_POSITIONS, DICE_RESULT_BADGE_POSITION, DICE_ROLL_BOUNCE_COUNT, DICE_ROLL_BOUNCE_HEIGHT, DICE_VISUAL_SCALE, DicePosition, DicePresentationPhase (+5 more)

### Community 41 - "Leilão compartilhado — plano de implementação"
Cohesion: 0.11
Nodes (19): 10. Interface desktop e mobile, 11. Arquivos e etapas, 12. Critérios de aceite e testes, 1. Regras já confirmadas, 2. Decisões confirmadas nesta etapa, 3. Implementação existente a aproveitar, 4.1 Imóvel próprio, 4.2 Imóvel alheio (+11 more)

### Community 42 - "propertyRentLabel.ts"
Cohesion: 0.31
Nodes (12): boardSpaces, bankReturnValue(), buildingSaleValue(), calculateCompanyRent(), calculateRent(), PROPERTY_HOTEL_LEVEL, formatMoney(), canShowLiquidationValues() (+4 more)

### Community 43 - "Câmera por arraste e escolhas visuais"
Cohesion: 0.29
Nodes (6): Câmera por arraste e escolhas visuais, Decisões confirmadas, Fatos, Perguntas abertas, Suposições, Validação concluída nesta sessão

### Community 44 - "Cena sem luzes e sombras"
Cohesion: 0.29
Nodes (6): Cena sem luzes e sombras, Decisão confirmada, Fatos, Implementação, Próximo passo, Validação

### Community 45 - "Reforma BANTEC — plano de trabalho"
Cohesion: 0.25
Nodes (7): Decisões e escopo aprovados, Estado atual — 2026-11-01, Linha de implementação, Objetivo, Playtest de compras e aluguel — 2026-10-31, Propostas abertas e pendências, Reforma BANTEC — plano de trabalho

### Community 46 - "GameRoom"
Cohesion: 0.08
Nodes (3): GameRoom, LobbyPlayerState, getAnimationDuration()

### Community 47 - "Dogfood Report: BANTEC"
Cohesion: 0.40
Nodes (4): Dogfood Report: BANTEC, ISSUE-001: Cartões cobrem o vértice superior do tabuleiro em desktop, Issues, Summary

### Community 48 - "Bairros em sequência e tema da Sorte"
Cohesion: 0.40
Nodes (4): Bairros em sequência e tema da Sorte, Fatos verificados — 2026-10-29, Perguntas abertas, Próximo passo

### Community 49 - "Board"
Cohesion: 0.11
Nodes (31): Zoom da câmera e destaque das fichas — implementação validada (2026-10-29), Fatos verificados, 2026-10-28 — Dinheiro 3D e leitura de casas (em andamento), BOARD_SURFACE_Y, BoardSpaceDecoration, BUILDING_GROUP_Y, BUILDING_MODEL_Y_OFFSET, getBoardSpaceDecoration() (+23 more)

### Community 50 - "ANDAMENTO.md"
Cohesion: 0.14
Nodes (14): Altura dos dados durante a rolagem — concluído (2026-10-31), Altura dos dados na rolagem — concluído (2026-10-31), Auditoria de cartas e dívida — progresso (2026-10-31), Cartões coloridos, avisos identificados e visibilidade das peças — concluído (2026-10-30), Dados mais baixos durante a rolagem — concluído (2026-10-31), Ferramentas DEV para testes de partida — concluído (2026-10-31), Motivo do encerramento explícito no resultado — em validação (2026-10-31), Playtest da Linha 0 — concluído (2026-10-31) (+6 more)

### Community 51 - "Medidor de FPS e playtest no Chrome"
Cohesion: 0.33
Nodes (5): Decisões desta implementação, Fatos verificados, Medidor de FPS e playtest no Chrome, Próximo passo, Validação

### Community 52 - "Modelos low-poly e pisos diferenciados"
Cohesion: 0.33
Nodes (5): Decisões confirmadas pelo usuário, Fatos, Implementação, Modelos low-poly e pisos diferenciados, Validação e publicação

### Community 53 - "Otimização após relato de 2 FPS"
Cohesion: 0.33
Nodes (5): Fatos, Implementação, Otimização após relato de 2 FPS, Próximo passo, Validação concluída localmente; Chrome standalone pendente

### Community 54 - "Otimização de renderização"
Cohesion: 0.33
Nodes (5): Fatos verificados, Implementação concluída, Limites conhecidos e próximo passo, Otimização de renderização, Validação concluída

### Community 55 - "Polimento da cena e ferramentas DEV"
Cohesion: 0.33
Nodes (5): Decisões de implementação, Fatos verificados, Pedido confirmado, Polimento da cena e ferramentas DEV, Validação e continuidade

### Community 56 - "Deploy automático do Render"
Cohesion: 0.25
Nodes (7): Comparação de hospedagem — 2026-10-31, Contorno preparado, Deploy automático do Render, Estado atualizado — 2026-10-31, Fatos verificados, Procedimento e estado atual, Segurança

### Community 57 - "betting.ts"
Cohesion: 0.11
Nodes (29): BET_CHANCE_SCALE, BET_PROFILES, BET_STARTING_CASH_RATIO, BET_STEP, BetBand, betLimit(), BetOffer, betPayout() (+21 more)

### Community 58 - "Playtests humanos de equilíbrio do BANTEC"
Cohesion: 0.33
Nodes (5): Como executar, Estado, Objetivo, Playtests humanos de equilíbrio do BANTEC, Registro por sessão

### Community 59 - "playerOwnershipHighlight.ts"
Cohesion: 0.60
Nodes (3): getOwnedPropertySpaceIds(), OwnedProperty, shouldShowPlayerInspection()

### Community 61 - "Correção do painel de encerramento — 2026-10-31"
Cohesion: 0.18
Nodes (11): 2026-10-31 — Causa exibida no resultado final, 2026-10-31 — Conclusão da revisão manual das 12 cartas, 2026-10-31 — Confirmação visual da altura mais baixa dos dados, 2026-10-31 — Encerramento por tempo no navegador, 2026-10-31 — Ferramenta DEV para preparar cartas, 2026-10-31 — Prazo de seleção após revelar uma carta, 2026-10-31 — Redução adicional da altura dos dados, 2026-10-31 — Revisão manual de cartas no BANTEC (+3 more)

### Community 62 - "ANDAMENTO.md"
Cohesion: 0.03
Nodes (64): Ajuste da home e do lobby — concluído (2026-11-02), Ajustes de regras, liquidação e apresentação — implementado (2026-11-01), Altura dos dados — novo ajuste solicitado (2026-10-31), Apostas — implementadas (2026-11-06), Auditoria da reforma BANTEC — 2026-11-01, Bandeira de festival e rolagem dos dados — concluídas (2026-11-01), Bots, dívida e avisos de efeitos na cidade — concluído (2026-11-02), Cartas e inspeção visual — concluído (2026-11-02) (+56 more)

### Community 63 - "Zoom da câmera e destaque das fichas"
Cohesion: 0.40
Nodes (4): Decisão de implementação, Fatos, Validação, Zoom da câmera e destaque das fichas

### Community 64 - "nightMode.ts"
Cohesion: 0.39
Nodes (7): GAME_BACKGROUND_LIGHT, GAME_BACKGROUND_NIGHT, getGameBackgroundColor(), NIGHT_MODE_STORAGE_KEY, NightModeStorage, readNightMode(), saveNightMode()

### Community 65 - "normalizeRoomCode"
Cohesion: 0.67
Nodes (4): copyRoomInvite(), buildRoomInviteUrl(), getRoomInviteCode(), normalizeRoomCode()

### Community 66 - "engines"
Cohesion: 0.67
Nodes (3): engines, node, npm

### Community 67 - "pawnPlacement.ts"
Cohesion: 0.25
Nodes (10): positionOnBoard(), LoanMarker(), FESTIVAL_BANNER_HEIGHT, FESTIVAL_BANNER_PENNANT_COUNT, FESTIVAL_BANNER_STAKE_SPACING, getFestivalBannerPlacement(), getPawnStackIndices(), getPawnTilePosition() (+2 more)

### Community 68 - "Reforma econômica inspirada em Business Tour — implementada (2026-11-01)"
Cohesion: 0.67
Nodes (3): Primeira volta e velocidade de animação — corrigidas (2026-11-01), Reforma econômica inspirada em Business Tour — implementada (2026-11-01), Restrições de primeira volta e cartas de aluguel — em implementação (2026-11-01)

### Community 69 - "2026-10-31 — Smoke test público da sala e da partida BANTEC"
Cohesion: 0.20
Nodes (10): 2026-10-30 — Cartões do jogador, lance de leilão e airport GLB, 2026-10-30 — Pop-up de saldo, modo DEV no lobby e aluguel das estações, 2026-10-31 — Dados ainda mais baixos sobre a FATEC, 2026-10-31 — Dados mais baixos sem atravessar a FATEC, 2026-10-31 — Encerramento após dívida sem bens liquidáveis, 2026-10-31 — Ferramentas DEV de teleporte e saldo, 2026-10-31 — Recompra depois do aluguel, 2026-10-31 — Recompra forçada pela interface (+2 more)

### Community 70 - "shared/board.ts"
Cohesion: 0.07
Nodes (29): BoardSpace, businessTourCityCurve, cities, City, cityEconomiesByName, CityEconomy, cityIds, companyIds (+21 more)

### Community 71 - "selectedAuctionProperty"
Cohesion: 0.28
Nodes (5): handleSelectSpace(), selectedAuctionProperty(), BoardChoicePhase, BoardSpaceInteraction, getBoardSpaceInteraction()

### Community 72 - "Validação visual e de navegador"
Cohesion: 0.29
Nodes (7): 2026-10-31 — Cartas Ladrão, Volta ao Brasil e Apagão, 2026-10-31 — Dados mais baixos sem entrar na FATEC, 2026-11-01 — Ajuste final da cartola, 2026-11-01 — Fichas, cores, propriedades e reconexão, 2026-11-01 — Home BANTEC publicada e seletor de duração, 2026-11-01 — Recuperação do tabuleiro após piscada, Validação visual e de navegador

### Community 73 - "auctionActions.ts"
Cohesion: 0.57
Nodes (5): stepAuctionBid(), adjustAuctionStartingBid(), getAuctionStartBlockReason(), normalizeAuctionBidInput(), normalizeAuctionStartingBid()

### Community 74 - "scoreCriteria.ts"
Cohesion: 0.39
Nodes (6): finalScoreMetrics(), FinalScorePlayer, FinalTeamScorePlayer, rankFinalScore(), rankFinalTeamScore(), scoreCriteria()

### Community 75 - "Revisão de ponta a ponta"
Cohesion: 0.40
Nodes (4): Estado, Fatos e decisões, Próximo passo, Revisão de ponta a ponta

### Community 76 - "cameraDrag.ts"
Cohesion: 0.50
Nodes (3): CameraDragAnywhere(), CameraDragStart, shouldStartCameraDrag()

### Community 77 - "2026-11-03 — Responsividade, leilão e controles DEV"
Cohesion: 0.06
Nodes (32): 2026-11-03 — Responsividade, leilão e controles DEV, 2026-11-06 — Ajustes de seleção de leilão e ações financeiras, 2026-11-06 — Copa do Mundo apenas em cidades, 2026-11-06 — Empréstimo ao banco, 2026-11-06 — Sistema de apostas, Baseline de desempenho no Editor — 2026-11-06, Correção de atividade do cliente Unity WebGL — 2026-11-05, Efeitos temporários de cidade Unity no Editor — 2026-11-06 (+24 more)

### Community 78 - "fpsMeter.ts"
Cohesion: 0.22
Nodes (11): FrameRateProbe(), createFrameRateAccumulator(), FPS_IDLE_AFTER_MS, FPS_SAMPLE_WINDOW_MS, FrameRateAccumulator, FrameRateDisplay, FrameRateReading, readFrameRate() (+3 more)

### Community 79 - "services"
Cohesion: 0.13
Nodes (14): key, value, services, autoDeployTrigger, branch, buildCommand, envVars, name (+6 more)

### Community 82 - "wealthHeadwear.ts"
Cohesion: 0.33
Nodes (5): getWealthHeadwear(), OwnedProperty, RankedPlayer, players, WealthHeadwear

### Community 84 - "vite"
Cohesion: 0.40
Nodes (4): vite@^7.1.3, @vitejs/plugin-react@^5.0.2, vite, @vitejs/plugin-react

### Community 85 - "Relatório — leilão compartilhado"
Cohesion: 0.29
Nodes (5): Arquivos principais, Entrega, Limitações conhecidas, Relatório — leilão compartilhado, Validação

### Community 87 - "throwableTrajectory.ts"
Cohesion: 0.52
Nodes (5): ThrowableProjectile(), advanceThrowableElapsed(), getThrowableAimPoint(), getThrowableFlightPoint(), ThrowablePoint

### Community 89 - "@colyseus/sdk"
Cohesion: 0.40
Nodes (4): @colyseus/sdk@^0.18.8, @colyseus/sdk, resolveRoomServerUrl(), roomClient

### Community 90 - "Revisão visual low-poly das fichas"
Cohesion: 0.33
Nodes (5): Decisões, Fatos, Próximo passo, Revisão visual low-poly das fichas, Validação

### Community 91 - "Reformulação do conjunto de fichas"
Cohesion: 0.50
Nodes (3): Estado em 2026-11-06, Reformulação do conjunto de fichas, Validação

### Community 92 - "Prévia HTTPS do protótipo Unity Web — 2026-11-06"
Cohesion: 0.22
Nodes (8): Consulta da conta — 2026-11-06, Estado atual, Etapas para retomar a publicação, Fatos verificados no repositório, Ferramentas locais de publicação — 2026-11-06, Limites oficiais consultados em 2026-11-06, Proposta, ainda não aprovada, Prévia HTTPS do protótipo Unity Web — 2026-11-06

### Community 93 - "lobby.ts"
Cohesion: 0.12
Nodes (22): @react-three/drei@^10.5.1, @react-three/fiber@^9.3.0, @react-three/drei, @react-three/fiber, three, CharacterType, LobbyToken(), roots (+14 more)

### Community 96 - "Empréstimo ao banco — plano de implementação"
Cohesion: 0.29
Nodes (6): Atualização de juros e casa marcada — 2026-11-07, Decisões técnicas aplicadas, Empréstimo ao banco — plano de implementação, Implementação e validação, Passo a passo, Regras confirmadas

### Community 97 - "Revisão do salto e do navio"
Cohesion: 0.50
Nodes (3): Pedido e resultado, Revisão do salto e do navio, Validação

## Knowledge Gaps
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Andamento do projeto` connect `Andamento do projeto` to `Board`, `ANDAMENTO.md`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._
- **Why does `AnimatedPawn()` connect `Board` to `Seletor de fichas de personagem`, `pawnPlacement.ts`, `App.tsx`, `GameRoom`, `gameAudio.ts`, `lobby.ts`, `BoardScene.tsx`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Should `Validação visual e de navegador` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Why does `BoardScene()` connect `Andamento do projeto` to `BoardScene.tsx`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `Apostas — plano detalhado de implementação` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._