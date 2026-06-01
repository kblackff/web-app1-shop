import '../App.css'

function NewH1() {
    return (
        <>
        <div style={{width: '100%', height: '100%', zIndex: '-1'}}>
            <h1 style={{
                display: 'flex',
                justifyContent: 'center', 
                fontSize: '6em',
                overflowWrap: 'anywhere',
                opacity: '0.1'
                }}
            >
                Welcome to the Shop</h1>
        </div>
        </>
    )
}

export default NewH1