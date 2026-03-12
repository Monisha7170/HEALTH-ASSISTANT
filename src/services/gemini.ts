import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeSymptoms(params: {
  symptoms: string;
  age: string;
  duration: string;
  severity: string;
  location: string;
  language: string;
}): Promise<string> {
  const model = ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Analyze the following health information and provide a structured response in ${params.language}.
    
    User Information:
    - Symptoms: ${params.symptoms}
    - Age: ${params.age}
    - Duration: ${params.duration}
    - Severity: ${params.severity}
    - Location: ${params.location}
    
    Please provide the output in the following structured format (Markdown):
    
    ### RISK LEVEL
    [Risk Level here: Low Risk, Moderate Risk, or High Risk]
    
    ### POSSIBLE CONDITIONS
    - [Condition 1]
    - [Condition 2]
    
    ### RECOMMENDED DOCTOR SPECIALIST
    [Specialist Name]
    
    ### PRECAUTIONS
    - [Precaution 1]
    - [Precaution 2]
    
    ### COMMON MEDICINE SUGGESTIONS
    - [Medicine 1]
    - [Medicine 2]
    
    ### NEARBY HOSPITAL SUGGESTIONS
    - [Hospital 1]
    - [Hospital 2]
    
    ### HEALTH TIPS
    - [Tip 1]
    - [Tip 2]
    
    ### EMERGENCY WARNING
    [Only if symptoms suggest a serious condition, otherwise omit this section]
    
    DISCLAIMER: This AI health assistant provides general informational guidance only and is not a substitute for professional medical advice, diagnosis, or treatment.`,
  });

  const response = await model;
  return response.text || "Failed to generate analysis.";
}
