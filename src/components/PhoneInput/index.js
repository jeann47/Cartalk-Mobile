import React, { useState } from 'react';
import { formatNumber } from 'libphonenumber-js';

import { FormInput } from './styles';

// eslint-disable-next-line react/prop-types
const PhoneInput = ({ placeholder, onChange, value }) => {
    const [phoneNumber, setPhoneNumber] = useState(value || '');

    const handleChange = (val) => {
        setPhoneNumber(val);
        if (val.length > 3) {
            const formattedNumber = formatNumber(
                `+55${val.replace(/^\+55/, '')}`,
                'International'
            );

            setPhoneNumber(formattedNumber);
            const tempPhone = val.replace(/\+/g, '');
            const removeSpaces = tempPhone.replace(/ /g, '');
            onChange(removeSpaces);
        }
    };

    return (
        <FormInput
            icon="call"
            onChangeText={handleChange}
            placeholder={placeholder}
            hideUnderline
            value={phoneNumber}
            keyboardType="phone-pad"
        />
    );
};

export default PhoneInput;
