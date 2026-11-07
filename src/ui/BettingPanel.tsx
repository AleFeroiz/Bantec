import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type { Room } from '@colyseus/sdk'
import { BET_MINIMUM, BET_STEP, betLimit, betPayout, type BetBand, type BetOffer } from '../../shared/betting'
import { BET_WHEEL_REDUCED_MOTION_DURATION_MS, BET_WHEEL_SPIN_DURATION_MS, betWheelTargetRotation, betWheelWinDegrees, betWheelWinningRestRotation } from './bettingWheel'
import { getBettingPanelPosition } from './bettingPanelPosition'

type BetReceipt = { requestId: string; offerId: string; amount: number; optionId: string; won: boolean; payout: number; net: number }
type Props = { room: Room; cash: number; startingCash: number; tickets: number; lapRevision: number; isInDebt: boolean; isEnded: boolean }
const formatMoney = (amount: number) => `R$ ${amount.toLocaleString('pt-BR')}`
const BAND_LABEL: Record<BetBand, string> = { safer: 'SEGURO', balanced: 'ARRISCADO', 'long-shot': 'MALUCO' }

function TicketIcon({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 32" aria-hidden="true" focusable="false">
    <path d="M4 4h40v8a4 4 0 0 0 0 8v8H4v-8a4 4 0 0 0 0-8V4Z" fill="currentColor" />
    <path d="M24 7v3m0 4v3m0 4v3m0 4v1" fill="none" stroke="#fff9e7" strokeLinecap="round" strokeWidth="2" strokeDasharray="1 1" />
    <path d="M9 9h9m-9 14h9" fill="none" stroke="#fff9e7" strokeLinecap="round" strokeWidth="2" opacity=".9" />
  </svg>
}

export function BettingPanel({ room, cash, startingCash, tickets, lapRevision, isInDebt, isEnded }: Props) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(BET_MINIMUM)
  const [offers, setOffers] = useState<BetOffer[]>([])
  const [offerRevision, setOfferRevision] = useState(-1)
  const [selectedOfferId, setSelectedOfferId] = useState('')
  const [receipt, setReceipt] = useState<BetReceipt | null>(null)
  const [pending, setPending] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [wheelChance, setWheelChance] = useState(6000)
  const [spinDuration, setSpinDuration] = useState(BET_WHEEL_SPIN_DURATION_MS)
  const [spinOffer, setSpinOffer] = useState<BetOffer | null>(null)
  const [error, setError] = useState('')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const offersRef = useRef<BetOffer[]>([])
  const pendingOfferRef = useRef<BetOffer | null>(null)
  const presentedRequestIdsRef = useRef(new Set<string>())
  const wheelRotationRef = useRef(0)
  const spinTimerRef = useRef<number | undefined>(undefined)
  const [panelPosition, setPanelPosition] = useState({ left: 12, top: 12, width: 300, maxHeight: 400 })
  const limit = betLimit(startingCash, cash)
  const selectedOffer = useMemo(() => offers.find((offer) => offer.id === selectedOfferId) ?? offers[0] ?? null, [offers, selectedOfferId])
  const currentReceipt = receipt && (offers.some((offer) => offer.offerId === receipt.offerId) || spinning || pending) ? receipt : null
  offersRef.current = offers

  useEffect(() => {
    const removeOffers = room.onMessage<{ lapRevision: number; offers: BetOffer[]; receipt: BetReceipt | null }>('bet:offers', (data) => {
      offersRef.current = data.offers
      setOffers(data.offers)
      setOfferRevision(data.lapRevision)
      setReceipt(data.receipt)
      const receiptOffer = data.receipt ? data.offers.find((offer) => offer.offerId === data.receipt?.offerId && offer.id === data.receipt?.optionId) : undefined
      setSelectedOfferId((current) => receiptOffer?.id ?? (data.offers.some((offer) => offer.id === current) ? current : data.offers[0]?.id ?? ''))
      if (data.receipt && receiptOffer) {
        setAmount(data.receipt.amount)
        setWheelChance(receiptOffer.chance)
        const staticResultRotation = betWheelTargetRotation(0, receiptOffer.chance, data.receipt.won, 0)
        wheelRotationRef.current = staticResultRotation
        setWheelRotation(staticResultRotation)
      }
      setError('')
    })
    const removeResult = room.onMessage<BetReceipt>('bet:result', (data) => {
      setReceipt(data)
      setError('')
      if (presentedRequestIdsRef.current.has(data.requestId)) return
      const offer = offersRef.current.find((candidate) => candidate.offerId === data.offerId && candidate.id === data.optionId) ?? pendingOfferRef.current
      if (!offer) { setPending(false); return }
      presentedRequestIdsRef.current.add(data.requestId)
      pendingOfferRef.current = offer
      setSpinOffer(offer)
      setWheelChance(offer.chance)
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const duration = reducedMotion ? BET_WHEEL_REDUCED_MOTION_DURATION_MS : BET_WHEEL_SPIN_DURATION_MS
      const nextRotation = betWheelTargetRotation(wheelRotationRef.current, offer.chance, data.won)
      wheelRotationRef.current = nextRotation
      setWheelRotation(nextRotation)
      setSpinDuration(duration)
      setSpinning(true)
      setPending(true)
      if (spinTimerRef.current !== undefined) window.clearTimeout(spinTimerRef.current)
      spinTimerRef.current = window.setTimeout(() => {
        setSpinning(false)
        setPending(false)
        pendingOfferRef.current = null
        spinTimerRef.current = undefined
      }, duration)
    })
    const removeRejected = room.onMessage<{ message: string }>('bet:rejected', (data) => { setPending(false); pendingOfferRef.current = null; setError(data.message) })
    return () => { removeOffers(); removeResult(); removeRejected() }
  }, [room])

  useEffect(() => {
    if (offerRevision !== lapRevision) {
      offersRef.current = []
      setOffers([])
      setOfferRevision(-1)
      if (spinning) return
      setReceipt(null)
      setSelectedOfferId('')
      setPending(false)
      pendingOfferRef.current = null
    }
  }, [lapRevision, offerRevision, spinning])

  useEffect(() => { setAmount((current) => Math.min(current, Math.max(BET_MINIMUM, Math.floor(limit / BET_STEP) * BET_STEP))) }, [limit])
  useEffect(() => () => { if (spinTimerRef.current !== undefined) window.clearTimeout(spinTimerRef.current) }, [])
  useEffect(() => {
    if (!open) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || pending || spinning) return
      event.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, pending, spinning])
  useEffect(() => {
    if (!selectedOffer || spinning) return
    setWheelChance(selectedOffer.chance)
    if (!currentReceipt || currentReceipt.optionId !== selectedOffer.id) {
      const restRotation = betWheelWinningRestRotation(selectedOffer.chance)
      wheelRotationRef.current = restRotation
      setWheelRotation(restRotation)
    }
  }, [selectedOffer, spinning, currentReceipt])

  const disabledReason = isEnded ? 'A partida terminou.' : isInDebt ? 'Quite sua dívida antes de apostar.' : tickets === 0 ? 'Você não tem ingressos. Passe pela Partida para ganhar +1 ingresso.' : limit < BET_MINIMUM ? 'Você precisa ter pelo menos R$ 10.000 disponíveis.' : ''
  const changeAmount = (delta: number) => setAmount((value) => Math.max(BET_MINIMUM, Math.min(limit, Math.round((value + delta) / BET_STEP) * BET_STEP)))
  const updatePanelPosition = useCallback(() => {
    const anchor = triggerRef.current?.getBoundingClientRect()
    if (!anchor) return
    const viewport = window.visualViewport
    const width = viewport?.width ?? window.innerWidth
    const height = viewport?.height ?? window.innerHeight
    const panel = panelRef.current
    setPanelPosition(getBettingPanelPosition(
      { left: anchor.left, right: anchor.right, top: anchor.top },
      { width: panel?.offsetWidth ?? 390, height: panel?.scrollHeight ?? 500 },
      { width, height, offsetLeft: viewport?.offsetLeft ?? 0, offsetTop: viewport?.offsetTop ?? 0 },
      width <= 640,
    ))
  }, [])

  useLayoutEffect(() => {
    if (!open) return
    updatePanelPosition()
    const observer = new ResizeObserver(updatePanelPosition)
    if (panelRef.current) observer.observe(panelRef.current)
    window.addEventListener('resize', updatePanelPosition)
    window.visualViewport?.addEventListener('resize', updatePanelPosition)
    window.visualViewport?.addEventListener('scroll', updatePanelPosition)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updatePanelPosition)
      window.visualViewport?.removeEventListener('resize', updatePanelPosition)
      window.visualViewport?.removeEventListener('scroll', updatePanelPosition)
    }
  }, [open, updatePanelPosition, offers, selectedOfferId, amount, spinning, receipt, error])

  if (isEnded) return null
  const controlsDisabled = pending || spinning || tickets === 0 || isInDebt || amount > limit || !selectedOffer || offerRevision !== lapRevision
  const summaryOffer = spinning ? spinOffer ?? selectedOffer : selectedOffer
  const stakeAmount = spinning && currentReceipt ? currentReceipt.amount : amount
  const totalPayout = summaryOffer ? betPayout(stakeAmount, summaryOffer) : 0
  const netProfit = totalPayout - stakeAmount
  const wheelAngle = betWheelWinDegrees(wheelChance)
  const wheelStyle = {
    '--bet-win-angle': `${wheelAngle}deg`,
    transform: `rotate(${wheelRotation}deg)`,
    transitionDuration: `${spinning ? spinDuration : 0}ms`,
  } as CSSProperties

  return <div className="betting-control">
    <button ref={triggerRef} type="button" aria-label={`Apostas, ${tickets} ${tickets === 1 ? 'ingresso' : 'ingressos'}`} aria-expanded={open} aria-controls="betting-panel" disabled={pending || spinning} onClick={() => { const next = !open; setOpen(next); if (next) room.send('requestBetOffers') }}><span className="bet-ticket-trigger-icon"><TicketIcon /></span><small>APOSTAS</small><b className="bet-ticket-trigger-count">{tickets}</b></button>
    {open && createPortal(<section ref={panelRef} id="betting-panel" className="betting-panel" aria-label="Apostas" data-camera-drag="off" style={{ left: panelPosition.left, top: panelPosition.top, width: panelPosition.width, maxHeight: panelPosition.maxHeight }}>
      <header><strong>APOSTAS</strong><span className="bet-ticket-counter" aria-label={`${tickets} ${tickets === 1 ? 'ingresso disponível' : 'ingressos disponíveis'}`}><TicketIcon /><b>{tickets}</b></span><button type="button" aria-label="Fechar apostas" disabled={pending || spinning} onClick={() => setOpen(false)}>×</button></header>
      <p className="bet-intro">Você começa com 1 ingresso. Cada passagem pela Partida concede +1; eles acumulam.</p>
      {disabledReason && <p className="bet-disabled-reason" role="status">{disabledReason}</p>}
      {offers.length === 0 ? <p role="status">Carregando opções…</p> : <>
        <div className="bet-main-grid">
          <div className="bet-amount">
            <small>VALOR APOSTADO</small>
            <strong>{formatMoney(stakeAmount)}</strong>
            <div className="bet-amount-steps">
              <button type="button" aria-label="Diminuir aposta em R$ 100.000" disabled={controlsDisabled || amount <= BET_MINIMUM} onClick={() => changeAmount(-100_000)}>−100k</button>
              <button type="button" aria-label="Diminuir aposta em R$ 10.000" disabled={controlsDisabled || amount <= BET_MINIMUM} onClick={() => changeAmount(-10_000)}>−10k</button>
              <button type="button" aria-label="Aumentar aposta em R$ 10.000" disabled={controlsDisabled || amount >= limit} onClick={() => changeAmount(10_000)}>+10k</button>
              <button type="button" aria-label="Aumentar aposta em R$ 100.000" disabled={controlsDisabled || amount >= limit} onClick={() => changeAmount(100_000)}>+100k</button>
            </div>
            <span>Limite {formatMoney(limit)}</span>
          </div>
          <div className="bet-wheel-column">
            <div className={`bet-wheel${spinning ? ' is-spinning' : ''}`} role="img" aria-label={spinning ? 'Roleta da aposta girando' : `Roleta: ${(wheelChance / 100).toLocaleString('pt-BR')}% de chance de vitória`}>
              <span className="bet-wheel-pointer" aria-hidden="true" />
              <div className="bet-wheel-disc" style={wheelStyle} aria-hidden="true"><span>✦</span></div>
            </div>
            <div className="bet-wheel-legend" aria-hidden="true"><span><i className="win" /> Vitória</span><span><i className="loss" /> Derrota</span></div>
          <div className="bet-payout-summary" aria-live="polite">
              <strong>{spinning ? 'A roleta está girando…' : summaryOffer ? `Lucro líquido: ${formatMoney(netProfit)}` : 'Selecione uma opção'}</strong>
              {summaryOffer && <span>Total recebido ao vencer: {formatMoney(totalPayout)}</span>}
            </div>
          </div>
        </div>
        <div className="bet-profile-options" role="group" aria-label="Escolha o perfil de risco">
          {offers.map((offer) => <button key={offer.id} type="button" className={selectedOffer?.id === offer.id ? 'selected' : ''} aria-pressed={selectedOffer?.id === offer.id} disabled={controlsDisabled} onClick={() => setSelectedOfferId(offer.id)}>
            <strong>{BAND_LABEL[offer.band]}</strong><span>{(offer.chance / 100).toLocaleString('pt-BR')}% chance</span>
          </button>)}
        </div>
        {error && <p role="alert">{error}</p>}
        {pending && !spinning && <p role="status">Confirmando aposta…</p>}
        {currentReceipt && !spinning && <p className={`bet-result ${currentReceipt.won ? 'won' : 'lost'}`} role="status" aria-live="assertive">{currentReceipt.won ? `Você ganhou! Lucro líquido de ${formatMoney(currentReceipt.net)}. Total recebido: ${formatMoney(currentReceipt.payout)}.` : `Você perdeu ${formatMoney(currentReceipt.amount)}.`}</p>}
        <button type="button" className="bet-confirm-button" disabled={controlsDisabled || !selectedOffer} onClick={() => {
          if (!selectedOffer || controlsDisabled) return
          pendingOfferRef.current = selectedOffer
          setPending(true)
          setError('')
          room.send('placeBet', { requestId: crypto.randomUUID(), offerId: selectedOffer.offerId, optionId: selectedOffer.id, amount })
        }}>{spinning ? 'Girando…' : pending ? 'Confirmando…' : `Apostar ${formatMoney(amount)}`}</button>
      </>}
    </section>, document.body)}
  </div>
}
