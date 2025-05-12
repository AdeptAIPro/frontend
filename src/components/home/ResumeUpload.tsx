import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, ArrowRight, Check, AlertCircle } from "lucide-react";
import { UploadStatus } from "./types";

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
    if (!selectedFile) {
      return;
    }
    
    // Check file type
    const fileType = selectedFile.type;
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (!validTypes.includes(fileType)) {
      setUploadStatus("error");
      setErrorMessage("Invalid file format. Please upload PDF, DOC, or DOCX files only.");
      setFile(null);
      return;
    }
    
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadStatus("error");
      setErrorMessage("File is too large. Maximum size is 5MB.");
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setUploadStatus("idle");
    setErrorMessage("");
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    // Here you would normally send the file to your server
    // For now we'll just simulate a successful upload
    setTimeout(() => {
      setUploadStatus("success");
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h3 className="text-xl font-medium mb-4">Submit Your Resume</h3>
      
      <div className="mb-6">
        <Link to="/marketplace/talent">
          <Button 
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
          >
            Talent Marketplace
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="file"
            id="resume-upload"
            className="sr-only"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <label
            htmlFor="resume-upload"
            className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
          >
            <div className="flex flex-col items-center justify-center pt-3 pb-3">
              <Upload className="w-6 h-6 mb-1 text-gray-400" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX (MAX. 5MB)
              </p>
            </div>
          </label>
        </div>
        
        {uploadStatus === "error" && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}
        
        {file && uploadStatus !== "error" && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm truncate flex-1">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-muted-foreground">
                {Math.round(file.size / 1024)} KB
              </p>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleUpload} 
          disabled={!file || uploadStatus === "success"} 
          className="w-full"
          size="sm"
        >
          {uploadStatus === "success" ? "Resume Uploaded!" : "Upload Resume"}
          {uploadStatus !== "success" && <Upload className="ml-2 h-4 w-4" />}
        </Button>
        
        {uploadStatus === "success" && (
          <p className="text-sm text-green-600">
            Thank you for your submission!
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;