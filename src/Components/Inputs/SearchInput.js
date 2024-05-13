import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_ACTIVE_DOCTOR_CATRGORY } from "../../Provider/reducers/HomePage/homepageReducer";

const SearchInput = ({ searchApiCall }) => {
    const [showSearchBox, setSearchBox] = useState(false);
    const [searcInput, setSearchInput] = useState("")
    const { doctosList, activeDoctorsCategory } = useSelector(
        (state) => state?.homepageReducer
    );
    const { activeLoaction } = useSelector(state => state?.globalReducer)

    const dispatch = useDispatch();

    useEffect(() => {
        if (searcInput) {
            let query = `&filters[name][$contains]=${searcInput}&filters[hospitals][locations][name]=${activeLoaction}`
            const searchTime = setTimeout(() => {
                searchApiCall(query)
            }, 700);
            return () => clearTimeout(searchTime)
        } else if (activeLoaction) {
            let query = `&filters[hospitals][locations][name]=${activeLoaction}`
            searchApiCall(query)

        }
    }, [searcInput, searchApiCall, activeLoaction])

    return (
        <div>
            <div
                className={`bg-white ${showSearchBox ? "rounded-t-md" : "rounded-md"
                    } relative p-1 gap-1 items-center flex px-4`}
            >
                <Search size={16} />
                <input
                    value={activeDoctorsCategory || ""}
                    onChange={(event) => {
                        //active the doctor
                        dispatch({
                            type: UPDATE_ACTIVE_DOCTOR_CATRGORY,
                            payload: event.target.value,
                        });

                        setSearchInput(event.target.value)

                    }}
                    onFocus={() => setSearchBox(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setSearchBox(false);
                        }, 300);
                    }}
                    type="text"
                    placeholder="Search by: Doctors, Specialities, Symtoms, Diseases & Treatments"
                    className="w-full p-2 text-xs  flex-1 outline-none"
                />
                {showSearchBox && (
                    <div className="absolute left-0 top-[100%] pb-2  w-full bg-white shadow-md rounded-b-md">
                        <ul className="p-0 text-sm ">
                            {doctosList?.map((ele) => {
                                return (
                                    <li
                                        onClick={() => {
                                            //active the doctor
                                            dispatch({
                                                type: UPDATE_ACTIVE_DOCTOR_CATRGORY,
                                                payload: ele?.name,
                                            });
                                        }}
                                        key={ele?.id}
                                        className={`cursor-pointer  items-center ${activeDoctorsCategory === ele?.name
                                            ? "bg-dark-primary text-white"
                                            : " hover:bg-neutral-200 border-b"
                                            } `}
                                    >
                                        <div className="flex justify-between p-2 ">
                                            <h6>{ele?.name}</h6>
                                            <h6>{ele?.doctor_categories[0]?.name}</h6>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
