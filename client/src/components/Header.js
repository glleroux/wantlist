import styled from "styled-components";
import { ReactComponent as LogoIcon } from '../logo.svg';

const HeaderContainer = styled.div`
    background-color: #393945;
    height: 80px;
    width: 100vw;
    display: flex;
    flex-direction: row;
`

const LogoContainer = styled.div`
    width: 264px;
    display: flex;
    align-items: center;
    padding-left: 48px;
`
const LogoFlex = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const LogoWord = styled.p`
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.15em;
    margin: 0;
    margin-left: 10px;
    color: #FFFFFF;
    font-family: 'Kanit', sans-serif;
`

const HeaderContainerLeft = styled.div`
    width: calc((100vw - 260px)/3);
`
const HeaderContainerMiddle = styled.div`
    width: calc((100vw - 260px)/3);
`
const HeaderContainerRight = styled.div`
    width: calc((100vw - 260px)/3);
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Header = (props) => {

    return (
        <HeaderContainer>
            <LogoContainer>
                <LogoFlex>
                    <LogoIcon className='logo'/>
                    <LogoWord>VINYLIST</LogoWord>
                </LogoFlex>
            </LogoContainer>
            <HeaderContainerLeft></HeaderContainerLeft>
            <HeaderContainerMiddle></HeaderContainerMiddle>
            <HeaderContainerRight>
                {props.children}
            </HeaderContainerRight>
        </HeaderContainer>
    )
}

export default Header