import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
    background: #0f4c81;
    flex-direction: row;
    height: 8%;
    justify-content: space-between;
    padding: 1% 5%;
`;

export const Nav = styled(Button)`
    background-color: transparent;
    flex-grow: 1;
    height: 115%;
`;

export const Separator = styled.View`
    width: 1px;
    height: 60%;
    background: rgba(255, 255, 255, 0.2);
    margin-top: 4%;
`;
