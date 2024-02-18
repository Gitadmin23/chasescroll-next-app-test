import { InputElementProps } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputGroup, Input, InputRightElement, VStack } from '@chakra-ui/react'
import CustomText from '../general/Text';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface IProps {
  isPassword: boolean;
  name: string;
  type: 'text' | 'phone' | 'email' | 'date' | 'password'
  placeholder: string,
  disable?: boolean
  value?: any,
  ref?: any,
  hint?: null | string;
}


export const CustomInput = ({ isPassword = false, name, type, placeholder, disable, value, ref, hint = null }: IProps) => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <VStack alignItems={'flex-start'} width='100%'>
      <InputGroup>
        {isPassword && (
          <InputRightElement>
            {isPassword && (
              <div
                className="absolute right-2 top-2 cursor-pointer text-chasescrollTextGrey opacity-70 pt-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            )}
          </InputRightElement>
        )}
        <Input
          width={'100%'}
          {...register(name)}
          height={"42px"}
          placeholder={placeholder}
          data-date="DD MMMM YYYY"
          lang='pt_BR'
          disabled={disable}
          fontFamily={'Satoshi-Light'}
          // value={value? value: ""}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
        />
      </InputGroup>

      {name === "phone" && (

        <PhoneInput
          country={"us"}
          containerStyle={{width: "100%"}}
          value="1425652"
          onChange={phone => console.log({ phone })}
        />
      )}
      {hint && <small>{hint}</small>}
      {errors[name] && <CustomText textAlign={'left'} color='red' fontSize={'sm'}>{errors[name]?.message as string}</CustomText>}
    </VStack>
  )
}