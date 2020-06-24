import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
`;

export const Form = styled.View`
    align-self: stretch;
    margin-top: 50px;
    align-items: center;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const SubmitBtn = styled(Button)`
    width: 100%;
    margin: 20px 0;
`;

export const SignInLink = styled.TouchableOpacity`
    margin-top: 20px;
`;

export const NumberInfo = styled.Text`
    color: #fff;
    font-weight: 400;
    font-size: 14px;
`;

export const SignLinkText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
export const SignUpLink = styled.TouchableOpacity`
    margin-top: 20px;
`;
