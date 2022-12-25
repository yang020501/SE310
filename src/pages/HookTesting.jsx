import React from 'react'
import useCourseRegistrationTimeline from '../hooks/useCourseRegistrationTimeline'


const HookTesting = () => {
    const [timeline,setTimeline,saveTimeline,loading,error,setError] = useCourseRegistrationTimeline();

    const handleStartTimeChange = (e) => {
        const tempTimeline = {...timeline}
        tempTimeline.startTime = e.target.value;
        setTimeline(tempTimeline);
    }

    const handleEndTimeChange = (e) => {
        const tempTimeline = {...timeline}
        tempTimeline.endTime = e.target.value;
        setTimeline(tempTimeline);
    }

    const handleSubmit = async () => {
        console.log("clicked");
        await saveTimeline();
    }

    return(<>
            {loading ?? <p>Loading</p>}
            {error ?? <p> {error}</p>}
            <input type='date'
            value={timeline.startTime}
            onChange={handleStartTimeChange}
            />
            <input type='date'
            value={timeline.endTime}
            onChange={handleEndTimeChange}
            />
            <button onClick={handleSubmit}> Button</button>
    </>)
}

export default HookTesting;