
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  details: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How polarized is the political discourse in your society?",
    details: "Consider factors like media echo chambers, partisan rhetoric, and the ability of different political groups to engage in constructive dialogue.",
    options: ["Minimal polarization", "Moderate disagreements", "Significant division", "Extreme polarization"]
  },
  {
    id: 2,
    text: "What is the state of democratic institutions in your country?",
    details: "Evaluate the independence of courts, electoral integrity, and the effectiveness of checks and balances.",
    options: ["Strong and stable", "Functioning but stressed", "Weakening", "Severely compromised"]
  },
  {
    id: 3,
    text: "How would you rate media independence and freedom of press?",
    details: "Consider ownership concentration, editorial independence, and journalist safety.",
    options: ["Fully independent", "Mostly free", "Partially restricted", "Heavily controlled"]
  },
  {
    id: 4,
    text: "What is the level of economic inequality in your society?",
    details: "Assess wealth distribution, social mobility, and access to opportunities.",
    options: ["Low inequality", "Moderate inequality", "High inequality", "Extreme inequality"]
  },
  {
    id: 5,
    text: "How strong is civil society in your country?",
    details: "Consider NGOs, community organizations, and citizen participation in public life.",
    options: ["Very strong", "Moderately active", "Weakening", "Severely restricted"]
  },
  {
    id: 6,
    text: "What is the state of minority rights and protections?",
    details: "Evaluate legal protections, social inclusion, and treatment of minority groups.",
    options: ["Strong protections", "Adequate safeguards", "Limited protection", "Systematic discrimination"]
  },
  {
    id: 7,
    text: "How would you characterize political leadership's respect for democratic norms?",
    details: "Consider adherence to constitutional limits, peaceful transfer of power, and respect for opposition.",
    options: ["Strong respect", "General compliance", "Occasional violations", "Frequent violations"]
  },
  {
    id: 8,
    text: "What is the level of public trust in democratic processes?",
    details: "Assess confidence in elections, institutions, and democratic decision-making.",
    options: ["High trust", "Moderate trust", "Low trust", "Very low trust"]
  },
  {
    id: 9,
    text: "How prevalent is political violence or its threat?",
    details: "Consider incidents of political intimidation, violence at protests, and extremist activities.",
    options: ["Rare/None", "Occasional incidents", "Frequent threats", "Systematic violence"]
  },
  {
    id: 10,
    text: "What is the state of education about democratic values?",
    details: "Evaluate civic education, critical thinking skills, and understanding of democratic principles.",
    options: ["Strong education", "Adequate coverage", "Limited exposure", "Missing/Distorted"]
  }
];

const Index = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateRisk = () => {
    if (Object.keys(answers).length < 10) {
      toast.error("Please answer all questions before proceeding");
      return;
    }

    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxScore = 30; // 10 questions * 3 (max value per question)
    const riskPercentage = (totalScore / maxScore) * 100;
    setShowResults(true);
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Democratic Vulnerability Assessment</h1>
          <p className="text-gray-600 text-lg">
            Evaluate the resilience of democratic institutions through these key indicators
          </p>
        </div>

        <div className="progress-bar mb-8">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-xl">{question.text}</h2>
                <button
                  onClick={() => handleExpand(question.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      expandedId === question.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <div className={`details-expand ${expandedId === question.id ? 'open' : ''}`}>
                <p className="text-gray-600 mt-4 mb-6">{question.details}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(question.id, index)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      answers[question.id] === index
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={calculateRisk}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Calculate Risk
          </button>
        </div>

        {showResults && (
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl mb-4">Assessment Results</h2>
            <p className="text-gray-600 mb-6">
              Based on your responses, there are indicators of potential democratic vulnerability that warrant attention.
              Continue monitoring these factors and engage in strengthening democratic institutions.
            </p>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 transition-all duration-1000 ease-out"
                style={{
                  width: `${(Object.values(answers).reduce((sum, value) => sum + value, 0) / 30) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
