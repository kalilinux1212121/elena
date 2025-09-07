import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export interface AIMessage {
  id: string;
  content: string;
  sender: "user" | "elena";
  timestamp: Date;
  type?: "chat" | "code" | "search" | "think";
}

export const useAIProcessor = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm Elena, your advanced AI assistant. I can help you with coding, searching, thinking through problems, and much more. What would you like to work on today?",
      sender: "elena",
      timestamp: new Date(),
      type: "chat"
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processMessage = useCallback(async (userMessage: string, type: "chat" | "code" | "search" | "think" = "chat") => {
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      content: userMessage,
      sender: "user", 
      timestamp: new Date(),
      type
    };

    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      // Simulate AI processing with different responses based on type
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      let response = "";
      
      switch (type) {
        case "code":
          response = generateCodeResponse(userMessage);
          break;
        case "search":
          response = generateSearchResponse(userMessage);
          break;
        case "think":
          response = generateThinkResponse(userMessage);
          break;
        default:
          response = generateChatResponse(userMessage);
      }

      const elenaMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "elena",
        timestamp: new Date(),
        type
      };

      setMessages(prev => [...prev, elenaMsg]);
    } catch (error) {
      toast({
        title: "Error",
        description: "I encountered an issue processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    messages,
    isProcessing,
    processMessage
  };
};

const generateCodeResponse = (userMessage: string): string => {
  const keywords = userMessage.toLowerCase();
  
  if (keywords.includes("react") || keywords.includes("component")) {
    return `I'll help you create a React component. Here's a modern approach:

\`\`\`tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const MyComponent = ({ className, children }: MyComponentProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
};
\`\`\`

This component follows modern React patterns with TypeScript, proper props typing, and Tailwind CSS integration. Would you like me to add any specific functionality?`;
  }
  
  if (keywords.includes("python") || keywords.includes("script")) {
    return `Here's a Python solution for you:

\`\`\`python
def advanced_function(data):
    """
    Advanced data processing function
    """
    processed_data = []
    for item in data:
        if isinstance(item, str):
            processed_data.append(item.upper())
        elif isinstance(item, (int, float)):
            processed_data.append(item * 2)
    return processed_data

# Example usage
result = advanced_function(['hello', 'world', 42, 3.14])
print(result)  # ['HELLO', 'WORLD', 84, 6.28]
\`\`\`

This demonstrates type checking, list comprehension alternatives, and proper Python conventions. Need help with anything specific?`;
  }

  return `I understand you need help with coding. I can assist with:

• **Languages**: Python, JavaScript/TypeScript, React, Node.js, C++
• **Frameworks**: React, Vue, Express, FastAPI
• **Databases**: SQL, MongoDB, Redis
• **Tools**: Git, Docker, CI/CD

Please provide more details about what you'd like to build or the problem you're trying to solve, and I'll generate the appropriate code for you!`;
};

const generateSearchResponse = (userMessage: string): string => {
  return `🔍 **Search Results for: "${userMessage}"**

I would typically search the web for current information, but I'm running in a sandboxed browser environment. However, I can help you with:

• **Technical Documentation**: I have extensive knowledge of programming languages, frameworks, and tools
• **Concepts & Explanations**: I can explain complex topics in detail
• **Best Practices**: Current industry standards and methodologies
• **Problem Solving**: Analytical approaches to challenges

For real-time web searches, I'd recommend integrating with search APIs. Would you like me to explain how to implement web search functionality in your application?`;
};

const generateThinkResponse = (userMessage: string): string => {
  return `🧠 **Deep Analysis Mode**

Let me think through this systematically:

**Problem Analysis:**
${userMessage}

**My Reasoning Process:**
1. **Context Assessment**: Understanding the core question/challenge
2. **Knowledge Synthesis**: Drawing from multiple domains of information
3. **Solution Mapping**: Identifying potential approaches and their trade-offs
4. **Risk Evaluation**: Considering potential issues and mitigation strategies

**Strategic Recommendations:**
• Break complex problems into smaller, manageable components
• Consider both technical and human factors
• Always have backup plans and error handling
• Optimize for maintainability and scalability

**Next Steps:**
What specific aspect would you like me to dive deeper into? I can analyze technical architectures, business logic, user experience considerations, or implementation strategies.`;
};

const generateChatResponse = (userMessage: string): string => {
  const responses = [
    `Absolutely! I'm here to help you with whatever you need. As your AI assistant, I can handle a wide range of tasks from coding to problem-solving. What's on your mind?`,
    
    `I understand what you're looking for. While I can't directly access your computer system like you described, I can be incredibly powerful within this browser environment. I can help you build applications, solve coding problems, explain concepts, and much more!`,
    
    `That's an exciting vision! I'm designed to be your intelligent coding companion. I can help you create applications, debug code, explain complex concepts, and assist with various technical challenges. How can I start helping you today?`,
    
    `I appreciate your ambitious goals! I'm Elena, and I'm here to be your powerful AI assistant. I can help with coding, analysis, problem-solving, and creative tasks. While I operate within browser constraints, I can still be incredibly useful. What project should we work on?`,
  ];
  
  const keywords = userMessage.toLowerCase();
  
  if (keywords.includes("hello") || keywords.includes("hi")) {
    return `Hello! I'm Elena, your advanced AI assistant. I'm ready to help you with anything you need - from coding complex applications to solving challenging problems. What would you like to work on together?`;
  }
  
  if (keywords.includes("help") || keywords.includes("assist")) {
    return `I'm here to assist you! I can help with:

• **Software Development**: Build apps, debug code, architect solutions
• **Problem Solving**: Analyze challenges and provide strategic solutions  
• **Learning**: Explain concepts, teach new skills, provide tutorials
• **Creative Tasks**: Design systems, optimize workflows, brainstorm ideas

Just tell me what you're working on, and I'll adapt my assistance to your specific needs!`;
  }

  return responses[Math.floor(Math.random() * responses.length)];
};