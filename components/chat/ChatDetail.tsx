'use client'

import { axiosClient } from "@/config/AxiosConfig";
import { useAuth } from "@/lib/hooks/useAuth";
import { ImageType, IUserDetail } from "@/lib/types/AuthTypes";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import ChatHeader from "./ChatHeader";
import MessageDetail from "./MessageDetail";
import { socket } from "@/config/SocketConfig";

export type ISingleMessage = {
  createdAt: Date,
  file: ImageType
  id: string
  message: string
  messageId: null | string
  receiver: string
  sender: string
  updatedAt: Date
};


export default function ChatDetailWithUser() {
  const params = useParams()
  const [userDetail, setUserDetail] = useState<IUserDetail>();
  const {loggedInUser} = useAuth();
  const [messages, setMessages] = useState<Array<ISingleMessage>>([]);
  const token = Cookies.get("token")
  const [msg, setMsg] = useState<string>("")

  const router = useRouter()

  const getUserDetail = async () => {
    try {
      const response = await axiosClient.get("/user/"+params.userId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) as unknown as {result: IUserDetail}
      setUserDetail(response.result)
    } catch {
      toast.error("User not found")
      router.push('/'+loggedInUser?.role+"/users")
    }
  }

  const getChatWithUser =  async() => {
    try {
      const response = await axiosClient.get("/chat/"+params.userId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) as unknown as {result: Array<ISingleMessage>}
      setMessages(response.result.reverse())
    } catch {
      toast.error("Error fetching chat Detail")
    }
  }

  useEffect(() => {
    const handleMessageAck = () => {
      // console.log(data.sender.toString() === userDetail?._id.toString());
      getChatWithUser();
    };

    socket.on("NEW_MESSAGE_ACK", handleMessageAck);
    return () => {
      socket.off("NEW_MESSAGE_ACK", handleMessageAck);
    }
  }, [])
  
  useEffect(() => {
    socket.connect()
    return () => {
      
      getUserDetail()
      getChatWithUser()
    }
  }, [])

  const submitChat = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    try {
      const messageDetail = {
        message: msg, 
        receiver: userDetail?._id,
        // file: null
      }

      const response = await axiosClient.post("/chat/", messageDetail, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }) as unknown as {result: ISingleMessage}

      socket.emit("NEW_MESSAGE", {sender: loggedInUser?._id, receiver: userDetail?._id});

      setMsg("")
      const oldMessages = messages; 
      oldMessages.push(response.result)
    } catch {
      toast.error("Error sending chat")
    }
  }
  return (
    <section className="flex h-[calc(100dvh-9.5rem)] min-h-128 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <ChatHeader userDetail={userDetail as IUserDetail} />

      <MessageDetail
        messages={messages}
        loggedInUser={loggedInUser as IUserDetail}
      />

      <div className="flex items-center gap-2 border-t border-slate-200 px-3 py-3">
        <form onSubmit={submitChat} className="flex w-full items-center">
          <input
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value)
            }}
            name="message"
            type="text"
            className="flex min-w-0 flex-1 items-center rounded-full bg-slate-100 px-4 py-2"
            placeholder="Aa"
          />

          <button
            type="submit"
            aria-label="Send a like"
            className="grid size-9 shrink-0 place-items-center rounded-full text-sky-600 hover:bg-sky-50"
          >
            <Icon icon={"fa7-solid:paper-plane"} className="size-5" />
          </button>
        </form>
      </div>
    </section>
  );
}

