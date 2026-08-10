import 'bulma/css/bulma.css'
import {useState, type ChangeEvent} from 'react'
import type { FranChallengeToken, FranChallengeHand } from '../util/types'
import { franChallengeTokens } from '../util/judge'
import { franChallengeHands } from '../util/hands'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [role, setRole] = useState('')
  const [score, setScore] = useState(0)
  const [isJudged, setIsJudged] = useState(false)

  const isFranChallengeToken = (t: string): t is FranChallengeToken =>
    (franChallengeTokens as readonly string[]).includes(t)

  const tokenize = (s: string): FranChallengeToken[] => {
    s = s.trim()
    const tokens: FranChallengeToken[] = []

    for (let i = 0; i < s.length;) {
      if (s.slice(i, i + 2) === 'ちゃ') {
        tokens.push('ちゃ')
        i += 2
        continue
      }

      const tokenWithoutCha = s[i]
      if (!isFranChallengeToken(tokenWithoutCha)) {
        return []
      }

      tokens.push(tokenWithoutCha)
      i += 1
    }

    return tokens
  }

  const getScoreString = () => `点数：${score.toLocaleString('ja-JP')}点`

  const processInput = () => {
    const tokens = tokenize(inputText)

    if (tokens.length <= 0 || tokens.length >= 6) {
      setRole('役なし')
      setScore(0)
      setIsJudged(true)
      return
    }

    const canCompositeHands: FranChallengeHand[] = []
    const cannotCompositeHands: FranChallengeHand[] = []
    const pokerHands: FranChallengeHand[] = []

    for (const hand of franChallengeHands) {
      if (hand.isPokerHand) {
        pokerHands.push(hand)
        continue
      }
      (hand.canComposite ? canCompositeHands : cannotCompositeHands).push(hand)
    }

    for (const hand of cannotCompositeHands.sort((a, b) => b.points - a.points)) {
      // 得点の降順で判定
      if (hand.judgeFunction(tokens)) {
        setRole(hand.name)
        setScore(hand.points)
        setIsJudged(true)

        return
      }
    }

    const appliedHands: FranChallengeHand[] = []

    for (const hand of canCompositeHands) {
      if (hand.judgeFunction(tokens)) {
        appliedHands.push(hand)
      }
    }

    for (const hand of pokerHands.sort((a, b) => b.points - a.points)) {
      if (hand.judgeFunction(tokens)) {
        appliedHands.push(hand)
        break
      }
    }

    setRole(appliedHands.map(h => h.name).join('\n'))
    setScore(appliedHands.reduce((acc, cur) => acc += cur.points, 0))
    setIsJudged(true);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setRole('');
    setScore(0);
    setIsJudged(false);
  }

  const handlePostToX = () => {
    const text = `${inputText}\n\n${role}\n\n${getScoreString()}\n\n#ふらんちゃんチャレンジ\nhttps://franchallenge.web.app`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <>
      <div>
        <h1 className="title">FranChallenge!</h1>
        <h2 className="subtitle">自動判定機</h2>

        <div className="card">
          <div style={{marginBottom: '0.5rem'}}>
            <p style={{marginBottom: "0.5rem", whiteSpace: 'pre-line'}}>{role}</p>
            <p>{getScoreString()}</p>
          </div>

          <div>
            <input
              className="input is-primary"
              style={{marginBottom: '0.5rem'}}
              value={inputText}
              onChange={handleChange}
            />

            {isJudged ? (
              <button
                className="button is-info"
                onClick={handlePostToX}
              >Xに投稿</button>
            ) : (
              <button
                className="button is-primary"
                onClick={processInput}
              >判定！</button>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
