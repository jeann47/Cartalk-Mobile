import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
    flex: 1;
`;

export const Main = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})`
    align-self: stretch;
`;
export const Field = styled(Input)`
    background: rgba(255, 255, 255, 0.6);
    width: 100%;
    border-radius: 5px;
    margin-right: 15px;
`;

export const DialogField = styled(Input)`
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    margin-top: 15px;
    border-radius: 5px;
`;

export const Section = styled.Text`
    margin: 15px 0 0 20px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;

export const Label = styled.Text`
    margin: 15px 0 0 20px;
    color: rgba(255, 255, 255, 0.9);
`;

export const Form = styled.View`
    margin: 10px 20px 20px 20px;
    align-self: stretch;
    flex-direction: row;
    height: 50px;
`;
export const AccountContainer = styled.View`
    padding: 10px 0;
    justify-content: space-between;
    align-self: stretch;
    flex-direction: row;
`;

export const IconBtn = styled(RectButton)`
    width: 15%;
    margin-left: 15px;
`;

export const Header = styled.View`
    height: 50px;
    background: #1b262c;
    flex-direction: row;
`;

export const Use = styled(RectButton)`
    width: 15%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
`;

export const Text = styled.Text`
    margin-left: 5%;
    color: #fff;
    font-weight: bold;
    align-self: center;
`;

export const PermissionBtn = styled(Button)`
    width: 40%;
    margin: 20px;
    background: #0f817d;
`;
export const Btn = styled(Button)`
    width: 25%;
`;

export const QuitBtn = styled(Btn)`
    margin-left: 25px;
    background: #810f4c;
`;

export const UpdateBtn = styled(Btn)`
    margin: 0 25px;
    background: #4c810f;
`;

export const HelpBtn = styled(Btn)`
    margin-right: 25px;
    background: #0f4c81;
`;
