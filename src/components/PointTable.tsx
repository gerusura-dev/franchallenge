import { franChallengeHands } from '../util/constants'
import PointCard from './PointCard'

export default function PointTable() {
  return (
    <>
      <div style={{marginTop: '3rem'}}>
        <h1 className="title">役一覧</h1>
        {franChallengeHands.map(hand => (
          <PointCard
            key={hand.name}
            name={hand.name}
            description={hand.description}
            points={hand.points}
            probability={hand.probability}
            type={hand.type}
          />
        ))}
      </div>
    </>
  )
}
