"use client"
import EventCategory from "@/components/event_component/event_category";
import SelectEventPage from "@/components/event_component/select_event_page";
import CustomButton from "@/components/general/Button";
import Fundpaystack from "@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack";
import CreateEventBtn from "@/components/sharedComponent/create_event_btn";
import ModalLayout from "@/components/sharedComponent/modal_layout";
import { GlassIcon, ServiceIcon, RentalIcon, StoreIcon, NewEventIcon, NewDonationIcon, FundraisingIcon } from "@/components/svg";
import useProductStore from "@/global-state/useCreateProduct";
import useKioskStore from "@/global-state/useKioskFilter";
import usePaystackStore from "@/global-state/usePaystack";
import useCustomTheme from "@/hooks/useTheme";
import { THEME } from "@/theme";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import httpService from "@/utils/httpService";
import { Button, Flex, Image, Input, Select, Text, useColorMode } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useQuery } from "react-query";


function Layout({ children }: {
    children: ReactNode
}) {
    const { primaryColor, borderColor, bodyTextColor, secondaryBackgroundColor, headerTextColor, mainBackgroundColor } = useCustomTheme()

    const { configPaystack, setPaystackConfig, dataID, message } = usePaystackStore((state) => state);
    const { colorMode, toggleColorMode } = useColorMode();
    const query = useSearchParams();
    const type = query?.get('type');

    const pathname = usePathname()

    const { initialFilter, setInitialFilter, setSelectedFilter } = useKioskStore((state) => state)

    const [open, setOpen] = useState(false)
    const { updateProduct, updateImage, updateRental } = useProductStore((state) => state);

    const { push } = useRouter()

    const { data, isLoading } = useQuery(
        ["getcategoryProduct"],
        () => httpService.get(`/products/categories`), {
    }
    );

    const { data: datarental, isLoading: loadingRental } = useQuery(
        ["getcategoryRental"],
        () => httpService.get(`/rental/categories`), {
    }
    );


    const { isLoading: loadingServices, data: serviceCategories } = useQuery(['get-business-categories'], () => httpService.get('/business-service/categories'), {
        refetchOnMount: true,
        onError: (error: any) => { },
    });

    const userId = localStorage.getItem('user_id') + "";

    const clickHandler = (item: "kiosk" | "service" | "rental" | "event" | "donation") => {
        if (item === "event") {
            push(`/product`)
        } else if (item === "donation") {
            push(`/product/fundraising`)
        } else {
            push(`/product/kiosk${`?type=${item}`}`)
        }
    }

    const routeHandler = (item: string) => {
        push(`/product/kiosk${item ? `?type=${item}` : ""}`)
    }


    const donationHandler = (item: string) => {
        push(`/product/fundraising${item ? `?type=${item}` : ""}`)
    }

    let stateList = [
        "abia",
        "adamawa",
        "akwa ibom",
        "anambra",
        "bauchi",
        "bayelsa",
        "benue",
        "borno",
        "cross river",
        "delta",
        "ebonyi",
        "edo",
        "ekiti",
        "enugu",
        "gombe",
        "imo",
        "jigawa",
        "kaduna",
        "kano",
        "katsina",
        "kebbi",
        "kogi",
        "kwara",
        "lagos",
        "nasarawa",
        "niger",
        "ogun",
        "ondo",
        "osun",
        "oyo",
        "plateau",
        "rivers",
        "sokoto",
        "taraba",
        "yobe",
        "zamfara",
        "federal capital territory"
    ];


    const createProduct = () => {
        updateProduct({
            creatorID: userId,
            name: "",
            description: "",
            images: [],
            price: null,
            category: "",
            quantity: null,
            hasDiscount: false,
            discountPrice: null,
            publish: true,
            location: "" as any,
            state: ""
        })
        updateRental({
            "userId": userId,
            "name": "",
            "description": "",
            "category": "",
            "location": {} as any,
            "maximiumNumberOfDays": 1,
            "price": null,
            "images": [],
            frequency: "DAILY",
        } as any)
        updateImage([] as any)
        push((type === null || type === "mykisok" || type === "myorder") ? "/dashboard/kisok/create" : (type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "/dashboard/kisok/create-rental" : (type === "service" || type === "myservice" || type === "mybooking") ? "/dashboard/kisok/create-service" : "/dashboard/kisok/create")
    }

    const submitHandler = () => {
        setSelectedFilter({
            name: initialFilter?.name,
            category: initialFilter?.category,
            state: initialFilter?.state
        })
    }

    useEffect(() => {
        setSelectedFilter({
            category: "",
            name: "",
            state: ""
        })
        setInitialFilter({
            category: "",
            name: "",
            state: ""
        })
    }, [type])

    return (
        <Flex w={"full"} pos={"relative"} pb={"12"} gap={"6"} flexDir={"column"} overflowY={"auto"}  >
            <Flex w={"full"} position={"sticky"} top={"0px"} bgColor={mainBackgroundColor} py={"4"} zIndex={"40"} px={["6", "6", "12"]} alignItems={"center"} >
                <Flex alignItems={"center"} gap={"1"} >
                    <Flex as={"button"} onClick={() => push("/")} >
                        <IoArrowBack size={"30px"} />
                    </Flex>
                    <Image onClick={() => push("/")} width={["32px", "32px", "60px"]} ml={"4"} src={"/assets/logo.png"} alt="logo" />
                    {pathname === "/product/fundraising" ?
                        <>
                            <Flex display={["none", "none", "flex"]} alignItems={"center"} gap="2" >
                                <FundraisingIcon />
                                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"} >Fundraising</Text>
                            </Flex>
                            <Flex display={["flex", "flex", "none"]} alignItems={"center"} gap="2" >
                                <FundraisingIcon height='19' />
                                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"} >Fundraising</Text>
                            </Flex>
                        </> :
                        <Flex flexDir={"column"} alignItems={"start"} >
                            <Text fontWeight={"bold"} fontSize={["14px", "14px", "16px"]} color={THEME.COLORS.chasescrollBlue} >Chasescroll</Text>
                            <Text fontWeight={"medium"} fontStyle={"italic"} fontSize={["12px", "12px", "14px"]}>We build memories.</Text>
                        </Flex>
                    }
                </Flex>
            </Flex>
            <Flex w={"full"} alignItems={"center"} pt={["6"]} px={["4", "4", "6"]} flexDirection={"column"} gap={"3"} >
                <Flex fontSize={["20px", "20px", "56px"]} alignItems={"end"} display={["flex", "flex", "none"]} fontWeight={"700"} >what are you l<Flex mb={"1"} ><GlassIcon size='17' /></Flex>king for?</Flex>
                <Flex fontSize={["16px", "16px", "56px"]} alignItems={"end"} display={["none", "none", "flex"]} fontWeight={"700"} >what are you l<Flex mb={"3"} ><GlassIcon size='45' /></Flex>king for?</Flex>
                <Flex w={["full", "fit-content", "fit-content"]} gap={"0px"} alignItems={"center"} bgColor={secondaryBackgroundColor} p={"6px"} rounded={"full"} >
                    <CustomButton onClick={() => clickHandler("event")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <NewEventIcon color={pathname === "/product" ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Event</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={pathname === "/product" ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={pathname === "/product" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={pathname === "/product" ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("service")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <ServiceIcon color={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Service</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("rental")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <RentalIcon color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Rental</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("kiosk")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Flex display={["none", "none", "flex"]} >
                                <StoreIcon color={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "white" : headerTextColor} />
                            </Flex>
                            <Text fontSize={["10px", "12px", "14px"]} >Kiosk</Text>
                        </Flex>
                    } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") ? "white" : headerTextColor} width={["100%", "107px", "175px"]} />
                    <Flex w="fit-content" >
                        <CustomButton onClick={() => clickHandler("donation")} text={
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex display={["none", "none", "flex"]} >
                                    <NewDonationIcon color={pathname?.includes("/product/fundraising") ? "white" : headerTextColor} />
                                </Flex>
                                <Text fontSize={["10px", "12px", "14px"]} >Fundraising</Text>
                            </Flex>
                        } height={["30px", "38px", "48px"]} px={"2"} fontSize={"sm"} backgroundColor={pathname?.includes("/product/fundraising") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={pathname?.includes("/product/fundraising") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={pathname?.includes("/product/fundraising") ? "white" : headerTextColor} width={["80px", "107px", "175px"]} />
                    </Flex>
                </Flex>
                {(pathname !== "/dashboard/product" && !pathname?.includes("fundraising")) && (
                    <Flex display={["flex", "flex", "none"]} w={"full"} gap={"3"} alignItems={"center"} >
                        <CustomButton onClick={() => setOpen(true)} text={`Filter ${(type === null || type === "mykisok" || type === "myorder" || type === "mysales") ? "Product" : (type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "Service" : "Rental"} `} color={headerTextColor} fontSize={"14px"} backgroundColor={"White"} borderWidth={"1px"} borderRadius={"999px"} />
                    </Flex>
                )}
                {(pathname !== "/dashboard/product" && !pathname?.includes("fundraising")) && (
                    <Flex display={["none", "none", "flex"]} w={"fit-content"} borderWidth={"1px"} borderColor={borderColor} rounded={"full"} h={"fit-content"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                        <Select h={"80px"} bgColor={mainBackgroundColor} value={initialFilter?.category} onChange={(e) => setInitialFilter({ ...initialFilter, category: e.target?.value })} w={"200px"} outlineColor={"transparent"} outline={"none"} textAlign={"center"} placeholder='Select Category' roundedLeft={"full"} borderWidth={"0px"} borderRightWidth={"1px"} borderRightColor={borderColor} >
                            {(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") && (
                                <>
                                    {data?.data?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => (
                                        <option key={index} >{item?.replaceAll("_", " ")}</option>
                                    ))}
                                </>
                            )}
                            {(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") && (
                                <>
                                    {datarental?.data?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => (
                                        <option key={index} >{item?.replaceAll("_", " ")}</option>
                                    ))}
                                </>
                            )}
                            {(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") && (
                                <>
                                    {serviceCategories?.data?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => (
                                        <option key={index} >{item?.replaceAll("_", " ")}</option>
                                    ))}
                                </>
                            )}
                        </Select>
                        <Select h={"80px"} bgColor={mainBackgroundColor} value={initialFilter?.state} onChange={(e) => setInitialFilter({ ...initialFilter, state: e.target?.value })} w={"200px"} rounded={"0px"} textAlign={"center"} placeholder='Select State' borderRightWidth={"1px"} borderWidth={"0px"} borderRightColor={borderColor} >
                            {stateList?.map((item) => {
                                return (
                                    <option value={item} key={item} >{capitalizeFLetter(item)}</option>
                                )
                            })}
                        </Select>
                        <Input bgColor={mainBackgroundColor} placeholder={"Search business name"} onChange={(e) => setInitialFilter({ ...initialFilter, name: e.target?.value })} h={"80px"} w={"200px"} outline={"none"} rounded={"0px"} borderWidth={"0px"} borderLeftWidth={"1px"} borderRightColor={borderColor} />
                        <Button onClick={submitHandler} h={"80px"} w={"140px"} color={"white"} outline={"none"} bgColor={primaryColor} roundedRight={"full"} borderRightWidth={"1px"} borderWidth={"0px"} borderRightColor={borderColor} >
                            Search
                        </Button>
                    </Flex>
                )}
            </Flex>
            {/* <Flex w={"full"} justifyContent={"center"} >
                {pathname !== "/dashboard/product" && (
                    <Flex py={"6"} maxWidth={"745px"} w={"full"} justifyContent={"start"} alignItems={"center"} gap={"4"} >
                        {(type === "kiosk" || type === "mykiosk" || type === "myorder" || type === "mysales") && (
                            <Select
                                color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                                focusBorderColor={"#5465E0"}
                                height={"41px"}
                                fontSize={"sm"}
                                value={type ? type : ""}
                                rounded={"50px"}
                                onChange={(e) => routeHandler(e.target.value)}
                                width={["auto", "auto", "auto"]}
                                textAlign={"center"} >
                                {[{ name: "All Kiosks", value: "" }, { name: "My Kiosk", value: "mykiosk" }, { name: "My Orders", value: "myorder" }, { name: "My Sales", value: "mysales" }]?.map((type: any, index: number) => (
                                    <option style={{ fontSize: "14px" }} key={index} value={type?.value}>
                                        {type?.name}
                                    </option>
                                ))}
                            </Select>
                        )}
                        {(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") && (
                            <Select
                                color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                                focusBorderColor={"#5465E0"}
                                height={"41px"}
                                fontSize={"sm"}
                                value={type}
                                rounded={"50px"}
                                onChange={(e) => routeHandler(e.target.value)}
                                width={["auto", "auto", "auto"]}
                                textAlign={"center"} >
                                {[{ name: "All Services", value: "service" }, { name: "My Services", value: "myservice" }, { name: "My Booking", value: "mybooking" }, { name: "My Request", value: "myrequest" }]?.map((type: any, index: number) => (
                                    <option style={{ fontSize: "14px" }} key={index} value={type?.value}>
                                        {type?.name}
                                    </option>
                                ))}
                            </Select>
                        )}
                        {(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") && (
                            <Select
                                color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                                focusBorderColor={"#5465E0"}
                                height={"41px"}
                                fontSize={"sm"}
                                value={type}
                                rounded={"50px"}
                                onChange={(e) => routeHandler(e.target.value)}
                                width={["auto", "auto", "auto"]}
                                textAlign={"center"} >
                                {[{ name: "All Rentals", value: "rental" }, { name: "My Rental", value: "myrental" }, { name: "My Reciept", value: "myreciept" }, { name: "My Request", value: "vendorreciept" }]?.map((type: any, index: number) => (
                                    <option style={{ fontSize: "14px" }} key={index} value={type?.value}>
                                        {type?.name}
                                    </option>
                                ))}
                            </Select>
                        )}
                        {pathname?.includes("fundraising") && (
                            <Select
                                color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                                focusBorderColor={"#5465E0"}
                                height={"41px"}
                                fontSize={"sm"}
                                value={type ? type : ""}
                                rounded={"50px"}
                                onChange={(e) => donationHandler(e.target.value)}
                                width={["auto", "auto", "auto"]}
                                textAlign={"center"} >
                                {[{ name: "All Fundraisings", value: "" }, { name: "My Fundraising", value: "mydonation" }, { name: "Past Fundraising", value: "past" }]?.map((type: any, index: number) => (
                                    <option style={{ fontSize: "14px" }} key={index} value={type?.value}>
                                        {type?.name}
                                    </option>
                                ))}
                            </Select>
                        )}
                        {!pathname?.includes("fundraising") && (
                            <Flex display={["flex", "flex", "flex"]} >
                                <CustomButton onClick={createProduct} text={
                                    <Flex alignItems={"center"} gap={"2"} >
                                        <Text>Create {(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "Rental" : (type === "service" || type === "myservice" || type === "mybooking") ? "Service" : "Item"}</Text>
                                    </Flex>
                                } px={"15px"} height={"40px"} fontSize={"sm"} borderRadius={"32px"} fontWeight={"600"} width={"fit-content"} />
                            </Flex>
                        )}
                        {pathname?.includes("fundraising") && (
                            <CustomButton mr={"4"} onClick={() => push("/dashboard/donation/create")} text={"Create Fundraising"} px={"4"} height={"45px"} fontSize={"sm"} borderRadius={"32px"} fontWeight={"600"} width={"fit-content"} />
                        )}
                    </Flex>
                )}
                {pathname === "/dashboard/product" && (
                    <Flex pt={["6", "6", "6"]} pb={["0px", "6", "6"]} maxWidth={"745px"} position={"relative"} width={"full"} gap={"4"} flexDir={["row"]} alignItems={["start", "start", "center"]} flexDirection={["column", "column", "row"]} >
                        <EventCategory eventpage={true} />
                        <Flex gap={"4"} >
                            <SelectEventPage />
                            <CreateEventBtn btn={true} />
                        </Flex>
                    </Flex>
                )}
            </Flex> */}
            <Flex px={["4", "4", "6"]} w={"full"} flexDir={"column"} >
                {children}
            </Flex>
            <ModalLayout open={open} close={setOpen} rounded='16px' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"3"} p={6} >
                    <Input h={"48px"} placeholder={`Search by ${(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "Business" : (type === "service" || type === "myservice" || type === "mybooking") ? "Business" : "Product"} Name`} rounded={"full"} />
                    <Flex w={"full"} gap={"3"} >
                        <Select h={"48px"} value={initialFilter?.category} onChange={(e) => setInitialFilter({ ...initialFilter, category: e.target?.value })} rounded={"full"} placeholder='Select Category' w={"full"} >
                            {(type === null || type === "mykisok" || type === "myorder") && (
                                <>
                                    {data?.data?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => (
                                        <option key={index} >{item?.replaceAll("_", "")}</option>
                                    ))}
                                </>
                            )}
                            {(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") && (
                                <>
                                    {datarental?.data?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => (
                                        <option key={index} >{item?.replaceAll("_", "")}</option>
                                    ))}
                                </>
                            )}
                            {(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") && (
                                <>
                                    {serviceCategories?.data?.sort((a: string, b: string) => {
                                        if (a > b) {
                                            return 1
                                        } else {
                                            return -1;
                                        }
                                        return 0;
                                    })?.map((item: string, index: number) => (
                                        <option key={index} >{item?.replaceAll("_", "")}</option>
                                    ))}
                                </>
                            )}
                        </Select>
                        <Select h={"48px"} value={initialFilter?.state} onChange={(e) => setInitialFilter({ ...initialFilter, state: e.target?.value })} rounded={"full"} placeholder='Select State' w={"full"} >
                            {stateList?.map((item) => {
                                return (
                                    <option value={item} key={item} >{capitalizeFLetter(item)}</option>
                                )
                            })}
                        </Select>
                    </Flex>
                    <CustomButton text={"Search"} borderRadius={"999px"} height={"58px"} />
                </Flex>
            </ModalLayout>
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} message={message} />
        </Flex>
    )
}

export default Layout