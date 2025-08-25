interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  robots: string;
  themeColor: string;
  favicon: string;
}

export async function GET(request: Request) {
  // Extract query parameters for dynamic meta data
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'home';

  // Simulate a slow API to mimic real fetch latency (reduced for better UX)
  await new Promise((r) => setTimeout(r, 500));

  // Dynamic meta data based on page/context
  const metaData: MetaData = {
    title: getPageTitle(page),
    description: getPageDescription(page),
    keywords: getPageKeywords(page),
    author: "ChatBox AI",
    robots: "index, follow",
    themeColor: "#ffffff",
    favicon: "/favicon.ico"
  };

  return Response.json(metaData);
}

function getPageTitle(page: string): string {
  const titles: Record<string, string> = {
    home: "ChatBox - AI-Powered Conversations",
    chat: "Active Chat - ChatBox",
    welcome: "Welcome to ChatBox"
  };
  return titles[page] || "ChatBox - AI Assistant";
}

function getPageDescription(page: string): string {
  const descriptions: Record<string, string> = {
    home: "Experience intelligent conversations with our advanced AI chatbot. Get instant responses, creative solutions, and helpful insights.",
    chat: "Currently engaged in an AI conversation. Get real-time responses and assistance.",
    welcome: "Start your journey with ChatBox AI assistant. Ask questions, get help, and explore possibilities."
  };
  return descriptions[page] || "ChatBox - Your AI conversation partner";
}

function getPageKeywords(page: string): string[] {
  const keywords: Record<string, string[]> = {
    home: ["AI", "chatbot", "artificial intelligence", "conversation", "assistant"],
    chat: ["chat", "AI conversation", "real-time", "responses", "messaging"],
    welcome: ["welcome", "getting started", "AI assistant", "help", "introduction"]
  };
  return keywords[page] || ["AI", "chatbot", "assistant"];
}