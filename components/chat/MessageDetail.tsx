import { IUserDetail } from "@/lib/types/AuthTypes";
import { ISingleMessage } from "./ChatDetail";

export default function MessageDetail({messages, loggedInUser}: Readonly<{messages: Array<ISingleMessage>, loggedInUser: IUserDetail}>) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-white px-4 py-5">
      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const next = messages[index + 1];

        const isMine =
          message.sender.toString() === loggedInUser?._id.toString();
        const startsGroup = previous?.sender !== message.sender;
        const endsGroup = next?.sender !== message.sender;

        return (
          <div
            key={message.id}
            className={`flex max-w-[75%] flex-col ${
              isMine ? "self-end items-end" : "self-start items-start"
            } ${startsGroup ? "mt-1" : ""}`}
          >
            <p
              className={`px-3.5 py-2 text-sm leading-6 ${
                isMine
                  ? "bg-[#0084ff] text-white"
                  : "bg-slate-100 text-slate-900"
              } ${bubbleRadius(isMine, startsGroup, endsGroup)}`}
            >
              {message.message}
            </p>
            {endsGroup ? (
              <span className="mt-1 px-1 text-[11px] text-slate-400">
                {`${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes()}`}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function bubbleRadius(
  isMine: boolean,
  startsGroup: boolean,
  endsGroup: boolean,
) {
  if (startsGroup && endsGroup) return "rounded-3xl";

  if (isMine) {
    if (startsGroup) return "rounded-3xl rounded-br-md";
    if (endsGroup) return "rounded-3xl rounded-tr-md";
    return "rounded-3xl rounded-r-md";
  }

  if (startsGroup) return "rounded-3xl rounded-bl-md";
  if (endsGroup) return "rounded-3xl rounded-tl-md";
  return "rounded-3xl rounded-l-md";
}