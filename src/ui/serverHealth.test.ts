import { describe, expect, it, vi } from 'vitest'
import { checkServerHealth } from './serverHealth'

describe('disponibilidade do servidor', () => {
  it('confirma apenas uma resposta válida do servidor de salas', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'ok' }) })
    expect(await checkServerHealth('https://salas.example/', new AbortController().signal, fetcher)).toBe(true)
    expect(fetcher).toHaveBeenCalledWith('https://salas.example/health', expect.objectContaining({ cache: 'no-store' }))
    expect(await checkServerHealth('https://salas.example', new AbortController().signal, vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }))).toBe(false)
  })

  it('trata erro HTTP, interrupção e resposta inválida como inacessível', async () => {
    const signal = new AbortController().signal
    expect(await checkServerHealth('http://localhost:2567', signal, vi.fn().mockResolvedValue({ ok: false }))).toBe(false)
    expect(await checkServerHealth('http://localhost:2567', signal, vi.fn().mockRejectedValue(new Error('offline')))).toBe(false)
    expect(await checkServerHealth('http://localhost:2567', signal, vi.fn().mockResolvedValue({ ok: true, json: async () => { throw new Error('bad json') } }))).toBe(false)
  })
})
