import React, { ReactNode } from 'react'
import { ButtonProps, Button as ChakraButton, Box } from '@chakra-ui/react' 

interface IProps {
  type?: 'button' | 'submit';
  text: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  width?: any;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  height?: string;
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  isLoading?: boolean;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  icon?: ReactNode;
  disable?: boolean
}

function CustomButton({
  type = 'button',
  text,
  backgroundColor,
  color = 'white',
  borderRadius = '12px',
  width = 'full',
  height = '45px',
  shadow = 'none',
  fontSize = "md",
  isLoading = false,
  icon = undefined,
  variant = 'solid',
  disable = false,
  ...rest
}: IProps & ButtonProps) { 
  

  return (
    <ChakraButton
      // style={{ backgroundColor: backgroundColor ? backgroundColor?.includes("brand") ? THEME.COLORS[backgroundColor?.replace("brand.", "")] : backgroundColor : "#E5EBF4" }}
      {...rest}
      isDisabled={isLoading || disable}
      loadingText='Loading'
      width={width}
      height={height}
      color={color}
      fontSize={fontSize}
      borderRadius={borderRadius}
      type={type}
      isLoading={isLoading}
      shadow={shadow}
      variant={variant}
      bgColor={backgroundColor ? backgroundColor : "brand.chasescrollButtonBlue"}
      _hover={{
        backgroundColor: backgroundColor
      }}
      fontFamily={'DM-Regular'}
    >
      {icon && (
        <>
          {icon}
          <Box width={'20px'} />
        </>
      )}
      {text}
    </ChakraButton>
  )
}

export default CustomButton