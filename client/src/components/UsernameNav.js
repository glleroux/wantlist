import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UsernameNavContainer = styled.div`
    background-color: #393945;
    height: 70px;
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


const UsernameNav = ({icon, id, username }) => {

    const navigate = useNavigate()
    console.log(username)

    return (
        <UsernameNavContainer onClick={() => navigate(`/username`)}>
            <NavItemDetails>
                <NavItemName>{username}</NavItemName>
                {icon}
            </NavItemDetails>
        </UsernameNavContainer>
    )
}

export default UsernameNav