import styled from "styled-components"

const Submit = ({text, handleSubmit}) => {

    const SubmitButton = styled.button`
        background-color: #01A4EE;
        padding: 10px 24px;
        border: none;
        border-radius: 2px;
        color: #FFFFFF;
        margin-left: 8px;

        &:hover {
            background-color: #016D9F;
        }
    `

    return (
        <SubmitButton type='button' onClick={handleSubmit}>{text}</SubmitButton>
    )
}

export default Submit