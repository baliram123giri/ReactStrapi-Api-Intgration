import React from 'react'
import { createSlots, findTimeSlots } from '../../../lib/helper'
import Carousel from 'react-multi-carousel';


const BookSlots = ({ start, end }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };
    const slotsData = createSlots()
    const timeSlots = findTimeSlots(start, end)
    console.log(timeSlots)
    return (
        <div className='border p-4 rounded-md shadow-sm w-full'>
            BookSlots

            <Carousel responsive={responsive}>
                {slotsData.map(({ day, date }) => {
                    return <button key={date} className='bg-neutral-200 mx-2 p-2 rounded-md text-sm flex justify-center items-center gap-2'><span>{day}</span><span>{date}</span></button>
                })}
            </Carousel>

            <div className="flex flex-wrap gap-2  border p-2 rounded-md mt-3">
                {timeSlots.map((ele) => {
                    return <button key={ele} className='bg-neutral-200 mx-2 p-2 rounded-md text-sm flex justify-center items-center gap-2'><span>{ele}</span></button>
                })}
            </div>

        </div >
    )
}

export default BookSlots