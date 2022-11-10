const header = object => {
    const values = Object.values(object)
    return values.map(item => {
        return {
            key: fieldParse(item),
            value: item,
            width: fieldInclude(item)
        }
    })
}
let j = ""

const fieldParse = (str) =>{
    let tmp = str.trim().split(" ")
    tmp[0] = tmp[0].toLowerCase()
    return tmp.join("")
}
const fieldInclude = (str) =>{
    let tmp = str.toUpperCase()
    if(tmp.includes("NAME") || tmp.includes("LECTURER")){
        return 330
    }
    return 100
}
export default header