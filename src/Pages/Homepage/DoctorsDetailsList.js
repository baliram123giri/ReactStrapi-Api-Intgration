import React, { useEffect } from 'react'
import DoctorCard from './DoctorCard'
import { useMutation } from '@tanstack/react-query'
import { doctosDetailsServiceList } from './service'
import { useSelector } from 'react-redux'

const DoctorsDetailsList = () => {
    const { data, isPending, mutate } = useMutation({ mutationFn: doctosDetailsServiceList })
    const { activeLoaction } = useSelector(state => state?.globalReducer)
    useEffect(() => {
        if (!activeLoaction) return 
        let query = `&filters[hospitals][locations][name]=${activeLoaction}`
        mutate(query)
    }, [mutate, activeLoaction])
    if (isPending) return <>Loading...</>
    return (
        <div>
            {data?.map(({ id, ...rest }) => {
                return <DoctorCard {...rest} key={id} />
            })}

        </div>
    )
}

export default DoctorsDetailsList