
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface QuestionType {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number; // Only used for knowledge tests
}

interface AssessmentType {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  category: 'soft' | 'technical' | 'personality';
  icon: React.ReactNode;
}

const availableAssessments: AssessmentType[] = [
  {
    id: "leadership",
    title: "Leadership Assessment",
    description: "Evaluate your leadership style and effectiveness",
    duration: "15 min",
    questions: 20,
    category: 'soft',
    icon: <span className="text-2xl">👑</span>
  },
  {
    id: "communication",
    title: "Communication Skills",
    description: "Assess your verbal and written communication abilities",
    duration: "10 min",
    questions: 15,
    category: 'soft',
    icon: <span className="text-2xl">💬</span>
  },
  {
    id: "teamwork",
    title: "Teamwork & Collaboration",
    description: "Measure your ability to work effectively in teams",
    duration: "12 min",
    questions: 18,
    category: 'soft',
    icon: <span className="text-2xl">👥</span>
  },
  {
    id: "problem-solving",
    title: "Problem Solving Aptitude",
    description: "Test your analytical and critical thinking skills",
    duration: "20 min",
    questions: 25,
    category: 'technical',
    icon: <span className="text-2xl">🧩</span>
  },
  {
    id: "time-management",
    title: "Time Management",
    description: "Evaluate how effectively you manage your time",
    duration: "8 min",
    questions: 12,
    category: 'soft',
    icon: <span className="text-2xl">⏰</span>
  },
  {
    id: "personality",
    title: "Career Personality Profile",
    description: "Discover career paths that match your personality traits",
    duration: "15 min",
    questions: 30,
    category: 'personality',
    icon: <span className="text-2xl">🔍</span>
  }
];

// Sample questions for the Leadership assessment
const leadershipQuestions: QuestionType[] = [
  {
    id: 1,
    question: "When facing a team conflict, I usually:",
    options: [
      "Address it immediately in a group setting",
      "Speak privately with each person involved",
      "Let team members resolve it themselves",
      "Establish a structured process for resolution"
    ]
  },
  {
    id: 2,
    question: "When delegating tasks to team members, I prioritize:",
    options: [
      "Matching tasks to individual strengths",
      "Distributing work equally regardless of skills",
      "Rotating responsibilities to develop new skills",
      "Letting team members choose their tasks"
    ]
  },
  {
    id: 3,
    question: "My approach to motivating team members is primarily:",
    options: [
      "Setting challenging goals with rewards",
      "Providing continuous feedback and recognition",
      "Creating a positive and supportive environment",
      "Leading by example and working alongside them"
    ]
  },
  {
    id: 4,
    question: "When making important decisions, I tend to:",
    options: [
      "Gather input from the team but make the final call myself",
      "Make decisions by team consensus whenever possible",
      "Use data and analytics to guide decision-making",
      "Trust my experience and intuition"
    ]
  },
  {
    id: 5,
    question: "When a team member is underperforming, my first approach is to:",
    options: [
      "Have a direct conversation about performance expectations",
      "Offer additional training or resources",
      "Reassign them to tasks better suited to their abilities",
      "Ask other team members to provide peer support"
    ]
  }
];

const SkillsAssessment = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'list' | 'test' | 'results'>('list');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testProgress, setTestProgress] = useState(0);
  
  const filteredAssessments = selectedCategory === 'all' 
    ? availableAssessments 
    : availableAssessments.filter(assessment => assessment.category === selectedCategory);

  const startAssessment = (assessment: AssessmentType) => {
    setSelectedAssessment(assessment);
    setCurrentView('test');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTestProgress(0);
  };

  const handleAnswerSelection = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < leadershipQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTestProgress(((currentQuestionIndex + 1) / leadershipQuestions.length) * 100);
    } else {
      // Complete the test
      setCurrentView('results');
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTestProgress(((currentQuestionIndex - 1) / leadershipQuestions.length) * 100);
    }
  };

  const goToAssessmentList = () => {
    setCurrentView('list');
    setSelectedAssessment(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  // Mock assessment results
  const assessmentResults = {
    leadershipStyle: "Democratic Leader",
    strengths: [
      "Team building and motivation",
      "Effective delegation",
      "Conflict resolution"
    ],
    areasForImprovement: [
      "Decision-making speed",
      "Strategic planning"
    ],
    careerSuggestions: [
      "Team Lead",
      "Project Manager",
      "Department Director",
      "Change Management Specialist"
    ],
    skillsBreakdown: [
      { skill: "Team Motivation", score: 85 },
      { skill: "Decision Making", score: 70 },
      { skill: "Conflict Resolution", score: 90 },
      { skill: "Strategic Vision", score: 65 },
      { skill: "Delegation", score: 80 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">Skills & Personality Assessments</h2>
        <p className="text-muted-foreground">
          Discover your strengths, identify areas for improvement, and get career path recommendations based on your unique profile.
        </p>
      </div>

      {currentView === 'list' && (
        <>
          <div className="bg-muted p-4 rounded-lg">
            <ToggleGroup 
              type="single" 
              value={selectedCategory}
              onValueChange={value => {
                if (value) setSelectedCategory(value);
              }}
              className="justify-center"
            >
              <ToggleGroupItem value="all">All Assessments</ToggleGroupItem>
              <ToggleGroupItem value="soft">Soft Skills</ToggleGroupItem>
              <ToggleGroupItem value="technical">Technical</ToggleGroupItem>
              <ToggleGroupItem value="personality">Personality</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssessments.map((assessment) => (
              <Card key={assessment.id} className="overflow-hidden hover-scale">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>{assessment.icon}</div>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {assessment.duration} • {assessment.questions} questions
                    </span>
                  </div>
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardFooter className="bg-muted/50">
                  <Button 
                    onClick={() => startAssessment(assessment)} 
                    className="w-full"
                  >
                    Start Assessment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}

      {currentView === 'test' && selectedAssessment && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{selectedAssessment.title}</CardTitle>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {leadershipQuestions.length}
              </span>
            </div>
            <Progress value={testProgress} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">
              {leadershipQuestions[currentQuestionIndex].question}
            </div>
            
            <div className="space-y-3">
              {leadershipQuestions[currentQuestionIndex].options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelection(index)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestionIndex] === index 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border mr-3 ${
                      answers[currentQuestionIndex] === index 
                        ? 'bg-primary-foreground text-primary border-primary-foreground' 
                        : 'border-muted-foreground'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
            <Button 
              variant="outline" 
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button 
              onClick={nextQuestion}
              disabled={answers[currentQuestionIndex] === undefined}
            >
              {currentQuestionIndex < leadershipQuestions.length - 1 ? 'Next' : 'Complete Assessment'}
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentView === 'results' && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center bg-green-100 text-green-800 p-3 rounded-full">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Assessment Completed!</h3>
                <p className="text-muted-foreground">
                  Based on your responses, here's your personalized leadership profile:
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                <h3 className="text-2xl font-bold text-primary">{assessmentResults.leadershipStyle}</h3>
                <p className="text-sm text-muted-foreground mt-1">Your Primary Leadership Style</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessmentResults.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessmentResults.areasForImprovement.map((area, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assessmentResults.skillsBreakdown.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <span className="text-sm font-medium">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {assessmentResults.careerSuggestions.map((career, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between">
              <Button variant="outline" onClick={goToAssessmentList}>
                Return to Assessments
              </Button>
              <Button>
                Save Results to Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SkillsAssessment;
