import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { PhoneCheckReq, PhoneFailed } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
    Container,
    Form,
    FormInput,
    SubmitBtn,
    NumberInfo,
    SignUpLink,
    SignLinkText,
} from './styles';

export default function Check() {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const loading = useSelector((state) => state.auth.loading);
    const phone = useSelector((state) => state.auth.phone);
    const [code, setCode] = useState('');
    async function handleSubmit() {
        dispatch(PhoneCheckReq(code, phone));
    }
    async function handleAbort() {
        dispatch(PhoneFailed());
        try {
            navigate('PhoneVerify');
        } catch (err) {
            navigate('PhoneVerify');
        }
    }
    return (
        <Background>
            <Container>
                <Image source="https://api.adorable.io/avatar/50/some.png" />
                <NumberInfo>O código foi enviado para {phone}</NumberInfo>
                <Form>
                    <FormInput
                        placeholder="Código de 6 digitos"
                        icon="lock-outline"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="phone-pad"
                    />
                    <SignUpLink onPress={handleAbort}>
                        <SignLinkText>Voltar</SignLinkText>
                    </SignUpLink>
                    <SubmitBtn loading={loading} onPress={handleSubmit}>
                        Próximo
                    </SubmitBtn>
                    <SignUpLink onPress={() => navigate('Recovery')}>
                        <SignLinkText>
                            Não tenho mais acesso a esse número
                        </SignLinkText>
                    </SignUpLink>
                </Form>
            </Container>
        </Background>
    );
}
