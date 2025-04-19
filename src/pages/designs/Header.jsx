
export const designInfo = [
    { id: 'airpactfire', title: 'Airpact-Fire / Vizinet', tag: 'logo', description: 'The Collaborative Air Quality Science Platform'},
    { id: 'avole', title: 'Avole', tag: 'logo', description: 'Ethiopian Coffee Shop'},
]

export default function DesignsHeader(props) {

    const { id } = props

    const d = designInfo.find(d => d.id === id)

    return (
        <div>
            <div className='align-center'>
                <h1>{d.title}</h1>
                <button className='chip inactive mls'>{d.tag}</button>
            </div>
            <h4 className='normal mts'>{d.description}</h4>
        </div>
    )
}

