
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mic, Send, Play, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface InterviewQuestion {
  question: string;
  context?: string;
}

// Mock interview questions by role
const interviewQuestions: Record<string, InterviewQuestion[]> = {
  "software-engineering": [
    { question: "Tell me about yourself and your experience with software development." },
    { question: "What was the most challenging project you've worked on and how did you overcome the obstacles?" },
    { question: "How do you stay updated with the latest technologies and programming practices?" },
    { question: "Can you explain how you debug complex issues in your code?" },
    { question: "Describe a situation where you had to optimize code for better performance." }
  ],
  "data-science": [
    { question: "What methodologies do you use for data cleaning and preprocessing?" },
    { question: "Explain a challenging data science project you worked on and the insights you discovered." },
    { question: "How do you validate your machine learning models?" },
    { question: "What approach would you take for a classification problem with imbalanced data?" },
    { question: "How do you communicate complex analytical findings to non-technical stakeholders?" }
  ],
  "product-management": [
    { question: "How do you prioritize product features?" },
    { question: "Describe how you gather and incorporate user feedback into your product decisions." },
    { question: "Tell me about a time when you had to make a difficult product decision based on conflicting data." },
    { question: "How do you work with engineers and designers to build a product?" },
    { question: "What metrics do you use to measure product success?" }
  ],
  "marketing": [
    { question: "How do you measure the success of a marketing campaign?" },
    { question: "Describe a marketing strategy you developed and implemented. What were the results?" },
    { question: "How do you stay current with digital marketing trends and tools?" },
    { question: "Tell me about a time when you had to pivot your marketing strategy. Why did you change course?" },
    { question: "How do you identify and target your ideal customer segments?" }
  ]
};

const feedbackExamples = [
  {
    criteria: "Content Relevance",
    score: 85,
    feedback: "Your answer directly addressed the question with specific examples from your experience."
  },
  {
    criteria: "Clarity and Structure",
    score: 75,
    feedback: "Your response had a clear structure but could be more concise in some areas."
  },
  {
    criteria: "Technical Accuracy",
    score: 90,
    feedback: "You demonstrated strong technical knowledge relevant to the position."
  },
  {
    criteria: "Soft Skills Demonstration",
    score: 80,
    feedback: "You effectively showcased problem-solving and teamwork in your examples."
  }
];

const MockInterview = () => {
  const [role, setRole] = useState("");
  const [currentStep, setCurrentStep] = useState(0); // 0: selection, 1: interview, 2: feedback
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const { toast } = useToast();

  const startInterview = () => {
    if (!role) {
      toast({
        title: "Please select a role",
        description: "You must select a job role to begin the interview.",
        variant: "destructive",
      });
      return;
    }

    const initialQuestion = interviewQuestions[role][0];
    setMessages([
      { 
        role: 'ai', 
        content: `Welcome to your mock interview for the ${getRoleTitle(role)} position. I'll be asking you some common interview questions. Let's start:\n\n${initialQuestion.question}` 
      }
    ]);
    setCurrentQuestion(initialQuestion);
    setQuestionIndex(0);
    setCurrentStep(1);
  };

  const getRoleTitle = (roleKey: string) => {
    const titles: Record<string, string> = {
      "software-engineering": "Software Engineering",
      "data-science": "Data Science",
      "product-management": "Product Management",
      "marketing": "Marketing"
    };
    return titles[roleKey] || roleKey;
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const updatedMessages = [...messages, { role: 'user' as const, content: userInput }];
    setMessages(updatedMessages);
    setUserInput("");
    setIsThinking(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsThinking(false);
      
      // Check if we have more questions
      const nextQuestionIndex = questionIndex + 1;
      if (nextQuestionIndex < interviewQuestions[role].length) {
        const nextQuestion = interviewQuestions[role][nextQuestionIndex];
        setMessages([
          ...updatedMessages,
          { 
            role: 'ai' as const, 
            content: `Thank you for your response. Let's continue with the next question:\n\n${nextQuestion.question}` 
          }
        ]);
        setCurrentQuestion(nextQuestion);
        setQuestionIndex(nextQuestionIndex);
      } else {
        // Interview complete
        setMessages([
          ...updatedMessages,
          { 
            role: 'ai' as const, 
            content: "Thank you for completing the interview! I'm analyzing your responses to provide feedback." 
          }
        ]);
        setInterviewCompleted(true);
        
        // Generate random score between 70-95
        const score = Math.floor(Math.random() * 26) + 70;
        setOverallScore(score);
        
        // Move to feedback step after a delay
        setTimeout(() => {
          setCurrentStep(2);
        }, 2000);
      }
    }, 2000);
  };

  const resetInterview = () => {
    setCurrentStep(0);
    setMessages([]);
    setCurrentQuestion(null);
    setQuestionIndex(0);
    setUserInput("");
    setInterviewCompleted(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">AI Mock Interview</h2>
        <p className="text-muted-foreground">
          Practice your interview skills with our AI interviewer and receive instant feedback to improve your performance.
        </p>
      </div>

      {currentStep === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Interview Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Job Role</p>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-engineering">Software Engineering</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="product-management">Product Management</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">What to expect</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>The AI will ask you 5 common interview questions for your selected role</li>
                <li>Answer each question as you would in a real interview</li>
                <li>After completing all questions, you'll receive feedback on your performance</li>
                <li>Practice as many times as you'd like to improve your skills</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startInterview} disabled={!role} className="w-full">
              <Play className="mr-2 h-4 w-4" /> Start Mock Interview
            </Button>
          </CardFooter>
        </Card>
      ) : currentStep === 1 ? (
        <div className="space-y-4">
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    Interviewing for: {getRoleTitle(role)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Question {questionIndex + 1} of {interviewQuestions[role].length}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="h-[400px] overflow-y-auto border rounded-lg mb-4 p-4 bg-muted/30">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.role === 'ai' ? 'mr-12' : 'ml-12'}`}
              >
                <div className={`p-3 rounded-lg ${
                  message.role === 'ai' 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="mb-4 mr-12">
                <div className="p-3 rounded-lg bg-secondary text-secondary-foreground animate-pulse">
                  The interviewer is preparing the next question...
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-end gap-2">
            <Textarea 
              placeholder={interviewCompleted 
                ? "Interview completed. Please wait for feedback..." 
                : "Type your response here..."
              }
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1"
              disabled={interviewCompleted || isThinking}
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                disabled={interviewCompleted || isThinking}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={!userInput.trim() || interviewCompleted || isThinking}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Interview Performance</h3>
                  <p className="text-sm text-muted-foreground">Overall assessment of your interview responses</p>
                </div>
                <div className="relative w-20 h-20 flex items-center justify-center bg-muted rounded-full">
                  <span className="text-2xl font-bold">{overallScore}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="detailed">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="detailed">Detailed Feedback</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="detailed" className="space-y-4 pt-4">
              {feedbackExamples.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{item.criteria}</h4>
                      <span className="font-semibold">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2 mb-4" />
                    <p className="text-sm">{item.feedback}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="summary" className="pt-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-semibold text-lg">Key Strengths</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provided concrete examples to support your answers</li>
                    <li>Maintained good structure in most responses</li>
                    <li>Demonstrated technical knowledge appropriate for the role</li>
                    <li>Showed enthusiasm and interest in the position</li>
                  </ul>
                  
                  <h3 className="font-semibold text-lg mt-6">Areas for Improvement</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Some responses could be more concise and focused</li>
                    <li>Provide more quantifiable achievements and results</li>
                    <li>Better align examples with the specific requirements of the role</li>
                    <li>Prepare more detailed answers about handling challenges and failures</li>
                  </ul>
                  
                  <div className="bg-muted p-4 rounded-lg mt-6">
                    <h3 className="font-semibold">Tips for Your Next Interview</h3>
                    <p className="text-sm mt-2">
                      Practice the STAR method (Situation, Task, Action, Result) for structured responses.
                      Research the company more thoroughly and reference specific projects or values.
                      Prepare 2-3 thoughtful questions to ask the interviewer about the role and company.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center">
            <Button onClick={resetInterview}>
              <RefreshCw className="mr-2 h-4 w-4" /> Try Another Interview
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
