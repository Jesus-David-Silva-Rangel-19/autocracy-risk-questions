
import React, { useState } from 'react';
import { ChevronDown, Shield, Flag, AlertCircle, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  details: string;
  options: string[];
  icon: JSX.Element;
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué tan polarizado está el discurso político en tu sociedad?",
    details: "Considera factores como las cámaras de eco en medios, la retórica partidista y la capacidad de diferentes grupos políticos para dialogar constructivamente.",
    options: ["Polarización mínima", "Desacuerdos moderados", "División significativa", "Polarización extrema"],
    icon: <Flag className="w-6 h-6 text-gray-600" />
  },
  {
    id: 2,
    text: "¿Cuál es el estado de las instituciones democráticas en tu país?",
    details: "Evalúa la independencia de los tribunales, la integridad electoral y la efectividad de los controles y equilibrios.",
    options: ["Fuerte y estable", "Funcionando pero estresada", "Debilitándose", "Severamente comprometida"],
    icon: <Shield className="w-6 h-6 text-gray-600" />
  },
  {
    id: 3,
    text: "¿Cómo calificarías la independencia de los medios y la libertad de prensa?",
    details: "Considera la concentración de la propiedad, la independencia editorial y la seguridad de los periodistas.",
    options: ["Totalmente independiente", "Mayormente libre", "Parcialmente restringida", "Fuertemente controlada"],
    icon: <AlertCircle className="w-6 h-6 text-gray-600" />
  },
  {
    id: 4,
    text: "¿Cuál es el nivel de desigualdad económica en tu sociedad?",
    details: "Evalúa la distribución de la riqueza, la movilidad social y el acceso a oportunidades.",
    options: ["Baja desigualdad", "Desigualdad moderada", "Alta desigualdad", "Desigualdad extrema"],
    icon: <Shield className="w-6 h-6 text-gray-600" />
  },
  {
    id: 5,
    text: "¿Qué tan fuerte es la sociedad civil en tu país?",
    details: "Considera las ONGs, organizaciones comunitarias y la participación ciudadana en la vida pública.",
    options: ["Muy fuerte", "Moderadamente activa", "Debilitándose", "Severamente restringida"],
    icon: <Heart className="w-6 h-6 text-gray-600" />
  },
  {
    id: 6,
    text: "¿Cuál es el estado de los derechos y protecciones de las minorías?",
    details: "Evalúa las protecciones legales, la inclusión social y el trato a los grupos minoritarios.",
    options: ["Fuertes protecciones", "Salvaguardas adecuadas", "Protección limitada", "Discriminación sistemática"],
    icon: <Shield className="w-6 h-6 text-gray-600" />
  },
  {
    id: 7,
    text: "¿Cómo caracterizarías el respeto del liderazgo político por las normas democráticas?",
    details: "Considera el cumplimiento de límites constitucionales, la transferencia pacífica del poder y el respeto a la oposición.",
    options: ["Fuerte respeto", "Cumplimiento general", "Violaciones ocasionales", "Violaciones frecuentes"],
    icon: <Flag className="w-6 h-6 text-gray-600" />
  },
  {
    id: 8,
    text: "¿Cuál es el nivel de confianza pública en los procesos democráticos?",
    details: "Evalúa la confianza en las elecciones, instituciones y toma de decisiones democrática.",
    options: ["Alta confianza", "Confianza moderada", "Baja confianza", "Muy baja confianza"],
    icon: <Heart className="w-6 h-6 text-gray-600" />
  },
  {
    id: 9,
    text: "¿Qué tan prevalente es la violencia política o su amenaza?",
    details: "Considera incidentes de intimidación política, violencia en protestas y actividades extremistas.",
    options: ["Rara/Ninguna", "Incidentes ocasionales", "Amenazas frecuentes", "Violencia sistemática"],
    icon: <AlertCircle className="w-6 h-6 text-gray-600" />
  },
  {
    id: 10,
    text: "¿Cuál es el estado de la educación sobre valores democráticos?",
    details: "Evalúa la educación cívica, habilidades de pensamiento crítico y comprensión de principios democráticos.",
    options: ["Educación sólida", "Cobertura adecuada", "Exposición limitada", "Ausente/Distorsionada"],
    icon: <Shield className="w-6 h-6 text-gray-600" />
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
      toast.error("Por favor responde todas las preguntas antes de continuar");
      return;
    }

    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const maxScore = 30;
    const riskPercentage = (totalScore / maxScore) * 100;
    setShowResults(true);
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Evaluación de Vulnerabilidad Democrática</h1>
          <p className="text-gray-600 text-lg">
            Evalúa la resiliencia de las instituciones democráticas a través de estos indicadores clave
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
                <div className="flex items-start gap-3">
                  {question.icon}
                  <h2 className="text-xl">{question.text}</h2>
                </div>
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
            Calcular Riesgo
          </button>
        </div>

        {showResults && (
          <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl mb-4">Resultados de la Evaluación</h2>
            <p className="text-gray-600 mb-6">
              Basado en tus respuestas, hay indicadores de vulnerabilidad democrática potencial que merecen atención.
              Continúa monitoreando estos factores y participa en el fortalecimiento de las instituciones democráticas.
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

        <footer className="mt-12 text-center text-gray-600 py-6">
          Desarrollado con ❤️ por Jesús David Silva Rangel 🚀
        </footer>
      </div>
    </div>
  );
};

export default Index;
