import React, { useEffect } from 'react'
import SearchInput from '../../Components/Inputs/SearchInput'
import { useMutation } from '@tanstack/react-query'
import { doctosList } from './service'
import { useDispatch } from 'react-redux'
import { UPDATE_DOCTORS_LIST } from '../../Provider/reducers/HomePage/homepageReducer'

const Banner = () => {
    const dispatch = useDispatch()

    const { mutate } = useMutation({
        mutationFn: doctosList, onSuccess(data) {
            //dispatch the doctors list
            dispatch({ type: UPDATE_DOCTORS_LIST, payload: data })
        }
    })

    useEffect(() => {
        mutate()
    }, [])

    return (
        <div className='bg-primary p-2'>
            <div className="w-full lg:w-1/2">
                <SearchInput />
            </div>
        </div>
    )
}

export default Banner