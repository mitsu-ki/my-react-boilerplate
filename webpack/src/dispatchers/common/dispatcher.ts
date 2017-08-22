import { Dispatcher } from "flux";
interface TPayload {};

class AppDispatcher extends Dispatcher<TPayload> {

}

export default new AppDispatcher();