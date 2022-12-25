
const getFakeAxiosResponse = async (data,status,statusText) => {
    return Promise.resolve({
        // `data` is the response that was provided by the server
        data: data,
      
        // `status` is the HTTP status code from the server response
        status: status,
      
        // `statusText` is the HTTP status message from the server response
        // As of HTTP/2 status text is blank or unsupported.
        // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
        statusText: statusText,
      
        // `headers` the HTTP headers that the server responded with
        // All header names are lower cased and can be accessed using the bracket notation.
        // Example: `response.headers['content-type']`
        headers: {},
      
        // `config` is the config that was provided to `axios` for the request
        config: {},
      
        // `request` is the request that generated this response
        // It is the last ClientRequest instance in node.js (in redirects)
        // and an XMLHttpRequest instance in the browser
        request: {}
      })
}

export default getFakeAxiosResponse;