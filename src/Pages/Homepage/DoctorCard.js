import { GraduationCap, Languages, MapPin } from 'lucide-react'
import React from 'react'

const DoctorCard = ({ name, experience, education, avatar, languages = [], hospitals = [], doctor_categories = [] }) => {
    return (
        <div className='bg-white rounded-md border flex  my-4'>
            <div className='bg-light-success p-2  border-r'>
                <div className='w-[80px] h-[80px] rounded-full '>
                    <img className='w-full h-full object-cover rounded-full object-top' src={`http://localhost:1337${avatar?.url}`} alt="doctor" />
                </div>
            </div>
            <div className='p-4 border-r flex-1'>
                <div>
                    <h4 className='text-dark-primary font-semibold text-[13px]'>{name}</h4>
                    <div className='text-xs  text-primary'>
                        <span>Fetal Medicine</span> | {experience} years exp
                    </div>
                </div>
                <hr className='my-3' />
                <div className='space-y-2'>
                    <table className='text-neutral-500 text-xs b_doctor_card'>
                        <tbody>
                            <tr>
                                <td>  <MapPin size={14} /> </td>
                                <td><span>{hospitals[0]?.name}</span></td>
                            </tr>
                            <tr>
                                <td> <Languages size={14} />  </td>
                                <td><span>{languages?.map((ele, index) => `${ele.name}${index >= 0 ? "," : ""}`)}</span></td>
                            </tr>
                            <tr>
                                <td>   <GraduationCap size={14} /> </td>
                                <td><span>{education}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex text-xs items-center gap-1 text-neutral-500'>

                    </div>
                    <div className='flex text-xs items-center gap-1 text-neutral-500'>

                    </div>
                </div>
            </div>
            <div className='p-4 flex  flex-col justify-center items-center flex-2 gap-2'>
                <h6 className='text-light-warning font-semibold'>MON-SAT</h6>
                <p className='text-sm text-primary'>(09:00 AM-11:00AM, 12:00 PM-07:00 PM)</p>
                <button className='bg-gradient-to-r font-semibold text-white text-sm p-2 px-5 rounded-[5px]  from-[#036E8C] to-[#1D4E5E]'>
                    BOOK APPOINTMENT
                </button>
            </div>
        </div>
    )
}

export default DoctorCard