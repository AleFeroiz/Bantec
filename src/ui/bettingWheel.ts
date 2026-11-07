import { BET_CHANCE_SCALE } from '../../shared/betting'

export const BET_WHEEL_SPIN_DURATION_MS = 3_800
export const BET_WHEEL_REDUCED_MOTION_DURATION_MS = 250
export const BET_WHEEL_SPIN_TURNS = 5

export function betWheelWinDegrees(chance: number) {
  if (!Number.isFinite(chance)) return 0
  return Math.min(360, Math.max(0, chance / BET_CHANCE_SCALE * 360))
}

export function betWheelWinningRestRotation(chance: number) {
  return -betWheelWinDegrees(chance) / 2
}

export function betWheelTargetRotation(currentRotation: number, chance: number, won: boolean, fullTurns = BET_WHEEL_SPIN_TURNS) {
  if (!Number.isFinite(currentRotation) || !Number.isFinite(fullTurns) || fullTurns < 0) return 0
  const winDegrees = betWheelWinDegrees(chance)
  const targetSegmentCenter = won ? winDegrees / 2 : winDegrees + (360 - winDegrees) / 2
  const targetModulo = (360 - targetSegmentCenter + 360) % 360
  const currentModulo = ((currentRotation % 360) + 360) % 360
  const adjustment = (targetModulo - currentModulo + 360) % 360
  return currentRotation + Math.floor(fullTurns) * 360 + adjustment
}

export function betWheelOutcomeAtPointer(rotation: number, chance: number) {
  const winDegrees = betWheelWinDegrees(chance)
  const pointerAngle = ((-rotation % 360) + 360) % 360
  return pointerAngle < winDegrees
}
