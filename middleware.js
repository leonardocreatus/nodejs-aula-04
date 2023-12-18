

export function middleware(request, response, next){
    // console.log('print')
    return response.status(401).send({
        message: 'Não autorizado'
    })
    next()
}