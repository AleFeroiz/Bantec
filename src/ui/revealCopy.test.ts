import { describe, expect, it } from 'vitest'
import { getRevealKicker, getSpecialRevealCopy } from './revealCopy.js'

describe('títulos das revelações', () => {
  it('dá instruções apenas à pessoa que pode escolher', () => {
    expect(getSpecialRevealCopy('world-tour', true, 'Ana', '2')).toEqual({ title: 'Escolha para onde viajar', description: 'Toque em uma casa iluminada. Propriedades de outras pessoas ficam indisponíveis.' })
    expect(getSpecialRevealCopy('world-tour', false, 'Bot 1', '2')).toEqual({ title: 'Bot 1 escolhe o destino', description: 'Aguarde a escolha da casa de destino.' })
    expect(getSpecialRevealCopy('world-cup', false, 'Ana', '2')).toEqual({ title: 'Ana escolhe a sede', description: 'Aguarde a escolha da cidade-sede. O aluguel da sede valerá 2×.' })
  })
  it('usa os nomes vigentes das casas especiais', () => {
    expect(getRevealKicker('world-cup')).toBe('COPA DO MUNDO')
    expect(getRevealKicker('world-tour')).toBe('VOLTA AO BRASIL')
  })

  it('mantém a identificação do baralho de eventos', () => {
    expect(getRevealKicker('event')).toBe('SORTE OU REVÉS')
  })
})
