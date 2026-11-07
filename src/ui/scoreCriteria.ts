import type { GameMode } from '../../shared/lobby'

export type FinalScorePlayer = {
  sessionId: string
  finalCash: number
  finalNetWorth: number
  tieBreakRoll: number
}

export function finalScoreMetrics(mode: GameMode) {
  void mode
  return { primaryLabel: 'Patrimônio final', secondaryLabel: 'Saldo final' }
}

export function rankFinalScore<T extends FinalScorePlayer>(players: T[], mode: GameMode, winnerSessionId: string) {
  return [...players].sort((first, second) => {
    if (first.sessionId === winnerSessionId) return -1
    if (second.sessionId === winnerSessionId) return 1
    void mode
    const primary = second.finalNetWorth - first.finalNetWorth
    return primary || second.finalNetWorth - first.finalNetWorth || second.tieBreakRoll - first.tieBreakRoll
  })
}

export type FinalTeamScorePlayer = FinalScorePlayer & { name: string; teamId?: number; isBankrupt?: boolean }

export function rankFinalTeamScore<T extends FinalTeamScorePlayer>(players: T[], winnerSessionId: string) {
  const teams = new Map<number, T[]>()
  for (const player of players) {
    if (player.isBankrupt) continue
    const teamId = player.teamId ?? 0
    const members = teams.get(teamId) ?? []
    members.push(player)
    teams.set(teamId, members)
  }
  return [...teams.entries()].map(([teamId, members]) => ({
    ...members[0]!,
    sessionId: members.some((member) => member.sessionId === winnerSessionId) ? winnerSessionId : members[0]!.sessionId,
    name: `Equipe ${teamId + 1} · ${members.map((member) => member.name).join(' + ')}`,
    finalCash: members.reduce((sum, member) => sum + member.finalCash, 0),
    finalNetWorth: members.reduce((sum, member) => sum + member.finalNetWorth, 0),
    tieBreakRoll: Math.max(...members.map((member) => member.tieBreakRoll)),
  })).sort((first, second) => (second.sessionId === winnerSessionId ? 1 : 0) - (first.sessionId === winnerSessionId ? 1 : 0) || second.finalNetWorth - first.finalNetWorth || second.tieBreakRoll - first.tieBreakRoll)
}

export function scoreCriteria(mode: GameMode) {
  void mode
  return 'Critério: patrimônio após liquidação · desempate: dados.'
}
