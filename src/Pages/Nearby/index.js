import React, { useState, useEffect } from 'react';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';

import Footer from '~/components/Footer';
import Background from '~/components/Background';
import {
    Container,
    UserList,
    User,
    LinkBtn,
    Links,
    Separator,
    Name,
    Title,
} from './styles';

export default function Nearby() {
    const user = useSelector((state) => state.user.profile);

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        Contacts.getContactsMatchingString('CarTalk', (err, list) => {
            if (err) throw err;
            setContacts(list);
        });
    }, []);

    return (
        <Background>
            <Container>
                <Title>Recentes</Title>
                <UserList
                    data={contacts}
                    ItemSeparatorComponent={Separator}
                    keyExtractor={(item) => item.recordID}
                    renderItem={({ item }) => (
                        <User>
                            <Name>{item.givenName}</Name>
                            <Links>
                                <LinkBtn
                                    onPress={() => {
                                        Linking.openURL(
                                            `sms:${item.phoneNumbers[0].number}?body=Olá, meu nome é ${user.name}\nSeu número foi disponibilizado pelo CarTalk App`
                                        );
                                    }}
                                >
                                    <Icon name="comments" size={25} />
                                </LinkBtn>
                                <LinkBtn
                                    onPress={() => {
                                        Linking.openURL(
                                            `tel:${item.phoneNumbers[0].number}`
                                        );
                                    }}
                                >
                                    <Icon name="phone" size={25} />
                                </LinkBtn>
                                <LinkBtn
                                    onPress={() => {
                                        Linking.openURL(
                                            `whatsapp://send?text=Olá, meu nome é ${user.name}\nSeu número foi disponibilizado pelo CarTalk App&phone=${item.phoneNumbers[0].number}`
                                        );
                                    }}
                                >
                                    <Icon name="whatsapp" size={25} />
                                </LinkBtn>
                            </Links>
                        </User>
                    )}
                />
                <Footer />
            </Container>
        </Background>
    );
}
