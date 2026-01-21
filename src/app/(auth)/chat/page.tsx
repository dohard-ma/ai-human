"use client";

import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ThoughtReport } from "@/components/chat/ThoughtReport";
import { ChatInput } from "@/components/chat/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

const MOCK_MESSAGES = [
  {
    role: "assistant" as const,
    content:
      "「小红书插件，能自动跟踪收藏博主的新内容，帮做对标，要不要免费试下？」只发这一句，不用多聊，先拿第一个愿意试的反馈，这一步比你打磨 10 次功能都管用。\n\n这个动作没有任何技术门槛，就是打破你“造完就搁置”的惯性，先让你的工具走出硬盘，拿到第一份真实的市场回应。",
  },
  {
    role: "user" as const,
    content:
      "好吧，我觉得你说的还挺准确的。你是否现在给我生成一下我的天赋报告？",
  },
];

const MOCK_REPORT = {
  thought:
    "用户现在问能不能听到讲话，首先要回应能听到，语气友好一点，符合陪聊的要求，然后延续话题。用户之前是自由职业者，全栈开发，不过追问不能涉及这些洞察。按照要求，回复 1-3 句话，结尾提sahfshfdyasfhgdasdfjdksafhgajfahsdfnfvjdsafdjasgfasfd...",
  answer:
    "能听到呀，你讲得很清楚~\n\n最近有没有碰到什么有意思的小事。按照要求，回复 1-3 句话，结尾提sahfshfdyasfhgdasdfjdksafhgajfahsdfnfvjdsafdjasgfasfd。按照要求，回复 1-3 句话，结尾提sahfshfdyasfhgdasdfjdksafhgajfahsdfnfvjdsafdjasgfasfd。按照要求，回复 1-3 句话，结尾提sahfshfdyasfhgdasdfjdksafhgajfahsdfnfvjdsafdjasgfasfd。按照要求，回复 1-3 句话，结尾提sahfshfdyasfhgdasdfjdksafhgajfahsdfnfvjdsafdjasgfasfd呀？",
};

export default function ChatPage() {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <ChatHeader />

      <main className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full">
          <div
            className="max-w-2xl mx-auto pt-4 pb-48 space-y-6"
            style={{ contain: "inline-size" }}
          >
            {MOCK_MESSAGES.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}

            <div className="px-4">
              <ThoughtReport
                thought={MOCK_REPORT.thought}
                answer={MOCK_REPORT.answer}
              />
            </div>
          </div>
        </ScrollArea>
      </main>

      <ChatInput />
    </div>
  );
}
