import './App.css'
import 'bulma/css/bulma.css'
import { useState, type ChangeEvent } from 'react'

function App() {
    const [inputText, setInputText] = useState('')
    const [role, setRole] = useState('')
    const [score, setScore] = useState('')

    const tokenize = (s: string): string[] => {
        const tokens: string[] = []
        for (let i = 0; i < s.length; ) {
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
        for (let i = 0; i <= tokens.length - 3; i++) {
            if (tokens[i] === 'ちゃ' && tokens[i + 1] === 'ん') {
                return true
            }
        }
        return false
    }

    const processInput = (text: string) => {
        console.log(text);

        let roleText = "なし";
        let scoreText = "0";

        if (text == "ふらんちゃん") {
            roleText = "ふらんちゃん";
            scoreText = "5,000,000";
        } else if (text == "んちゃんらふ") {
            roleText = "逆から読んでも";
            scoreText = "25,000";
        } else if (tear3(text)) {
            roleText = "順不同明王";
            scoreText = "5";
        } else if (tear4(text)) {
            roleText = "満場一致";
            scoreText = "3"
        } else if (tear5(text)) {
            roleText = "上の句揃え";
            scoreText = "2";
        } else if (tear6(text)) {
            roleText = "下の句揃え";
            scoreText = "2";
        } else if (tear7(text)) {
            roleText = "ロケットランチャー";
            scoreText = "2";
        } else if (tear8(text)) {
            roleText = "出荷よ(´・ω・`)";
            scoreText = "2";
        } else if (tear9(text)) {
            roleText = "一心ふらん";
            scoreText = "1";
        } else if (tear10(text)) {
            roleText = "ワンちゃんある";
            scoreText = "1";
        }

        setRole(roleText);
        setScore(scoreText);
    }

    return (
        <>
            <div className="card">
                <p>
                    役：{role}
                </p>

                <p>
                    点数：{score} 点
                </p>

                <input
                    className="input is-primary"
                    style={{ marginBottom: '0.5rem' }}
                    value={inputText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                />
                <button
                    className="button is-primary"
                    onClick={() => processInput(inputText)}
                >
                    判定！
                </button>
            </div>
            <p className="read-the-docs">
                ふらんちゃんチャレンジの役と点数を自動判定します
            </p>
        </>
    )
}

export default App
