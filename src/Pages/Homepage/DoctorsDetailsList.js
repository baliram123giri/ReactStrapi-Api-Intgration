import React, { useEffect, useMemo } from 'react'
import DoctorCard from './DoctorCard'
import { useMutation } from '@tanstack/react-query'
import { doctosDetailsServiceList } from './service'
import { useDispatch, useSelector } from 'react-redux'
import { AppPagination } from '../../Components/Pagination/AppPagination'
import Loader from '../../Components/Loader/Loader'
import DoctorsFilters from './DoctorsFilters'
import { UPDATE_CURRUNT_PAGE } from '../../Provider/reducers/HomePage/homepageReducer'


const DoctorsDetailsList = () => {
    const { data, isPending, mutate } = useMutation({ mutationFn: doctosDetailsServiceList })
    const { activeLoaction } = useSelector(state => state?.globalReducer)
    const { doctorsFilter, currentPage } = useSelector(state => state?.homepageReducer)
    //hooks
    const dispatch = useDispatch()
    useEffect(() => {
        if (!activeLoaction) return
        let query = `&filters[hospitals][locations][name]=${activeLoaction}&pagination[page]=${currentPage}&pagination[pageSize]=2`
        if (doctorsFilter?.category) {
            query += ` &filters[doctor_categories][id][$eq]=${doctorsFilter?.category}`
        }
        if (doctorsFilter?.gender) {
            query += ` &filters[Gender][$eq]=${doctorsFilter?.gender}`
        }
        if (doctorsFilter?.language) {
            query += ` &filters[languages][id][$eq]=${doctorsFilter?.language}`
        }
        if (doctorsFilter?.sort) {
            query += `&sort[1]=experience:${doctorsFilter?.sort === "0" ? "desc" : "asc"}`
        }
        mutate(query)
    }, [mutate, activeLoaction, currentPage, doctorsFilter?.category, doctorsFilter?.gender, doctorsFilter?.language, doctorsFilter?.sort])


    const total = useMemo(() => data?.meta?.pagination?.total ?? 0, [data?.meta?.pagination?.total])

    if (isPending) return <Loader />
    return (
        <div>
            <DoctorsFilters />
            <h5>Search Result ({total})</h5>
            {data?.data?.map(({ id, ...rest }) => {
                return <DoctorCard {...rest} id={id} key={id} />
            })}
            <AppPagination currentPage={currentPage} total={total} onPageChnage={(page) => dispatch({ type: UPDATE_CURRUNT_PAGE, payload: page })} />
        </div>
    )
}

export default DoctorsDetailsList