import { describe, expect, it } from 'vitest'
import { getTeamMemberColor, isPlayerColor, isTeamPaletteColor, PLAYER_COLORS, PLAYER_COLOR_NAMES, TEAM_COLOR_PALETTES } from './playerColors.js'

describe('cores do lobby', () => {
  it('oferece doze cores distintas com um nome para cada uma', () => {
    expect(PLAYER_COLORS).toHaveLength(12)
    expect(new Set(PLAYER_COLORS).size).toBe(12)
    expect(PLAYER_COLOR_NAMES).toHaveLength(12)
    expect(PLAYER_COLOR_NAMES).toEqual(['Vermelho', 'Azul', 'Verde', 'Rosa', 'Laranja', 'Amarelo', 'Preto', 'Branco', 'Roxo', 'Marrom', 'Ciano', 'Lima'])
    expect(PLAYER_COLORS).toEqual(['#b3261e', '#2459c4', '#27843a', '#cc438f', '#bd5a0e', '#b38c0d', '#434b53', '#b7c4d5', '#693aa5', '#754a29', '#138f9c', '#609c25'])
  })

  it('valida todas as cores disponíveis e rejeita valores não listados', () => {
    for (const color of PLAYER_COLORS) expect(isPlayerColor(color)).toBe(true)
    expect(isPlayerColor('#ffffff')).toBe(false)
  })

  it('oferece paletas de equipe prontas, com cores próximas e distintas', () => {
    expect(TEAM_COLOR_PALETTES.map((palette) => palette.name)).toEqual([
      'Azul e ciano', 'Vermelho e laranja', 'Roxo e rosa', 'Amarelo e marrom', 'Branco e preto',
    ])
    expect(TEAM_COLOR_PALETTES.every((palette) => new Set(palette.memberColors).size === 3)).toBe(true)
    for (const palette of TEAM_COLOR_PALETTES) expect(isTeamPaletteColor(palette.baseColor)).toBe(true)
    expect(isTeamPaletteColor('#138f9c')).toBe(false)
  })

  it('usa azul e ciano na dupla e entrega três cores próximas no trio', () => {
    expect([0, 1].map((index) => getTeamMemberColor('#2459c4', index, 2))).toEqual(['#2459c4', '#61d3df'])
    expect([0, 1, 2].map((index) => getTeamMemberColor('#2459c4', index, 3))).toEqual(['#2459c4', '#61d3df', '#138f9c'])
  })

  it('mantém o branco legível no tabuleiro dentro da paleta monocromática', () => {
    expect([0, 1, 2].map((index) => getTeamMemberColor('#b7c4d5', index, 3))).toEqual(['#f3f0e6', '#434b53', '#a9b4c0'])
  })
})
