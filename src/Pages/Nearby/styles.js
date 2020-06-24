import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
`;

export const UserList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    numColumns: 1,
})`
    margin-top: 20px;
`;

export const Separator = styled.View`
    height: 1px;
    background: gray;
`;

export const User = styled(RectButton)`
    background: #fff;
    flex: 1;
    padding: 10px 0 10px 10px;
    flex-direction: row;
    justify-content: space-between;
`;

export const Name = styled.Text`
    font-size: 15px;
    padding: 5px;
    font-weight: bold;
    color: #000;
`;

export const LinkBtn = styled(RectButton)`
    width: 55px;
    height: 55px;
    align-items: center;
    justify-content: center;
`;
export const Links = styled.View`
    flex-direction: row;
    margin-right: 15px;
    justify-content: space-between;
`;
export const Title = styled.Text`
    font-family: sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin-top: 5%;
`;
