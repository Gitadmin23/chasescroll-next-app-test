"use client"
import CustomButton from '@/components/general/Button'
import ProductImagePicker from '@/components/kisok/productImagePicker'
import ProductMap from '@/components/kisok/productMap'
import SelectCategories from '@/components/kisok/selectCategories'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { SuccessIcon, TruckIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
import useProduct from '@/hooks/useProduct'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Input, Switch, Text, Textarea } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'

export default function KisokCreate() {

    const { primaryColor, secondaryBackgroundColor, headerTextColor, bodyTextColor} = useCustomTheme()
    const { push, back } = useRouter()
    const query = useSearchParams(); 

    const [selected, setSelected] = useState("")
    const type = query?.get('type');
    const { productdata, updateProduct } = useProductStore((state) => state);

    const { handleSubmitProduce, createProduct, loading, openProduct, setOpenProduct } = useProduct(productdata, false)

    const clickHandler = () => {}

    return (
        <Flex w={"full"} px={"6"} pos={"relative"} pb={"12"} alignItems={"center"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} h={"6px"} pos={"absolute"} top={"0px"} zIndex={"10"} insetX={"0px"} rounded={"6px"} bgColor={"#F6F6F6"} >
                <Flex w={!type ? "50%" : "100%"} bgColor={primaryColor} rounded={"6px"} />
            </Flex>
            <Flex onClick={()=> back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} position={"absolute"} top={"4"} zIndex={"30"} left={"4"}  >
                <IoArrowBack size={"20px"} />
            </Flex>

            <form style={{ maxWidth: "550px" ,width: "100%", display:"flex" }} onSubmit={handleSubmitProduce}>
                <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={"24px"} fontWeight={"600"} >Give your product a name</Text>
                    <Input onChange={(e) => updateProduct({ ...productdata, name: e.target.value })} h={"60px"} />
                    <Text fontSize={"24px"} fontWeight={"500"} >Describe your place to make it stand out</Text>
                    <Textarea onChange={(e) => updateProduct({ ...productdata, description: e.target.value })} h={"60px"} />
                    <Text fontSize={"24px"} fontWeight={"500"} >Set your pricing </Text>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Quantity</Text>
                        <Input type="number" onChange={(e) => updateProduct({ ...productdata, quantity: e.target.value })} h={"60px"} />
                    </Flex>
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Location</Text>
                        {/* <Input h={"60px"} /> */}
                        <ProductMap location={productdata?.location} />
                    </Flex>
                    <SelectCategories rental={false} />
                    <Flex gap={"2"} w={"full"} flexDir={"column"} >
                        <Text fontWeight={"500"} >Price per unit</Text>
                        <Input type="number" onChange={(e) => updateProduct({ ...productdata, price: e.target.value })} h={"60px"} />
                    </Flex> 
                    <CustomButton type='button' _disabled={{ opacity: "0.5", cursor: "not-allowed" }} disable={(!productdata?.name || !productdata?.description || !productdata?.quantity || !productdata?.price) ? true : false} onClick={() => push("/dashboard/kisok/create?type=true")} height={"60px"} borderRadius={"999px"} mt={"4"} text={"Continue"} />
                </Flex>

                <Flex maxW={"550px"} pt={["6", "6", "6", "6"]} w={"full"} gap={"4"} alignItems={"center"} display={!type ? "none" : "flex"} flexDir={"column"}  >
                    <Text fontSize={"24px"} fontWeight={"600"} >Share pictures of your place</Text>
                    <ProductImagePicker />
                    <Text fontSize={"24px"} fontWeight={"600"} >Delivery Plans</Text>
                    <Text fontWeight={"500"} >Note:  You are responsible for your product  delivery</Text>
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex as={"button"} onClick={() => setSelected((prev) => prev === "1" ? "" : "1")} p={"6"} w={"full"} rounded={"16px"} justifyContent={"space-between"} bgColor={"#FCFCFC"} alignItems={"center"} borderWidth={"1px"} borderColor={selected === "1" ? primaryColor : "#EAEBEDCC"} >
                            <Flex flexDir={"column"} gap={"2"} alignItems={"start"} >
                                <Text fontWeight={"500"} >Mandatory product delivery Timeline</Text>
                                <Text fontSize={"14px"} >Within 3-5 Days inside lagos</Text>
                            </Flex>
                            <TruckIcon />
                        </Flex> 
                    </Flex>
                    <CustomButton isLoading={createProduct?.isLoading || loading} disable={createProduct?.isLoading || loading} type="submit" height={"60px"} borderRadius={"999px"} mt={"4"} text={"Submit"} />
                </Flex>
            </form>

            <ModalLayout open={openProduct} close={clickHandler} bg={secondaryBackgroundColor} >
                <LoadingAnimation loading={loading} >
                    <Flex flexDir={"column"} alignItems={"center"} py={"8"} px={"14"} >
                        <SuccessIcon />
                        <Text fontSize={["18px", "20px", "24px"]} color={headerTextColor} lineHeight={"44.8px"} fontWeight={"600"} mt={"4"} >{"Congratulations"}</Text>
                        <Text fontSize={"12px"} color={bodyTextColor} maxWidth={"351px"} textAlign={"center"} mb={"4"} >{`Your product has been listed on chasescroll kiosk pending approval`}</Text>
                         
                            <CustomButton onClick={()=> push("/dashboard/kisok")} color={"#FFF"} text={'Done'} w={"full"} backgroundColor={"#3EC259"} /> 
                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </Flex>
    )
}
