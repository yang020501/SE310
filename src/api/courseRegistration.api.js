import getFakeAxiosResponse from "../mock/axios.api"

/*
    POST /courseRegistration/timeline/
    {
        startTime: "2022-12-13T00:00:00",
        endTime: "2022-12-15T00:00:00"
    }

    GET /courseRegistration/timeline

*/

const timelineResponse = {
    startTime: "2022-12-13T00:00:00",
    endTime: "2022-12-15T00:00:00"
}



const courseRegistrationApi = {
    setTimeline: async (startTime,endTime) => {

        console.info("Send fake timeline request for debugging purpose");

        const data = {
            startTime,
            endTime
        }

        console.log(data);

        return await getFakeAxiosResponse(data,201,"Created");
    },
    getTimeline: async () => {
        console.info("Fetching timeline");

        return await getFakeAxiosResponse(
            timelineResponse,
            200,
            "OK"
        )
    }
}

export default courseRegistrationApi;