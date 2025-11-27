import 'bulma/css/bulma.css'
import {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import {faAngleUp} from "@fortawesome/free-solid-svg-icons"

type PointCardProps = {
    title: string
    description?: string
    points?: number | string
    defaultCollapsed?: boolean
}

function PointTable() {
    return (
        <>
            <div style={{marginTop: '3rem'}}>
                <h1 className="title">役一覧</h1>
                <PointCard
                    title={'ふらんちゃん：単独役'}
                    description={'「ふらんちゃん」の並びになっている'}
                    points={'5,000,000'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'逆から読んでも：単独役'}
                    description={'「んちゃんらふ」の並びになっている'}
                    points={'25,000'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'順不同明王：複合役'}
                    description={'「ふ」「ら」「ちゃ」が1つずつ、「ん」が2つ入っている'}
                    points={'5'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'満場一致：複合役'}
                    description={'5文字全てがいずれか1種類の文字'}
                    points={'3'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'上の句揃え：複合役'}
                    description={'「ふらん」から始まる'}
                    points={'2'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'下の句揃え：複合役'}
                    description={'「ちゃん」で終わる'}
                    points={'2'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'ロケットランチャー：複合役'}
                    description={'「らんちゃ」が入っている'}
                    points={'2'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'出荷よ(´・ω・`)：複合役'}
                    description={'「らんらん」が入っている'}
                    points={'2'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'一心ふらん：複合役'}
                    description={'「ふらん」が入っている'}
                    points={'1'}
                    defaultCollapsed={true}
                />
                <PointCard
                    title={'ワンちゃんある：複合役'}
                    description={'「ちゃん」が入っている'}
                    points={'1'}
                    defaultCollapsed={true}
                />
            </div>
        </>
    )
}

function PointCard({title, description, points, defaultCollapsed = true}: PointCardProps) {
    const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed)

    return (
        <>
            <div style={{marginTop: '2rem', width: '80vw', maxWidth: '600px'}}>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">{title}</p>
                        <button
                            className="card-header-icon"
                            aria-label="toggle content"
                            aria-expanded={!collapsed}
                            onClick={() => setCollapsed(prev => !prev)}
                        >
                            <span className="icon">
                                <FontAwesomeIcon icon={collapsed ? faAngleDown : faAngleUp}/>
                            </span>
                        </button>
                    </header>
                    {!collapsed && description && (
                        <div className="card-content">
                            <div className="content">{description}</div>
                        </div>
                    )}
                    {!collapsed && points !== undefined && (
                        <footer className="card-footer">
                            <p className="card-footer-item">{points}点</p>
                        </footer>
                    )}
                </div>
            </div>
        </>
    )
}

export default PointTable
