
const Username = ({ username, handleSubmit, setUsername }) => {

    return (
        <form>
            <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Enter Discogs username"
            ></input>
            <button type='button' onClick={handleSubmit}>Sync</button>
        </form>
    )
}

export default Username