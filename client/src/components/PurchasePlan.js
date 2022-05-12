import Header from "./Header"
import NavPane from "./NavPane"
import styled from "styled-components"
import _ from 'lodash'

const PurchasePlan = ({ userWantlist, username }) => {

    console.log(username)

    const PurchasePlanPageContainer = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `

    const PurchasePlanContentContainer = styled.div`
        flex: 1;
        display: flex;
        flex-direction: row;
        overflow: scroll;
    `

    const PurchasePlanContainer = styled.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 80px;
        overflow: scroll;
    `

    return (
        <PurchasePlanPageContainer>
            <Header/>
            <PurchasePlanContentContainer>
                <NavPane username={username}/>
                <PurchasePlanContainer>
                </PurchasePlanContainer>
            </PurchasePlanContentContainer>
        </PurchasePlanPageContainer>
        
    )
}

export default PurchasePlan