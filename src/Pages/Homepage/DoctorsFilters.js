import { useMutation } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import React, { useEffect } from "react";
import { categoryList, languageList } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CURRUNT_PAGE, UPDATE_DOCTORS_FILTERS } from "../../Provider/reducers/HomePage/homepageReducer";

const DoctorsFilters = () => {
    const { data: dataLanguage, isPending: isLoadingLanguage, mutate } = useMutation({ mutationFn: languageList })
    const { data: datacategoryList, isPending: isLoadingcategoryList, mutate: mutateCategory } = useMutation({ mutationFn: categoryList })
    //hooks
    const dispatch = useDispatch()
    const { doctorsFilter } = useSelector(state => state?.homepageReducer)


    const inputs = [
        {
            id: 1,
            name: "category",
            value: doctorsFilter?.category,
            isLoading: isLoadingcategoryList,
            options: datacategoryList || []
        },
        {
            id: 2,
            name: "gender",
            value: doctorsFilter?.gender,
            options: [
                { id: "Male", name: "Male" },
                { id: "Female", name: "Female" },
            ],
        },
        {
            id: 3,
            name: "language",
            value: doctorsFilter?.language,
            isLoading: isLoadingLanguage,
            options: dataLanguage || []
        },
        {
            id: 4,
            name: "sort",
            value: doctorsFilter?.sort,
            options: [
                { id: 0, name: "Experience High-Low" },
                { id: 1, name: "Experience Low-High" },
            ],
        },
    ];

    useEffect(() => {
        mutate()
        mutateCategory()
    }, [mutate, mutateCategory])

    const onSelectHandler = (event) => {
        const { value, name } = event.target
        dispatch({ type: UPDATE_DOCTORS_FILTERS, payload: { ...doctorsFilter, [name]: value } })
        dispatch({ type: UPDATE_CURRUNT_PAGE, payload: 1 })
    }

    return (
        <div className="text-sm my-2 mt-5">
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                    <Filter size={12} />
                    <span>Filter</span>
                </div>
                <div className="flex items-center gap-2">
                    {inputs.map(({ name, options, id, isLoading, value }) => (
                        <select
                            key={id}
                            value={value || ""}
                            onChange={onSelectHandler}
                            name={name}
                            className="border rounded-md p-1 px-3 outline-none "
                        >
                            <option value=""> {isLoading ? `Loading...` : `Select ${name.charAt(0).toUpperCase() + name.slice(1)}`}</option>
                            {options.map(({ id: optionId, name: optionName }) => (
                                <option key={optionId} value={optionId}>
                                    {optionName}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsFilters;
