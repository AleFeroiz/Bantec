export type RevealKind = 'event' | 'world-cup' | 'world-tour'

export function shouldShowLocalNoTarget(isLocalPlayer: boolean, hasNoLocalTarget: boolean) {
  return isLocalPlayer && hasNoLocalTarget
}

export function getSpecialRevealCopy(kind: Exclude<RevealKind, 'event'>, isLocalPlayer: boolean, playerName: string, multiplier: string) {
  const player = playerName || 'A pessoa da vez'
  if (kind === 'world-tour') return isLocalPlayer
    ? { title: 'Escolha para onde viajar', description: 'Toque em uma casa iluminada. Propriedades de outras pessoas ficam indisponíveis.' }
    : { title: `${player} escolhe o destino`, description: 'Aguarde a escolha da casa de destino.' }
  return isLocalPlayer
    ? { title: 'Escolha a sede', description: `Toque em uma cidade sua iluminada no tabuleiro. O aluguel da sede valerá ${multiplier}×.` }
    : { title: `${player} escolhe a sede`, description: `Aguarde a escolha da cidade-sede. O aluguel da sede valerá ${multiplier}×.` }
}

export function getRevealKicker(kind: RevealKind) {
  if (kind === 'world-cup') return 'COPA DO MUNDO'
  if (kind === 'world-tour') return 'VOLTA AO BRASIL'
  return 'SORTE OU REVÉS'
}
