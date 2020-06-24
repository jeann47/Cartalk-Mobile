import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import PhoneInput from '~/components/PhoneInput';

import { PhoneVerifyReq } from '~/store/modules/auth/actions';

import { Container, Form, SubmitBtn } from './styles';

export default function PhoneVerify() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const [phone, setPhone] = useState('');

    async function handleSubmit() {
        dispatch(PhoneVerifyReq(`+${phone}`));
    }

    return (
        <Background>
            <Container>
                <Image source="https://api.adorable.io/avatar/50/some.png" />
                <Form>
                    <PhoneInput placeholder="Telefone" onChange={setPhone} />
                    <SubmitBtn loading={loading} onPress={handleSubmit}>
                        Próximo
                    </SubmitBtn>
                </Form>
            </Container>
        </Background>
    );
}
