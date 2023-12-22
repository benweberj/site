import { useState } from 'react'
import styled from 'styled-components'
import OpenAI from 'openai'


const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true })

export default function Chat() {
    const [results, setResults] = useState([])

    const $ = q => document.querySelector(q)

    async function talk(msg) {
        console.log('talking...', msg)
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: msg }],
            model: "gpt-3.5-turbo",
          });
          setResults(completion.choices[0])
    }

    return (
        <_Chat>
            <input type='text' className='input' placeholder='talk to chatGPT...' />
            <button onClick={() => talk($('.input').value)}>send</button>
            <div className='results'>
                <pre>{JSON.stringify(results)}</pre>
            </div>
        </_Chat>
    )
}

const _Chat = styled.div`

`