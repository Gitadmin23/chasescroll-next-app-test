import { Box, InputElementProps, Select } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface IProps {
    isPassword: boolean;
    name: string;
    type: 'text' | 'phone' | 'email' | 'date' | 'password'
    placeholder: string;
    option: string[];
    data?: string;
}


export const CustomSelect = ({ isPassword = false, name, type, placeholder, option = [], data }: IProps) => {
    const { register, formState: { errors } } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <>
            <Box width='100%' className="relative w-full">
                
                <Select
                    width='100%'
                    {...register(name)}
                    placeholder={placeholder}
                    value={data}
                >
                    {option.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </Select>
               
              </Box>
              { errors[name] && <p className='text-red-500 text-sm'>{errors[name]?.message as string}</p> }
        </>
    )
}