import CustomButton from '@/components/general/Button'
import MapComponent from '@/components/sharedComponent/map_component'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import useEventStore from '@/global-state/useCreateEventState'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props {}

function SelectMap(props: Props) {
    const {} = props

    const [open, setOpen] = useState(false)

    const { eventdata } = useEventStore((state) => state);

    return (
        <> 
            <CustomButton onClick={()=> setOpen(true)} text={eventdata?.location?.latlng ? 'Change Map Location' : 'Add Google Map' } />
            <ModalLayout title='Map' open={open} close={setOpen} size={"2xl"}  > 
                <MapComponent latlng={eventdata?.location?.latlng} close={setOpen} /> 
            </ModalLayout>
        </>
    )
}

export default SelectMap