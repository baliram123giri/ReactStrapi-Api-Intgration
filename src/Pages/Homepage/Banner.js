import React, { useEffect } from 'react'
import SearchInput from '../../Components/Inputs/SearchInput'
import { useMutation } from '@tanstack/react-query'
import { doctosList, hospitalsList } from './service'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_DOCTORS_LIST } from '../../Provider/reducers/HomePage/homepageReducer'

const Banner = () => {
    const dispatch = useDispatch()
    const { activeLoaction } = useSelector(state => state?.globalReducer)

    const { mutate } = useMutation({
        mutationFn: doctosList, onSuccess(data) {
            //dispatch the doctors list
            dispatch({ type: UPDATE_DOCTORS_LIST, payload: data })
        }
    })
    const { mutate: mutateHospitalsList, data, isPending } = useMutation({
        mutationFn: hospitalsList
    })

    useEffect(() => {
        if (activeLoaction) {
            let query = `&filters[locations][name][$contains]=${activeLoaction}`
            mutateHospitalsList(query)
        }
    }, [mutateHospitalsList, activeLoaction])

    return (
        <div className='bg-primary p-2 flex gap-2 items-center'>
            <div className="w-full lg:w-1/2">
                <SearchInput searchApiCall={mutate} />
            </div>
            <div className="w-full lg:w-1/2">
                <select className={`bg-white w-full outline-none text-sm rounded-md py-2  px-4`}>
                    <option value="">{isPending ? "Loading..." : "Select Hospitals"}</option>
                    {data?.map(({ id, name }) => {
                        return <option key={id} value={id}>{name}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default Banner