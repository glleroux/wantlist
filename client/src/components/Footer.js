import styled from "styled-components";

const FooterContainer = styled.div`
    background-color: #393945;
    height: 80px;
    width: 100vw;
    display: flex;
    flex-direction: row;
`

const FooterContainerLeft = styled.div`
    width: calc((100vw - 260px)/3);
`
const FooterContainerMiddle = styled.div`
    width: calc((100vw - 260px)/3);
`
const FooterContainerRight = styled.div`
    width: calc((100vw - 260px)/3);
`

const Footer = () => {

    return (
        <FooterContainer>
            <FooterContainerLeft></FooterContainerLeft>
            <FooterContainerMiddle></FooterContainerMiddle>
            <FooterContainerRight></FooterContainerRight>
        </FooterContainer>
    )
}

export default Footer