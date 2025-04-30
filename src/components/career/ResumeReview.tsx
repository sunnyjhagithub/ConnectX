
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ArrowUpFromLine, CheckCircle, AlertCircle, ListChecks, FileText } from "lucide-react";

const ResumeReview = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || 
          selectedFile.type === "application/msword" || 
          selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a resume file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        // Mock feedback data
        setFeedback({
          score: 78,
          formattingScore: 90,
          contentScore: 75,
          keywordsScore: 65,
          strengths: [
            "Clear professional summary",
            "Good quantification of achievements",
            "Appropriate length and structure"
          ],
          weaknesses: [
            "Missing relevant keywords for target industry",
            "Experience descriptions could be more achievement-focused",
            "Skills section needs more specific technical competencies"
          ],
          missingKeywords: ["project management", "cross-functional", "data analysis"],
          suggestions: "Consider reorganizing your skills section to highlight technical competencies first. Add more quantifiable achievements to your experience section. Include industry-specific keywords throughout your resume."
        });
        
        toast({
          title: "Resume Analysis Complete",
          description: "Your resume has been analyzed successfully.",
        });
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">AI Resume Review</h2>
        <p className="text-muted-foreground">
          Upload your resume for an instant AI-powered analysis and get personalized feedback to improve your chances of landing interviews.
        </p>
      </div>

      {!feedback ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: PDF, DOCX, DOC (Max 5MB)
                </p>
              </div>

              <div className="w-full max-w-md">
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="resume-upload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ArrowUpFromLine className="w-8 h-8 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input 
                      id="resume-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                
                {file && (
                  <div className="flex items-center justify-between mt-4 p-2 bg-muted rounded text-sm">
                    <span className="truncate max-w-[250px]">{file.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFile(null)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleUpload} 
                  disabled={!file || isUploading || isAnalyzing}
                >
                  {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                </Button>
                
                {(isUploading || isAnalyzing) && (
                  <div className="mt-4">
                    <p className="text-sm text-center mb-2">
                      {isUploading ? "Uploading resume..." : "AI analyzing your resume..."}
                    </p>
                    <Progress value={isUploading ? 70 : 90} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Resume Score</h3>
                  <p className="text-sm text-muted-foreground">Overall assessment of your resume</p>
                </div>
                <div className="relative w-20 h-20 flex items-center justify-center bg-muted rounded-full">
                  <span className="text-2xl font-bold">{feedback.score}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Formatting</h4>
                    <span className="font-semibold">{feedback.formattingScore}%</span>
                  </div>
                  <Progress value={feedback.formattingScore} className="h-2" />
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Content</h4>
                    <span className="font-semibold">{feedback.contentScore}%</span>
                  </div>
                  <Progress value={feedback.contentScore} className="h-2" />
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Keywords</h4>
                    <span className="font-semibold">{feedback.keywordsScore}%</span>
                  </div>
                  <Progress value={feedback.keywordsScore} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {feedback.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <ListChecks className="h-5 w-5 text-primary mr-2" />
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {feedback.missingKeywords.map((keyword: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">AI Recommendations</h3>
              <Textarea 
                value={feedback.suggestions} 
                readOnly 
                className="min-h-[100px]"
              />
              
              <div className="flex justify-center mt-6">
                <Button onClick={() => setFeedback(null)}>
                  Upload Another Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResumeReview;
