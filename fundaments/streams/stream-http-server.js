import http from "node:http"
import { Transform } from "node:stream"

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)
        
        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async (req, res) => {
    
    const buffers = []
    
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    
    const fullStreamContent = Buffer.concat(buffers).toString() // concat() serve para concatenar todos os pequenos buffers em 1 só

    console.log(fullStreamContent)

    return res.end(fullStreamContent)
    
    
    //return req
     //.pipe(new InverseNumberStream())
    // .pipe(res)
})

server.listen(3334)