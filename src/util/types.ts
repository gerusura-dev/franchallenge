export type FranChallengeToken = 'ふ' | 'ら' | 'ん' | 'ちゃ'

export type FranChallengeString = `${FranChallengeToken}${FranChallengeToken}${FranChallengeToken}${FranChallengeToken}${FranChallengeToken}`

export type FranChallengeStringFragment
  = `${FranChallengeToken}${FranChallengeToken}`
  | `${FranChallengeToken}${FranChallengeToken}${FranChallengeToken}`
  | `${FranChallengeToken}${FranChallengeToken}${FranChallengeToken}${FranChallengeToken}`

export type FranChallengeHandType = 'COMPOSITE' | 'NOT_COMPOSITE' | 'POKER'

export type FranChallengeHand = {
  name: string,
  description: string,
  points: number,
  probability?: number,
  type: FranChallengeHandType,
  judgeFunction: (tokens: FranChallengeToken[]) => boolean,
}

export type PokerHand = 'ONE_PAIR' | 'TWO_PAIR' | 'THREE_OF_A_KIND' | 'FOUR_OF_A_KIND' | 'FULL_HOUSE'
