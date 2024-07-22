import {server} from "./src/server";
import {PORT} from "./src/config";

const serverON = () => {
try {
    server.listen("4000",()=>{
        console.log(`server run PORT : ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });    
    
} catch (error) {
    console.error(`server off erro ${error}`)
}
};

serverON();