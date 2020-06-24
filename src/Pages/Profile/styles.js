import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 },
})`
    align-self: stretch;
`;
export const Image = styled(RectButton)`
    align-self: center;
    margin-top: 30px;
`;

export const Img = styled.Image`
    height: 100px;
    width: 100px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: #eee;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const SubmitBtn = styled(Button)`
    margin-top: 5px;
`;

export const LogOutBtn = styled(Button)`
    margin-top: 10px;
    background: #d61e12;
`;
