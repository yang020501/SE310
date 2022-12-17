export const notifyType = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: 'info'
}
const notifyMessage = {
    UPDATE_SUCCESS: (props) => {
        return {
            message: `Update ${props ? props : ""} successfully!`,
            type: notifyType.SUCCESS
        }
    },
    UPDATE_FAIL: (one, two) => {
        return {
            message: `Update ${one ? one : ""} fail! ${two ? two : ""}`,
            type: notifyType.ERROR
        }
    },
    CREATE_SUCCESS: (props) => {
        return {
            message: `Create ${props ? props : ""} successfully!`,
            type: notifyType.SUCCESS
        }
    },
    CREATE_FAIL: (one, two) => {
        return {
            message: `Create ${one ? one : ""} fail! ${two ? two : ""}`,
            type: notifyType.ERROR
        }
    },
    DELETE_SUCCESS: (props) => {
        return {
            message: `Delete ${props ? props : ""} successfully!`,
            type: notifyType.SUCCESS
        }
    },
    DELETE_FAIL: (one, two) => {
        return {
            message: `Delete ${one ? one : ""} fail! ${two ? two : ""}`,
            type: notifyType.ERROR
        }
    }
}
export default notifyMessage