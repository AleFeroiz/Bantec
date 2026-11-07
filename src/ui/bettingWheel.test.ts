import { describe, expect, it } from 'vitest'
import { betWheelOutcomeAtPointer, betWheelTargetRotation, betWheelWinDegrees, betWheelWinningRestRotation } from './bettingWheel'

describe('roleta das apostas', () => {
  it('dimensiona a área de vitória segundo a chance exata', () => {
    expect(betWheelWinDegrees(6000)).toBe(216)
    expect(betWheelWinDegrees(1500)).toBe(54)
    expect(betWheelWinDegrees(0)).toBe(0)
    expect(betWheelWinDegrees(20_000)).toBe(360)
  })

  it('deixa o ponteiro no centro do setor de vitória antes da aposta', () => {
    const rotation = betWheelWinningRestRotation(6000)
    expect(betWheelOutcomeAtPointer(rotation, 6000)).toBe(true)
    expect(rotation).toBe(-108)
  })

  it('para o ponteiro dentro do setor correspondente ao resultado autoritativo', () => {
    const winRotation = betWheelTargetRotation(0, 6000, true)
    const lossRotation = betWheelTargetRotation(0, 6000, false)
    expect(betWheelOutcomeAtPointer(winRotation, 6000)).toBe(true)
    expect(betWheelOutcomeAtPointer(lossRotation, 6000)).toBe(false)
    expect(winRotation).toBeGreaterThanOrEqual(5 * 360)
    expect(lossRotation).toBeGreaterThanOrEqual(5 * 360)
  })

  it('calcula destino a partir da rotação que a roleta já tem', () => {
    const currentRotation = 7 * 360 + 190
    const target = betWheelTargetRotation(currentRotation, 1500, false)
    expect(target).toBeGreaterThan(currentRotation + 4 * 360)
    expect(betWheelOutcomeAtPointer(target, 1500)).toBe(false)
  })
})
