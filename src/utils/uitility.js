export const findElementById = (id, data) => {
    if (data.length > 0) {
        return data.find(item => item.id === id)
    }
    return null
}