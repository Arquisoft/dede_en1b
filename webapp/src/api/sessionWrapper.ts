import {Session} from "@inrupt/solid-client-authn-browser";

type sessionWrapperType = {
    setSession: (s:Session) => void;
    getSession: () => Session|undefined;
    session: Session;
    count: number;
}

//class sessionWrapper implements sessionWrapperType

var sessionWrapper = function():void{
    
    var setSession = function(s:Session) {
        session = s;
    }
    var getSession = function(): Session | undefined {
        console.log(count++);
        return session;
    }
    let session:Session| undefined= undefined
    let count : number= 0;
}
export default sessionWrapper;