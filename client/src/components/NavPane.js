import NavItem from "./NavItem";
import UsernameNav from "./UsernameNav";
import LineIcon from "react-lineicons";
import styled from "styled-components";

import { useLocation } from "react-router-dom";

const Pane = styled.div`
    width: 260px;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    padding 24px;
    background-color: #393945;
`

const NavPane = ({username}) => {

    console.log(username)
    let location = useLocation();

    const checkIfActive = (path) => path === location.pathname

    console.log(checkIfActive('/wantlist'))

    return (
        <Pane>
            <NavItem active={checkIfActive('/wantlist') || checkIfActive('/')} name='Wantlist' id='wantlist' icon={<LineIcon name="list" style={{'color': '#41C3FE', 'fontSize': '20px'}}/>}/>
            <NavItem active={checkIfActive('/headtohead')} name='Head To Head' id='headtohead' icon={<LineIcon name="dashboard" style={{'color': '#41C3FE', 'fontSize': '20px'}}/>}/>
            <NavItem active={checkIfActive('/purchaseplan')} name='Purchase Plan' id='purchaseplan' icon={<LineIcon name="shopping-basket" style={{'color': '#41C3FE', 'fontSize': '20px'}}/>}/>
            <UsernameNav username={username}/>
        </Pane>
    )
}

export default NavPane