import { useMutation } from "@tanstack/react-query";
import { GraduationCap, Languages, MapPin, Share2 } from "lucide-react";
import React, { useEffect } from "react";
import { getDoctorDetails } from "../../Homepage/service";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const DoctorDetails = () => {
    //api call
    const { id } = useParams();
    const { mutateAsync, isPending, data } = useMutation({
        mutationFn: getDoctorDetails,
    });
    useEffect(() => {
        mutateAsync(id);
    }, []);
    if (isPending) return <Loader />;
    if (!data) return <>Doctors Details Not Found!</>;
    console.log(data);
    return (
        <section className="w-[80%] mx-auto">
            <div className="w-full lg:w-[60%]">
                <div className="bg-white p-4 border shadow my-2 flex  rounded-md gap-4 flex-wrap">
                    <div className="w-[100px] border p-1 h-[100px] rounded-full">
                        <img
                       
                            className="object-cover h-full w-full  object-top rounded-full"
                            src={`http://localhost:1337${data?.avatar?.url}`}
                            alt=""
                        />
                    </div>
                    <div className="flex-1">
                        <h5 className="font-semibold text-black text-[20px] mb-1">
                            {data?.name}
                        </h5>
                        <h6 className="font-semibold text-black text-[16px] mb-1">
                            Cardiology
                        </h6>
                        <p>{data?.experience}+ years experience</p>
                        <table className="text-neutral-500 text-sm b_doctor_card mt-3">
                            <tbody>
                                <tr>
                                    <td>
                                        {" "}
                                        <GraduationCap size={16} />{" "}
                                    </td>
                                    <td>
                                        <span>{data?.education}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pe-2">
                                        {" "}
                                        <Languages size={16} />{" "}
                                    </td>
                                    <td>
                                        <span>
                                            {data?.languages?.map(
                                                (ele, index) => `${ele.name}${index >= 0 ? "," : ""}`
                                            )}
                                        </span>
                                    </td>
                                </tr>

                                {data?.hospitals?.map(({ id, name }, index) => {
                                    return (
                                        <tr key={id}>
                                            <td>
                                                {index === 0 ? <MapPin size={16} /> : null}
                                            </td>
                                            <td>
                                                <h6 className="font-semibold text-black text-[14px]">
                                                    {name}
                                                </h6>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Share2 />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorDetails;
