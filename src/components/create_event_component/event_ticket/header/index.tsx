import useEventStore from '@/global-state/useCreateEventState';
import { Checkbox, Flex } from '@chakra-ui/react';
import React, { useState } from 'react'

interface Props { }

function EventTicketHeader(props: Props) {
    const { } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);
    const [isFree, setIsFree] = useState(false)


    const HandleDeleteAllTicket = (name: any, price: any) => {
        updateEvent({
            ...eventdata,
            productTypeData: [{
                totalNumberOfTickets: eventdata.productTypeData[0].totalNumberOfTickets,
                ticketPrice: price,
                ticketType: name,
                minTicketBuy: eventdata.productTypeData[0].totalNumberOfTickets,
                maxTicketBuy: eventdata.productTypeData[0].totalNumberOfTickets
            }]
        })
    }

    const toggleStatus = () => {
        setIsFree(state => !state)
    }

    React.useEffect(() => {
        setIsFree(eventdata?.productTypeData[0]?.ticketType === "Free" ? true : false)
    }, [])

    return (
        <Flex gap={"2"} className=' w-full flex lg:flex-row gap-2 ' >
            <label
                role='button'
                onClick={() => HandleDeleteAllTicket("", null)}
                style={{ color: !isFree ? "#5D70F9" : "#667085", border: "1px solid #E2E8F0", width: "100%", padding: "4px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", backgroundColor: !isFree ? "#F7F8FF" : "", height: "45px", borderRadius: "8px" }}
                htmlFor="isPaid"  >
                <Checkbox
                    type="checkbox"
                    width={"4"}
                    height={"4"}
                    fontSize={["sm", "md"]}
                    isChecked={!isFree}
                    id="isPaid"
                    onChange={toggleStatus} />
                Paid
            </label>
            <label
                role='button'
                onClick={() => HandleDeleteAllTicket("Free", 0)}
                style={{ color: isFree ? "#5D70F9" : "#667085", border: "1px solid #E2E8F0", width: "100%", padding: "4px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", backgroundColor: isFree ? "#F7F8FF" : "", height: "45px", borderRadius: "8px" }}
                htmlFor="isFree" >
                <Checkbox
                    type="checkbox"
                    width={"4"}
                    height={"4"}
                    fontSize={["sm", "md"]}
                    className="form-checkbox h-4 w-4 text-blue-600 text-sm md:text-base"
                    isChecked={isFree}
                    id="isFree"
                    onChange={toggleStatus} />
                Free
            </label>
        </Flex>
    )
}

export default EventTicketHeader