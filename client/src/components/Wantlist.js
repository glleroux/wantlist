import getWantlistPrices from "../utils/getWantlistPrices"

const Wantlist = ({ userWantlist }) => {

    return (
        <div>
            {userWantlist
            .sort((a, b) => a.ELOscore < b.ELOscore ? 1 : -1)
            .map((release) => 
                <div>{release.basic_information.title} -- {release.ELOscore}</div>
            )}  
        </div>
    )
}

export default Wantlist