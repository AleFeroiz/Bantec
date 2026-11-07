export const PLAYER_COLORS = ['#b3261e', '#2459c4', '#27843a', '#cc438f', '#bd5a0e', '#b38c0d', '#434b53', '#b7c4d5', '#693aa5', '#754a29', '#138f9c', '#609c25'] as const
export type PlayerColor = (typeof PLAYER_COLORS)[number]
export const PLAYER_COLOR_NAMES = ['Vermelho', 'Azul', 'Verde', 'Rosa', 'Laranja', 'Amarelo', 'Preto', 'Branco', 'Roxo', 'Marrom', 'Ciano', 'Lima'] as const

export function isPlayerColor(value: unknown): value is PlayerColor {
  return typeof value === 'string' && PLAYER_COLORS.some((color) => color === value)
}

function mix(color: string, target: number, amount: number) {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(color.slice(offset, offset + 2), 16))
  return `#${channels.map((channel) => Math.round(channel + (target - channel) * amount).toString(16).padStart(2, '0')).join('')}`
}

export function getTeamMemberColor(base: PlayerColor, memberIndex: number, teamSize: number) {
  if (teamSize === 2) return memberIndex === 0 ? mix(base, 255, 0.58) : mix(base, 0, 0.72)
  return memberIndex === 0 ? mix(base, 255, 0.58) : memberIndex === 1 ? base : mix(base, 0, 0.72)
}
