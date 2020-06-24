import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { signInReq } from '~/store/modules/auth/actions';
import Background from '~/components/Background';

import {
    Container,
    Form,
    FormInput,
    SubmitBtn,
    SignUpLink,
    SignLinkText,
} from './styles';

export default function SignIn() {
    const passRef = useRef();
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const phone = useSelector((state) => state.auth.phone);

    const [password, setPassword] = useState('');

    function handleSubmit() {
        dispatch(signInReq(phone, password));
    }

    return (
        <Background>
            <Container>
                <Image source="https://api.adorable.io/avatar/50/some.png" />

                <Form>
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        ref={passRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />
                    <SubmitBtn onPress={handleSubmit}>Acessar</SubmitBtn>
                </Form>

                <SignUpLink onPress={() => navigate('PhoneVerify')}>
                    <SignLinkText>Criar Conta</SignLinkText>
                </SignUpLink>
            </Container>
        </Background>
    );
}
