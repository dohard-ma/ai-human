export interface Human {
  id: string;
  name: string;
  language: string;
  preferences?: {
    responseFormat?: "markdown" | "plain";
    codeStyle?: "full" | "diff";
  };
}

export interface HumanMessage {
  content: string;
  timestamp: Date;
  metadata?: {
    files?: string[];
    context?: string;
  };
}
