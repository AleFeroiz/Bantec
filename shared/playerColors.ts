export const PLAYER_COLORS = ['#b3261e', '#2459c4', '#27843a', '#cc438f', '#bd5a0e', '#b38c0d', '#434b53', '#b7c4d5', '#693aa5', '#754a29', '#138f9c', '#609c25'] as const
export type PlayerColor = (typeof PLAYER_COLORS)[number]
export const PLAYER_COLOR_NAMES = ['Vermelho', 'Azul', 'Verde', 'Rosa', 'Laranja', 'Amarelo', 'Preto', 'Branco', 'Roxo', 'Marrom', 'Ciano', 'Lima'] as const

export const TEAM_COLOR_PALETTES = [
  { id: 'blue', name: 'Azul e ciano', baseColor: '#2459c4', memberColors: ['#2459c4', '#61d3df', '#138f9c'] },
  { id: 'red', name: 'Vermelho e laranja', baseColor: '#b3261e', memberColors: ['#b3261e', '#e88a38', '#dd5e43'] },
  { id: 'purple', name: 'Roxo e rosa', baseColor: '#693aa5', memberColors: ['#693aa5', '#cc438f', '#a876c6'] },
  { id: 'yellow', name: 'Amarelo e marrom', baseColor: '#b38c0d', memberColors: ['#b38c0d', '#754a29', '#e3c755'] },
  { id: 'mono', name: 'Branco e preto', baseColor: '#b7c4d5', memberColors: ['#f3f0e6', '#434b53', '#a9b4c0'] },
] as const

export type TeamPaletteColor = (typeof TEAM_COLOR_PALETTES)[number]['baseColor']

export function isPlayerColor(value: unknown): value is PlayerColor {
  return typeof value === 'string' && PLAYER_COLORS.some((color) => color === value)
}

export function isTeamPaletteColor(value: unknown): value is TeamPaletteColor {
  return TEAM_COLOR_PALETTES.some((palette) => palette.baseColor === value)
}

export function getTeamMemberColor(base: PlayerColor, memberIndex: number, teamSize: number) {
  const palette = TEAM_COLOR_PALETTES.find(({ baseColor }) => baseColor === base)
  if (!palette) return base
  const colorIndex = Math.min(Math.max(Math.floor(memberIndex), 0), Math.min(teamSize, palette.memberColors.length) - 1)
  return palette.memberColors[colorIndex] ?? base
}
