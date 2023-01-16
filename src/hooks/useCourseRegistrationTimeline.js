import { useEffect, useState } from "react";
import courseRegistrationApi from "../api/courseRegistration.api";
import { parseToISOSDate, parseToLocalDate } from "../utils/parseDate";


export default function useCourseRegistrationTimeline(){
    const [timeline, setTimeline] = useState({
        startTime: new Date(),
        endTime: new Date()
    });
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const fetchTimeline = async () => {
        
        try {
            setLoading(true);
            const response = await courseRegistrationApi.getTimeline();
            const startTime = parseToLocalDate(response.data.startTime);
            const endTime = parseToLocalDate(response.data.endTime);

            const newTimeline = {
                startTime,
                endTime
            }
            setLoading(false);
            setTimeline(newTimeline);
        }
        catch 
        {
            setError("Cannot fetch registration timeline");
        }   
    }

    const saveTimeline = async () => {
        try {
            setLoading(true);
            const parsedStartTime = parseToISOSDate(timeline.startTime);
            const parsedEndTime = parseToISOSDate(timeline.endTime);
            await courseRegistrationApi.setTimeline(parsedStartTime,parsedEndTime);
            setLoading(false);
        }
        catch(err) {

            console.log(err);

            setError("Cannot save registration timeline");
        }
    }

    useEffect(() => {
        fetchTimeline();
    },[]);

    return [timeline,setTimeline,saveTimeline,loading,error,setError]
}
