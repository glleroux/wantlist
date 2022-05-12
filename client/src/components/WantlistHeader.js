import styled from "styled-components"

const HeaderItem = ({id, value}) => {

    const HeaderItemText = styled.p`
        font-size: 16px;
        color: #FFFFFF;
        margin: 10px 0;
        flex: ${id === 'titleartist' ? 2 : 1};
        text-align: ${id === 'titleartist' ? 'start' : 'center'};
    `
    
    return <HeaderItemText id={id}>{value}</HeaderItemText>
}

const WantlistHeader = () => {

    const WantlistHeaderContainer = styled.div`
        width: 1000px;
        height: 40px;
        display: flex;
        background-color: #393945;
        margin: 8px 0;
    `

    const Spacer = styled.div`
        width: 80px;
        margin-right: 24px;
    `

    return (
        <WantlistHeaderContainer>
            <Spacer/>
            <HeaderItem id='titleartist' value='Title / Artist'/>
            <HeaderItem id='year' value='Year'/>
            <HeaderItem id='rating' value='Rating'/>
            <HeaderItem id='rank' value='VRank'/>
        </WantlistHeaderContainer>    

    )
}

export default WantlistHeader