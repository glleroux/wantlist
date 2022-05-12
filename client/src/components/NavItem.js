import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavItemContainer = styled.div`
    background-color: ${props => props.active? '#4D515F' : '#393945'};
    width: 200px;
    margin: 2px 0;
    border-radius: 5px;
`

const NavItemDetails = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
`

const NavItemName = styled.p`
    font-size: 16px;
    color: #FFFFFF;
    margin-left: 16px;
`


const NavItem = ({ name, icon, active, id }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        console.log(id)
        navigate(`/${id}`)
    }

    return (
        <NavItemContainer id='test' active={active} onClick={handleClick}>
            <NavItemDetails>
                {icon}
                <NavItemName>{name}</NavItemName>
            </NavItemDetails>
        </NavItemContainer>
    )
}

export default NavItem