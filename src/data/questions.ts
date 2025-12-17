export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "¿Según la NEM Cómo debe ser el proceso de desarrollo socioemocional?",
    correctAnswer: "Integral y continuo, ya que deben considerarse todos los aspectos que inciden en este, como el conocimiento de sí, el sentido de pertenencia, el desarrollo de la identidad, así como de las habilidades sociales.",
    options: [
      "Integral y continuo, ya que deben considerarse todos los aspectos que inciden en este, como el conocimiento de sí, el sentido de pertenencia, el desarrollo de la identidad, así como de las habilidades sociales.",
      "Fragmentado y periódico, enfocándose únicamente en las habilidades académicas.",
      "Individual y aislado, sin considerar el contexto social del estudiante.",
      "Rápido y superficial, abordando solo aspectos cognitivos."
    ]
  },
  {
    id: 2,
    question: "¿Cuáles son los aspectos que han de promoverse para lograr el desarrollo socioemocional?",
    correctAnswer: "El conocimiento de sí, El conocimiento de los estados afectivos, Cuidado de sí mismo y de las otras personas, Construcción de un proyecto de vida, Habilidades sociales y Educación integral en sexualidad.",
    options: [
      "El conocimiento de sí, El conocimiento de los estados afectivos, Cuidado de sí mismo y de las otras personas, Construcción de un proyecto de vida, Habilidades sociales y Educación integral en sexualidad.",
      "Únicamente el rendimiento académico y las calificaciones.",
      "Solo las habilidades deportivas y artísticas.",
      "La memorización de contenidos y la disciplina estricta."
    ]
  },
  {
    id: 3,
    question: "¿Cuál es el proceso por el cual se propicia que niñas, niños y adolescentes (NNA) desarrollen de manera gradual, las habilidades que les permitan comprender y regular sus emociones?",
    correctAnswer: "La Educación Socioemocional",
    options: [
      "La Educación Socioemocional",
      "La Educación Física",
      "La Educación Artística",
      "La Educación Cívica"
    ]
  },
  {
    id: 4,
    question: "¿De qué son capaces las personas que se desenvuelven en un ambiente libre de violencia, que son cuidadas, valoradas y respetadas?",
    correctAnswer: "Son capaces de construir habilidades de regulación emocional e interacción social, ya que pueden desarrollar el conocimiento de sí, del autoestima y valoración de las personas que les rodean, así como el aprecio por el ambiente y su cultura.",
    options: [
      "Son capaces de construir habilidades de regulación emocional e interacción social, ya que pueden desarrollar el conocimiento de sí, del autoestima y valoración de las personas que les rodean, así como el aprecio por el ambiente y su cultura.",
      "Son capaces únicamente de seguir instrucciones sin cuestionarlas.",
      "Son capaces de aislarse y evitar la interacción con otros.",
      "Son capaces de competir agresivamente con sus compañeros."
    ]
  },
  {
    id: 5,
    question: "Para garantizar la convivencia pacífica, el bienestar y construir ambientes libres de violencia en las escuelas ¿que es necesario que se priorice en estos entornos?",
    correctAnswer: "Un trato digno, cordial y respetuoso en las escuelas, así como favorecerlos en las familias y en las comunidades.",
    options: [
      "Un trato digno, cordial y respetuoso en las escuelas, así como favorecerlos en las familias y en las comunidades.",
      "La competencia académica por encima del bienestar emocional.",
      "La disciplina autoritaria y el castigo como método principal.",
      "El aislamiento de los estudiantes problemáticos."
    ]
  },
  {
    id: 6,
    question: "Garantizar Un trato digno, cordial y respetuoso en las escuelas ¿de qué manera impacta al bienestar de los NNA?",
    correctAnswer: "Contribuye al desarrollo de la personalidad, la confianza, el bienestar emocional, así como a eliminar expresiones de exclusión, discriminación y estereotipos.",
    options: [
      "Contribuye al desarrollo de la personalidad, la confianza, el bienestar emocional, así como a eliminar expresiones de exclusión, discriminación y estereotipos.",
      "No tiene ningún impacto significativo en el desarrollo de los estudiantes.",
      "Solo mejora las calificaciones académicas.",
      "Genera dependencia emocional en los estudiantes."
    ]
  }
];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
