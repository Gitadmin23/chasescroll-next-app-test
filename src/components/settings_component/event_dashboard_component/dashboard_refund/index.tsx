import CustomButton from '@/components/general/Button' 
import CopyRightText from '@/components/sharedComponent/CopyRightText'
import EventImage from '@/components/sharedComponent/eventimage'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import RefundBtn from '@/components/sharedComponent/refundbtn' 
import httpService from '@/utils/httpService'
import {
    Box,
    Checkbox,
    Flex,
    Select,
    Switch,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text, 
    Th,
    Thead,
    Tr, 
    useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { FcApproval, FcRight } from "react-icons/fc";
import { useReactToPrint } from 'react-to-print'


// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { CSVLink } from 'react-csv'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { dateFormat, dateFormatDashboad, timeFormat } from '@/utils/dateFormat'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventDate from '@/components/event_details_component/event_date'
import { IoIosArrowDropright, IoMdArrowDropright, IoMdCloseCircle } from 'react-icons/io'
import useCustomTheme from "@/hooks/useTheme";
import { textLimit } from '@/utils/textlimit'
import InterestedUsers from '@/components/sharedComponent/interested_users'
import { URLS } from '@/services/urls'
import { ArrowRight, BoxArrowIcon, LocationIcon, TicketBtnIcon } from '@/components/svg'
import { eventNames } from 'process'
import { useRouter } from 'next/navigation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import { IEventType } from '@/models/Event'
import moment from 'moment'

interface Props {
    index: any
}

function DashboardRefund(props: Props) {
    const {
        index
    } = props

    const {
        bodyTextColor,
        borderColor
    } = useCustomTheme(); 

    const toast = useToast()
    const [size, setSize] = React.useState(20)
    const [showBtn, setShowBtn] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [newData, setNewData] = React.useState([] as any)
    const [filteredData, setFilteredData] = React.useState([] as any)
    const [memberRole, setMemberRoles] = React.useState("")
    const [showUserName, setShowUserName] = React.useState(true)
    const [showEmail, setShowEmail] = React.useState(true)
    const [showDate, setShowDate] = React.useState(true)
    const [showTicketType, setShowTicketType] = React.useState(true)
    const [showNumberOfTicket, setShowNumberOfTicket] = React.useState(true)
    const [showStatus, setShowStatus] = React.useState(true)

    // react query
    const { isLoading, isRefetching, data } = useQuery(['get-event-members' + size + page, index, memberRole], () => httpService.get('/events/get-event-members/' + index, {
        params: {
            size: size,
            page: page,
            eventMemberRole: memberRole
        }
    }), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        }
    })

    const [open, setOpen] = useState(false)

    const [dataInfo, setData] = useState([] as any)
    const [eventData, setEventData] = useState({} as IEventType)

    const { } = useQuery(['all-events-details' + index], () => httpService.get(URLS.All_EVENT + "?id=" + index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            setData(data?.data?.content[0]);
        }
    })

    const { isLoading: loadingcsv, refetch } = useQuery(['downloadcsv'], () => httpService.get("/events/download-event-members/" + index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {

            // Split the CSV string into rows
            const rows = data?.data.trim().split('\n');

            // Extract the header row
            const header = rows.shift().split(',');

            // Function to parse the date fields properly
            const parseDate = (dateString: string) => {
                const dateParts = dateString.split(',');
                const timePart = dateParts.slice(3).join(',');
                const datePart = dateParts.slice(1, 3).join(' ');
                return `${dateParts[0]}, ${datePart}${timePart}`;
            };

            // Convert each row into an object
            const datacsv = rows.map((row: any) => {
                const fields = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map((field: any) => field.replace(/"/g, ''));
                return {
                    name: fields[0],
                    username: fields[1],
                    email: fields[2],
                    tickettype: fields[3] === 'ORGANIZER' || fields[3] === 'VOLUNTEER' || fields[3] === 'ADMIN' ? '' : fields[3],
                    ticketsbought: parseInt(fields[4]),
                    date: parseDate(fields.slice(5).join(','))
                };
            });

            console.log(datacsv);


            setNewData(datacsv)


        }
    })

    useEffect(() => {

        const filteredData = newData.map((item: any) =>
            Object.keys(item).reduce((acc: any, key: any) => {
                if ((key !== 'email' && !showEmail)) {
                    acc[key] = item[key];
                } else if ((key !== 'username' && !showUserName)) {
                    acc[key] = item[key];
                } else if ((key !== 'tickettype' && !showTicketType)) {
                    acc[key] = item[key];
                } else if ((key !== 'date' && !showDate)) {
                    acc[key] = item[key];
                } else if ((key !== 'ticketsbought' && !showNumberOfTicket)) {
                    acc[key] = item[key];
                }
                return acc;
            }, {})
        );

        setFilteredData(filteredData);
        console.log(filteredData);
        (filteredData);

    }, [showDate, showNumberOfTicket, showEmail, showStatus, showStatus, showTicketType, showUserName])

    const { isLoading: loadingData } = useQuery(['all-events-details', index], () => httpService.get(URLS.All_EVENT + "?id=" + index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            // const item: PaginatedResponse<IEventType> = data.data;
            setEventData(data?.data?.content[0]);
        }
    })


    const componentRef: any = React.useRef();

    const tableRef: any = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: capitalizeFLetter(eventData?.eventName),
        pageStyle: `
          @page {
            size: Legal landscape
          }   
        `,
    }); 

    const downloadCSV = () => {
        refetch()
    }

    return (
        <Flex ref={componentRef} width={"full"} flexDirection={"column"} >
            <LoadingAnimation loading={loadingData} >
                <Flex pos={"relative"} width={"full"} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} p={["2", "2", "4", "6"]} alignItems={"center"} flexDir={["column", "column", "row"]} gap={["2", "2", "6", "6"]} >
                    <Flex width={["full", "full", "auto", "auto"]} mr={["auto", "auto", "0px"]} gap={"3"} flexDirection={["column", "column", "row", "row"]} pos={"relative"} p={"2"} rounded={"4px"} >
                        <EventImage data={eventData} width={["full", "full", "247px", "247px"]} height={["150px", "200px", "170px", "170px"]} />
                        <Flex flexDir={"column"} gap={"2"} w={["full", "full", "fit-content", "fit-content"]} >
                            <Text fontSize={["lg", "lg", "32px"]} fontWeight={"semibold"} >{textLimit(capitalizeFLetter(eventData?.eventName), 20)}</Text>
                            {/* <EventDate eventdashboard={true} date={eventData?.startDate} />
                            <EventLocationDetail length={40} fontsize='12px' location={eventData?.location} locationType={eventData?.locationType} indetail={true} eventdashboard={true} /> */}
                            <Box  >
                                <InterestedUsers fontSize={15} event={dataInfo} border={"2px"} size={"30px"} />
                            </Box>
                            <Flex minW={["100px", "100px", "150px"]} gap={"2"} alignItems={"center"} maxW={["full", "full", "200px", "200px"]} >
                                <Flex w={"fit-content"} flexDir={"column"} fontWeight={"bold"}>
                                    <Flex
                                        width={"50px"}
                                        flexDir={"column"}
                                        py={"2px"}
                                        borderWidth={"1px"}
                                        alignItems={"center"}
                                        roundedBottom={"2xl"}
                                        roundedTopLeft={"2xl"}
                                    >
                                        <Text
                                            fontSize={"11.37px"}
                                            lineHeight={"14.81px"}
                                            color={"#3D37F1"}
                                        >
                                            {moment(dataInfo?.startDate).format("MMM")}
                                        </Text>
                                        <Text fontSize={"28.43px"} mt={"-1"} lineHeight={"37.01px"}>
                                            {moment(dataInfo?.startDate).format("D")}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Text fontSize={"14px"} display={["flex", "flex", "none", "none"]} >{textLimit(eventData.eventDescription, 100)}</Text>
                                <Text fontSize={"14px"} display={["none", "none", "flex", "flex"]} >{textLimit(eventData.eventDescription, 50)}</Text>
                            </Flex>
                        </Flex>
                        <Box w={["50px"]} display={["none", "none", "block"]} pos={"relative"} >
                            <Box w={["fit-content"]} position={"relative"} top={"0px"} >
                                <CustomButton text={"View Event"} backgroundColor={"#EFF1FE"} transform={["rotate(-90deg)"]} left={["-45px"]} top={["50px"]} position={["relative", "relative", "absolute"]} color={"#5D70F9"} height={"45px"} fontSize={"xs"} width={"140px"} roundedBottom={"4px"} />
                            </Box>
                        </Box>
                        <Box w={["full"]} display={["block", "block", "none"]} position={"relative"} top={"0px"} >
                            <CustomButton text={"View Event"} backgroundColor={"#EFF1FE"} color={"#5D70F9"} height={"45px"} fontSize={"xs"} width={"full"} roundedBottom={"4px"} />
                        </Box>
                    </Flex>
                    <Flex w={["full", "full", "auto", "auto"]} flexDir={["column", "column", "column", "column", "row"]} alignItems={"center"} ml={["0px", "0px", "auto", "auto"]} gap={"4"} >
                        <Flex display={["none", "none", "none", "flex", "flex"]} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} p={"4"} flexDir={"column"} gap={"4"} justifyContent={"center"} >
                            <Flex gap={"2"} alignItems={"center"}  >
                                <Text w={"100px"} fontSize={"sm"} >Members Roles</Text>
                                <Select width={"fit-content"} outline={"none"} placeholder='All' value={memberRole} onChange={(e) => setMemberRoles(e.target?.value)} >
                                    <option value={"ADMIN"} >Organizer</option>
                                    <option value={"USER"} >Attendees</option>
                                    <option value={"COLLABORATOR"} >Volunter</option>
                                </Select>
                            </Flex>
                            <Flex gap={"2"} alignItems={"center"}  >
                                <Text w={"100px"} fontSize={"sm"} >Display</Text>
                                <Select width={"fit-content"} outline={"none"} value={size} onChange={(e) => setSize(Number(e.target?.value))} >
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>40</option>
                                    <option>50</option>
                                    <option>60</option>
                                    <option>70</option>
                                    <option>80</option>
                                    <option>90</option>
                                    <option>100</option>
                                </Select>
                            </Flex>
                        </Flex>
                        <Flex width={["full", "full", "auto", "auto"]} h={"fit-content"} px={["2", "2", "0px", "0px"]} pb={["2", "2", "0px", "0px"]}  ml={["0px", "0px", "auto"]} gap={"4"} > 
                            <CustomButton onClick={() => setOpen(true)} text={"Export"} width={["100%", "100%", "130px","130px"]} />
                        </Flex>
                    </Flex>
                </Flex>
            </LoadingAnimation>
            <Flex width={"full"} flexDir={"column"} my={["6", "0px", "0px"]} p={["0px", "6", "6"]} >
                <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.data?.content?.length} >

                    <TableContainer >
                        <Table variant='simple' borderWidth={"1px"} colorScheme="gray">
                            <TableCaption>
                                <Box>
                                    Powered By Chasescroll
                                    <Text fontSize={"sm"} >
                                        <CopyRightText />
                                    </Text>
                                </Box>
                            </TableCaption>
                            <Thead bgColor={"#FAFAFB"} >
                                <Tr>
                                    <Th borderRightWidth={"1px"} >
                                        <Flex gap={"3"}>
                                            S/N 
                                        </Flex>
                                    </Th>
                                    <Th borderRightWidth={"1px"} >
                                        <Flex gap={"3"}>
                                            USERNAME
                                            <Switch onChange={(e) => setShowUserName(e.target.checked)} isChecked={showUserName} />
                                        </Flex>
                                    </Th>
                                    <Th borderRightWidth={"1px"} >
                                        <Flex gap={"3"}>
                                            EMAIL ADDRESS
                                            <Switch onChange={(e) => setShowEmail(e.target.checked)} isChecked={showEmail} />
                                        </Flex>
                                    </Th>
                                    <Th borderRightWidth={"1px"} >
                                        <Flex gap={"3"}>
                                            Date & TIME
                                            <Switch onChange={(e) => setShowDate(e.target.checked)} isChecked={showDate} />
                                        </Flex>
                                    </Th>
                                    <Th borderRightWidth={"1px"} >
                                        <Flex gap={"3"}>
                                            Ticket type
                                            <Switch onChange={(e) => setShowTicketType(e.target.checked)} isChecked={showTicketType} />
                                        </Flex>
                                    </Th>
                                    <Th borderRightWidth={"1px"} >
                                        <Flex gap={"3"}>
                                            NO. TICKET
                                            <Switch onChange={(e) => setShowNumberOfTicket(e.target.checked)} isChecked={showNumberOfTicket} />
                                        </Flex>
                                    </Th>
                                    <Th>
                                        <Flex gap={"3"}>
                                            STATUS
                                            <Switch onChange={(e) => setShowStatus(e.target.checked)} isChecked={showStatus} />
                                        </Flex>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.data?.content?.map((person: any, i: number) => {
                                    return (
                                        <Tr key={i} >
                                            <Td borderRightWidth={"1px"} >{(page * size) + (i+1)}</Td>
                                            <Td borderRightWidth={"1px"} >{showUserName ? person?.user?.username : ""}</Td>
                                            <Td borderRightWidth={"1px"} fontSize={"14px"}>{showEmail ? person?.user?.email : ""}</Td>
                                            <Td borderRightWidth={"1px"} fontSize={"14px"}>{showDate ? dateFormat(person?.createdDate) : ""}</Td>
                                            {(person?.ticketType) && (
                                                <Td borderRightWidth={"1px"} fontSize={"14px"}>
                                                    {showTicketType && (
                                                        <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} >
                                                            {person?.ticketType?.slice(0, 1)?.toUpperCase() + person?.ticketType?.slice(1, person?.ticketType?.length)}
                                                        </Flex>
                                                    )}
                                                </Td>
                                            )}
                                            {(!person?.ticketType) && (
                                                <Td borderRightWidth={"1px"} >
                                                    {(person?.role === "ADMIN" && person?.createdBy?.email === person?.user?.email && showTicketType) && (
                                                        <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"brand.chasescrollBlue"} >
                                                            Organizer
                                                        </Flex>
                                                    )}
                                                    {(person?.role === "ADMIN" && person?.createdBy?.email !== person?.user?.email && showTicketType) && (
                                                        <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                                            Admin
                                                        </Flex>
                                                    )}
                                                    {(person?.role === "COLLABORATOR" && showTicketType) && (
                                                        <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#FDF3CF6B"} color={"#FDB806"} >
                                                            Volunteer
                                                        </Flex>
                                                    )}

                                                </Td>
                                            )}
                                            <Td borderRightWidth={"1px"} textAlign={"center"} fontSize={"xs"} >
                                                {(person?.ticketNumber !== 0 && showNumberOfTicket) ? person?.ticketNumber : ""}
                                            </Td>
                                            <Td borderRightWidth={showBtn ? "1px" : "0px"} >
                                                {showStatus &&
                                                    <>
                                                        {person?.ticketScanInfoList?.map((item: {
                                                            scanTime: Array<any>,
                                                            scanned: boolean
                                                        }, index: number) => {
                                                            return (
                                                                <>
                                                                    {item?.scanTime?.length > 0 &&
                                                                        <Flex key={index} fontSize={"xs"} mt={index === 0 ? "0px" : "4"} flexDir={"column"} gap={"2"} >
                                                                            <Text fontWeight={"bold"} >Ticket {index + 1} (MM-DD-YY)</Text>
                                                                            <Flex flexDir={"column"} gap={"1"} >
                                                                                {item?.scanTime?.map((time: number, indexkey: number) => {

                                                                                    return (
                                                                                        <Flex key={indexkey} gap={"1"} w={"200px"} justifyContent={"space-between"} alignItems={"center"}>

                                                                                            <Text >{time ? dateFormatDashboad(time) : ""} {time ? timeFormat(time) : ""} </Text>
                                                                                            {((new Date(item?.scanTime[indexkey])?.getDate() >= new Date(data?.data?.content[0]?.event?.startDate)?.getDate()) && ((new Date(item?.scanTime[indexkey])?.getDate()) <= new Date(data?.data?.content[0]?.event?.endDate)?.getDate())) ? (

                                                                                                <>
                                                                                                    {indexkey !== 0 ? (
                                                                                                        <Flex w={"fit-content"} >
                                                                                                            {new Date(item?.scanTime[indexkey])?.getDate() === new Date(item?.scanTime[indexkey - 1])?.getDate() && (
                                                                                                                <IoMdCloseCircle color='FF0000' size={"20px"} />
                                                                                                            )}
                                                                                                            {(new Date(item?.scanTime[indexkey])?.getDate() !== new Date(item?.scanTime[indexkey - 1])?.getDate()) && (
                                                                                                                <FcApproval size={"20px"} />
                                                                                                            )}
                                                                                                        </Flex>
                                                                                                    ) :
                                                                                                        <Flex w={"fit-content"} >
                                                                                                            <FcApproval size={"20px"} />
                                                                                                        </Flex>
                                                                                                    }
                                                                                                </>
                                                                                            ) :
                                                                                                <Flex w={"fit-content"} >
                                                                                                    <IoMdCloseCircle color='FF0000' size={"20px"} />
                                                                                                </Flex>
                                                                                            }

                                                                                        </Flex>
                                                                                    )
                                                                                })}
                                                                            </Flex>
                                                                        </Flex>
                                                                    }
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                }
                                            </Td>
                                            {showBtn && (
                                                <Td >
                                                    <RefundBtn person={person} index={index} />
                                                </Td>
                                            )}
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Flex py={"6"} gap={"8"} flexDir={["column", "column", "row", "row"]} alignItems={"start"} justifyContent={"space-between"} >
                        <Flex fontSize={"12px"} color={bodyTextColor} lineHeight={"23px"} >
                            Showing {(Number(data?.data?.numberOfElements))} items out of {data?.data?.totalElements} results found
                        </Flex>
                        <Flex display={data?.data?.totalPages === 1 ? "none" : "flex"} gap={"5"} ml={"auto"} >
                            <Box onClick={() => setPage((prev) => prev - 1)} as="button" cursor={data?.data?.first && "not-allowed"} transform={"rotate(180deg)"} disabled={data?.data?.first} _disabled={{ opacity: "20%" }} >
                                <BoxArrowIcon />
                            </Box>
                            <Flex width={"26px"} border={(data?.data?.number + 1) === 1 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                1
                            </Flex>
                            {(data?.data?.totalPages >= 2) && (
                                <Flex as={"button"} onClick={() => setPage(1)} width={"26px"} border={(data?.data?.number + 1) === 2 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    2
                                </Flex>
                            )}
                            {(data?.data?.totalPages >= 3) && (
                                <Flex as={"button"} onClick={() => setPage(2)} width={"26px"} border={(data?.data?.number + 1) === 3 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    3
                                </Flex>
                            )}
                            {(data?.data?.totalPages >= 4) && (
                                <Flex as={"button"} onClick={() => setPage(3)} width={"26px"} border={(data?.data?.number + 1) === 4 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    4
                                </Flex>
                            )}
                            {(data?.data?.number + 1) > 4 &&
                                <Flex width={"26px"} border={(data?.data?.number + 1) > 4 ? "1px" : "0px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    ...
                                </Flex>
                            }
                            {(data?.data?.number + 1) > 4 &&
                                <Flex width={"26px"} border={"1px"} rounded={"6px"} height={"24px"} justifyContent={"center"} alignItems={"center"} >
                                    {data?.data?.number + 1}
                                </Flex>
                            }
                            <Box onClick={() => setPage((prev) => prev + 1)} as="button" cursor={data?.data?.last && "not-allowed"} disabled={data?.data?.last} _disabled={{ opacity: "20%" }} >
                                <BoxArrowIcon />
                            </Box>
                        </Flex>
                    </Flex>
                </LoadingAnimation>
            </Flex>

            <ModalLayout open={open} close={setOpen}>
                <Flex py={"8"} px={"6"} flexDirection={"column"} gap={"4"} width={"full"} justifyContent={"center"} alignItems={"center"} >
                    <CustomButton fontSize={"lg"} width={"full"} backgroundColor={"transparent"} color={"#FF6F61"} onClick={handlePrint} text='PDF' />
                    <Flex width={"full"} height={"1px"} bgColor={"#DDE6EB"} />
                    <CSVLink style={{ width: "100%" }} data={filteredData[0]?.name ? filteredData : newData[0]?.name ? newData : []}
                        filename={data?.data?.content[0]?.event?.eventName?.slice(0, 1)?.toUpperCase() + data?.data?.content[0]?.event?.eventName?.slice(1, data?.data?.content[0]?.event?.eventName?.length) + ".csv"} >
                        <CustomButton onClick={downloadCSV} fontSize={"lg"} width={"full"} backgroundColor={"transparent"} color={"#5D70F9"} text='CSV' />
                    </CSVLink>


                </Flex>
            </ModalLayout>
        </Flex >
    )
}

export default DashboardRefund
