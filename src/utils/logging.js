
class Logger {

    debug(msg, args){}

    error(msg, args){}

}

class ConsoleLogger extends Logger {
    
    debug(msg, args) {
        console.debug(`${msg} ${JSON.stringify(args)}`)
    }

    error(msg, args) {
        console.error(`${msg} ${JSON.stringify(args)}`)
    }

}

const log = process.env.NODE_ENV !== 'production' ? new ConsoleLogger() : new Logger()

export default log;