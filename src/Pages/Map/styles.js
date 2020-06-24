import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Btn = styled(Button).attrs()`
    position: absolute;
    right: 0;
    bottom: 8%;
    margin: 10px;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: transparent;
    color: green;
`;

export const Call = styled(Button).attrs()`
    position: absolute;
    left: 0;
    bottom: 10%;
    margin: 10px;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: transparent;
    color: green;
`;

export const EditableCall = styled(Button).attrs()`
    position: absolute;
    left: 0;
    bottom: 17%;
    margin: 10px;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: transparent;
    color: green;
`;

export const Settings = styled(Button).attrs()`
    position: absolute;
    top: 40px;
    margin: 10px;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: transparent;
    color: green;
`;

export const CalloutContainer = styled.View`
    width: 150px;
    height: 100px;
    align-items: center;
`;

export const CalloutName = styled.Text`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;

export const CalloutInfo = styled.Text`
    text-align: center;
    margin-top: 5px;
`;

export const CalloutNumber = styled.Text``;
