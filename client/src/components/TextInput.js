import styled from 'styled-components';


const Input =styled.input`
    background-color: #393945;
    border: none;
    padding: 14px;
    width: 200px;
    transition: width 0.5s ease-in-out;
    outline: none;
    border-radius: 2px;
    caret-color: #FFFFFF;
    color: #FFFFFF;

    &:focus {
        width:220px;
    }
`


const TextInput = ({ value, onChange, placeholder }) => {

    return (
        <Input
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        ></Input>
    )
}

export default TextInput