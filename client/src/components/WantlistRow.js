import styled from "styled-components"
import _ from 'lodash'

const WantlistRow = ({ release, rank }) => {

    const RowContainer = styled.div`
        width: 1000px;
        height: 80px;
        display: flex;
        background-color: #393945;
        margin: 8px 0;

        &:hover {
            background-color: #4D515F;
        }
    `

    const WantlistReleaseArt = styled.div`
        background-image: url(${props => props.coverImage});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 80px;
        height: 80px;
        margin-right: 24px;
    `

    const WantlistTitleArtist = styled.div`
        display: flex;
        flex-direction: column;
        flex: 2;
        height: 80px;
        align-items: flex-start;
        justify-content: center;
        color: #FFFFFF;
        font-size: 18px;
        line-height: 155%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    `

    const WantlistYear = styled.div`
        display: flex;
        flex-direction: column;
        height: 80px;
        align-items: center;
        justify-content: center;
        flex: 1;
        color: #FFFFFF;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    `

    const WantlistRating = styled.div`
        display: flex;
        flex-direction: column;
        height: 80px;
        align-items: center;
        justify-content: center;
        flex: 1;
        color: #FFFFFF;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    `

    const WantlistScore = styled.div`
        display: flex;
        flex-direction: column;
        height: 80px;
        align-items: center;
        justify-content: center;
        flex: 1;
        color: #FFFFFF;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    `
    
    return (
       <RowContainer>
            <WantlistReleaseArt coverImage={release.basic_information.cover_image}/>
            <WantlistTitleArtist>
                <p style={{'fontWeight': '500'}}>{release.basic_information.title}</p>
                <p style={{'color': '#CED4DA'}}>{release.basic_information.artists[0].name}</p>
            </WantlistTitleArtist>
            <WantlistYear>
                <p>{release.basic_information.year}</p>
            </WantlistYear>
            <WantlistRating>
                <p>{release.rating}</p>
            </WantlistRating>
            <WantlistScore>
                <p>{rank}</p>
            </WantlistScore>
       </RowContainer>
    )
}

export default WantlistRow