import React, { useEffect, useMemo, useState } from 'react'
import DoctorCard from './DoctorCard'
import { useMutation } from '@tanstack/react-query'
import { doctosDetailsServiceList } from './service'
import { useSelector } from 'react-redux'
import { AppPagination } from '../../Components/Pagination/AppPagination'
import Loader from '../../Components/Loader/Loader'
import DoctorsFilters from './DoctorsFilters'


const DoctorsDetailsList = () => {
    const { data, isPending, mutate } = useMutation({ mutationFn: doctosDetailsServiceList })
    const [currentPage, setCurrentPage] = useState(1)
    const { activeLoaction } = useSelector(state => state?.globalReducer)
    useEffect(() => {
        if (!activeLoaction) return
        let query = `&filters[hospitals][locations][name]=${activeLoaction}&pagination[page]=${currentPage}&pagination[pageSize]=2`
        mutate(query)
    }, [mutate, activeLoaction, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [activeLoaction])

    const total = useMemo(() => data?.meta?.pagination?.total ?? 0, [data?.meta?.pagination?.total])

    if (isPending) return <Loader />
    return (
        <div>
            <DoctorsFilters />
            <h5>Search Result ({total})</h5>
            {data?.data?.map(({ id, ...rest }) => {
                return <DoctorCard {...rest} key={id} />
            })}
            <AppPagination currentPage={currentPage} total={total} onPageChnage={(page) => setCurrentPage(page)} />
        </div>
    )
}

export default DoctorsDetailsList