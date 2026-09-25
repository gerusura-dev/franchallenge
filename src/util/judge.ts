import type { FranChallengeToken, FranChallengeString, FranChallengeStringFragment, PokerHand } from './types'
import { franChallengeTokens } from './constants'

// 完全一致・部分一致の判定関数を返す関数
export const equalsTo = (target: FranChallengeString) => (tokens: FranChallengeToken[]) => tokens.join('') === target
export const includes = (target: FranChallengeStringFragment) => (tokens: FranChallengeToken[]) => tokens.join('').includes(target)

// 通常役
export const personalMirror = (tokens: FranChallengeToken[]) => tokens[0] === tokens[4] && tokens[1] === tokens[3]
export const kaminokuZoroe = (tokens: FranChallengeToken[]) => tokens.join('').startsWith('ふらん')
export const shimonokuZoroe = (tokens: FranChallengeToken[]) => tokens.join('').endsWith('ちゃん')
export const manjouIcchi = (tokens: FranChallengeToken[]) => tokens.every(t => t === tokens[0])

export const junfudouMyouou = (tokens: FranChallengeToken[]) => {
  const tokenCount = Object.fromEntries(franChallengeTokens.map(t => [t, 0]))
  for (const token of tokens) {
    tokenCount[token]++
  }
  return franChallengeTokens.every(t => tokenCount[t] === (t === 'ん' ? 2 : 1))
}

export const dareyoSonoOnna = (tokens: FranChallengeToken[]) => {
  if (!shimonokuZoroe(tokens)) {
    return false
  }
  const allowed: FranChallengeToken[] = franChallengeTokens.filter(t => t !== 'ちゃ')
  return allowed.includes(tokens[0]) && allowed.includes(tokens[1]) && allowed.includes(tokens[2])
}

export const franMisui = (tokens: FranChallengeToken[]) => {
  const correctTokens = ['ふ', 'ら', 'ん', 'ちゃ', 'ん'] as const
  return tokens.filter((token, i) => token === correctTokens[i]).length === 4
}

const judgePokerHands = (tokens: FranChallengeToken[]) => {
  // 1番目、2番目に多いトークンを求める
  const tokenCounts = tokens.reduce<Partial<Record<FranChallengeToken, number>>>((acc, cur) => {
    acc[cur] = (acc[cur] ?? 0) + 1
    return acc
  }, {})
  const [ first, second ] = Object.values(tokenCounts).sort((a, b) => b - a)

  const countsPattern: `${number},${number | 'n'}` = `${first},${second === 2 ? 2 : 'n'}`
  const patternHandMap: Partial<Record<typeof countsPattern, PokerHand>> = {
    '4,n': 'FOUR_OF_A_KIND',
    '3,2': 'FULL_HOUSE',
    '3,n': 'THREE_OF_A_KIND',
    '2,2': 'TWO_PAIR',
    '2,n': 'ONE_PAIR',
  } as const

  return patternHandMap[countsPattern]
}

// ポーカー役
export const fuOneChan = (tokens: FranChallengeToken[]) => judgePokerHands(tokens) === 'ONE_PAIR'
export const fuRyanChan = (tokens: FranChallengeToken[]) => judgePokerHands(tokens) === 'TWO_PAIR'
export const dekosukeYarou = (tokens: FranChallengeToken[]) => judgePokerHands(tokens) === 'THREE_OF_A_KIND'
export const fourToNakuInu = (tokens: FranChallengeToken[]) => judgePokerHands(tokens) === 'FOUR_OF_A_KIND'
export const furaHouse = (tokens: FranChallengeToken[]) => judgePokerHands(tokens) === 'FULL_HOUSE'
