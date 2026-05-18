import 'bulma/css/bulma.css'
import {useState, type ChangeEvent} from 'react'

function Home() {
    const [inputText, setInputText] = useState('')
    const [role, setRole] = useState('')
    const [score, setScore] = useState('')
    const [isJudged, setIsJudged] = useState(false)

    const tokenize = (s: string): string[] => {
        const tokens: string[] = []
        for (let i = 0; i < s.length;) {
            if (s.slice(i, i + 2) === 'ちゃ') {
                tokens.push('ちゃ')
                i += 2
            } else {
                tokens.push(s[i])
                i += 1
            }
        }
        return tokens
    }

    const tear3 = (s: string): boolean => {
        const tokens = tokenize(s)
        if (tokens.length !== 5) return false
        const counts = new Map<string, number>()
        for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1)
        const required = new Map<string, number>([
            ['ふ', 1],
            ['ら', 1],
            ['ちゃ', 1],
            ['ん', 2],
        ])
        for (const t of counts.keys()) {
            if (!required.has(t)) return false
        }
        for (const [t, need] of required) {
            if ((counts.get(t) ?? 0) !== need) return false
        }
        return true
    }

    const tear4 = (s: string): boolean => {
        const tokens = tokenize(s)
        if (tokens.length !== 5) return false
        const allowed = new Set(['ふ', 'ら', 'ん', 'ちゃ'])
        const first = tokens[0]
        if (!allowed.has(first)) return false
        return tokens.every(t => t === first)
    }

    const tear5 = (s: string): boolean => {
        const tokens = tokenize(s)
        if (tokens.length !== 5) return false
        return tokens[0] === 'ふ' && tokens[1] === 'ら' && tokens[2] === 'ん'
    }

    const tear6 = (s: string): boolean => {
        const tokens = tokenize(s)
        if (tokens.length !== 5) return false
        return tokens[3] === 'ちゃ' && tokens[4] === 'ん'
    }

    const tear7 = (s: string): boolean => {
        const tokens = tokenize(s)
        for (let i = 0; i <= tokens.length - 3; i++) {
            if (tokens[i] === 'ら' && tokens[i + 1] === 'ん' && tokens[i + 2] === 'ちゃ') {
                return true
            }
        }
        return false
    }

    const tear8 = (s: string): boolean => {
        const tokens = tokenize(s)
        for (let i = 0; i <= tokens.length - 3; i++) {
            if (tokens[i] === 'ら' && tokens[i + 1] === 'ん' && tokens[i + 2] === 'ら' && tokens[i + 3] === 'ん') {
                return true
            }
        }
        return false
    }

    const tear9 = (s: string): boolean => {
        const tokens = tokenize(s)
        for (let i = 0; i <= tokens.length - 3; i++) {
            if (tokens[i] === 'ふ' && tokens[i + 1] === 'ら' && tokens[i + 2] === 'ん') {
                return true
            }
        }
        return false
    }

    const tear10 = (s: string): boolean => {
        const tokens = tokenize(s)
        for (let i = 0; i <= tokens.length - 2; i++) {
            if (tokens[i] === 'ちゃ' && tokens[i + 1] === 'ん') {
                return true
            }
        }
        return false
    }

    const tear11 = (s: string): boolean => {
        const tokens = tokenize(s)
        return tokens[0] === tokens[4] && tokens[1] === tokens[3];

    }

    const tear12 = (s: string): boolean => {
        const tokens = tokenize(s)
        for (let i = 0; i <= tokens.length - 2; i++) {
            if (tokens[i] === 'ちゃ' && tokens[i + 1] === 'ふ') {
                return true
            }
        }
        return false
    }

    const tear13 = (s: string): boolean => {
        const tokens = tokenize(s)
        for (let i = 0; i <= tokens.length - 4; i++) {
            if (tokens[i] === 'ちゃ' && tokens[i + 1] === 'ふ' && tokens[i + 2] === 'ら' && tokens[i + 3] === 'ん') {
                return true
            }
        }
        return false
    }

    const tear14 = (s: string): boolean => {
        const tokens = tokenize(s)
        for (let i = 0; i <= tokens.length - 3; i++) {
            if (tokens[i] === 'ちゃ' && tokens[i + 1] === 'ら' && tokens[i + 2] === 'ん') {
                return true
            }
        }
        return false
    }

    const tear15 = (s: string): boolean => {
        const tokens = tokenize(s)
        if (tear6(s)) {
            const allowed = new Set(['ふ', 'ら', 'ん'])
            return allowed.has(tokens[0]) && allowed.has(tokens[1]) && allowed.has(tokens[2])
        }
        return false
    }

    const tear16 = (s: string): boolean => {
        return s.includes('ふんふん')
    }

    const processInput = (text: string) => {
        let roleText: string;
        let scoreText: string;

        if (text == "ふらんちゃん") {
            /**
             * 確率:1/781.25（1000万回試行結果）
             */

            roleText = "ふらんちゃん";
            scoreText = "5,000,000";
        } else if (text == "んちゃんらふ") {
            /**
             * 確率実測値:1/781.25（1000万回試行結果）
             */

            roleText = "逆から読んでも";
            scoreText = "25,000";
        } else {
            const roles = [];
            roleText = "役なし";
            let score = 0;
            if (tear3(text)) {
                /**
                 * 確率:1/13.02（1000万回試行結果）
                 */

                roles.push("順不同明王")
                score += 5;
            }
            if (tear4(text)) {
                /**
                 * 確率:1/91.93（1000万回試行結果）
                 */

                roles.push("満場一致");
                score += 3;
            }
            if (tear5(text)) {
                /**
                 * 確率:1/62.46（1000万回試行結果）
                 */

                roles.push("上の句揃え");
                score += 2;
            }
            if (tear6(text)) {
                /**
                 * 確率:1/12.50（1000万回試行結果）
                 */

                roles.push("下の句揃え");
                score += 2;
            }
            if (tear7(text)) {
                /**
                 * 確率:1/20.83（1000万回試行結果）
                 */

                roles.push("ロケットランチャー");
                score += 2;
            }
            if (tear8(text)) {
                /**
                 * 確率:1/78.16（1000万回試行結果）
                 */

                roles.push("出荷よ(´・ω・`)");
                score += 2;
            }
            if (tear9(text)) {
                /**
                 * 確率:1/20.84（1000万回試行結果）
                 */

                roles.push("一心ふらん");
                score += 1;
            }
            if (tear10(text)) {
                /**
                 * 確率:1/3.32（1000万回試行結果）
                 */

                roles.push("ワンちゃんある");
                score += 1;
            }
            if (tear11(text)) {
                /**
                 * 確率:1/12.75（1000万回試行結果）
                 */

                roles.push("パーソナルミラー");
                score += 3;
            }
            if (tear12(text)) {
                /**
                 *
                 */

                roles.push("ちゃふ台返し");
                score += 1;
            }
            if (tear13(text)) {
                /**
                 *
                 */

                roles.push("新種の果実、ちゃふらんす")
                score += 5;
            }
            if (tear14(text)) {
                /**
                 *
                 */

                roles.push("ちゃらんぷらん")
                score += 2;
            }
            if (tear15(text)) {
                /**
                 *
                 */

                roles.push("誰よその女！")
                score += 3;
            }

            if (tear16(text)) {
                /**
                 *
                 */

                roles.push("ふんふん太郎")
                score += 3;
            }

            if (roles.length > 0) {
                roleText = roles.join("\n");
            }
            scoreText = score.toString();
        }

        setRole(roleText);
        setScore("点数：" + scoreText + "点");
        setIsJudged(true);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        setRole("");
        setScore("");
        setIsJudged(false);
    }

    const handlePostToX = () => {
        const text = `${inputText}\n\n${role}\n\n${score}\n\n#ふらんちゃんチャレンジ\nhttps://franchallenge.web.app`
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
                        <p>{score}</p>
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
                            >
                                Xに投稿
                            </button>
                        ) : (
                            <button
                                className="button is-primary"
                                onClick={() => processInput(inputText)}
                            >
                                判定！
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
