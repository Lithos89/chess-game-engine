// TODO: Clean up the import so that object destructuring isn't required to export
import { startSession, setMatchObserver, setGameObserver } from "./session";

const Chess = { startSession, setMatchObserver, setGameObserver };

export default Chess;