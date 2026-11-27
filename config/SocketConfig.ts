import {io} from "socket.io-client"
import { appConfig } from "./AppConfig";

export const socket = io(appConfig.socketUrl)