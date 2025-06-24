import React from 'react';
import { Section, ContentType, ActivityContentItem, ConceptInfoContent, IntroContent, MultiChoiceQuestionContent, OpenQuestionContent, PracticalScenarioContent, ReflectionPromptContent, FinalChallengeContent, ConceptMapGuideContent, InteractiveGameContent, InfographicContent } from './types';

// Heroicon-like SVG components (simplified)
export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const LightBulbIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311V21m-3.75-2.311V21m0 0a3 3 0 01-3-3V6.75A3 3 0 019 3.75h6a3 3 0 013 3v8.25a3 3 0 01-3 3z" />
  </svg>
);

export const BeakerIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0zM10.5 5.25V3.75m3 1.5V3.75m0 0a1.5 1.5 0 00-3 0V5.25" />
  </svg>
);

export const PuzzlePieceIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.083c-.563-.083-1.125-.167-1.688-.25a9.375 9.375 0 00-7.124 7.124c.083.563.167 1.125.25 1.688m10.126-7.581a5.625 5.625 0 00-7.581 10.125" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12.75V15s0 .75.75.75h1.5s.75 0 .75-.75v-2.25m0 0V9.75s0-.75-.75-.75h-1.5s-.75 0-.75.75v3zm-3.75 3.75h.008v.008h-.008v-.008zm0-7.5h.008v.008h-.008v-.008zm7.5 0h.008v.008h-.008v-.008zm0 7.5h.008v.008h-.008v-.008zm-3.75-3.75h.008v.008h-.008v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 7.5l.813 2.846a4.5 4.5 0 012.188 2.188L24 13.5l-2.846.813a4.5 4.5 0 01-2.188 2.188L18.25 19.5l-.813-2.846a4.5 4.5 0 01-2.188-2.188L12.5 13.5l2.846-.813a4.5 4.5 0 012.188-2.188L18.25 7.5z" />
  </svg>
);

export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const XCircleIcon = (props: React.SVGProps<SVGSVGElement>): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


const introContent: IntroContent[] = [
  {
    id: 'intro-1',
    type: ContentType.INTRO,
    welcomeTitle: '¡Bienvenido/a a la Actividad Didáctica de Ingeniería de Prompts e IA!',
    description: 'Esta actividad está diseñada para transformar tu comprensión de la Inteligencia Artificial Generativa y la Ingeniería de Prompts de una lectura pasiva a un aprendizaje activo y aplicado. A través de una serie de módulos, explorarás conceptos clave, practicarás con escenarios reales y reflexionarás sobre el impacto de estas tecnologías.',
    learningObjectives: [
      'Comprender los principios fundamentales de la ingeniería de prompts.',
      'Identificar y aplicar técnicas clave de prompt engineering (Zero-Shot, Few-Shot, Chain-of-Thought, etc.).',
      'Explorar aplicaciones prácticas de la IA en diversos ámbitos.',
      'Desarrollar la capacidad de elaborar prompts efectivos para resolver problemas específicos.',
      'Evaluar críticamente los resultados generados por la IA y considerar aspectos éticos.',
      'Consolidar el conocimiento mediante la autoevaluación y la creación de un mapa conceptual.',
    ],
  },
];

const comprehensionContent: ActivityContentItem[] = [
  {
    id: 'infographic-1',
    type: ContentType.INFOGRAPHIC,
    title: 'Anatomía de un Prompt Efectivo',
    imageUrl: 'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Anatomía+de+un+Prompt',
    altText: 'Infografía mostrando los componentes de un prompt efectivo',
    caption: 'Los elementos clave que componen un prompt efectivo para IA',
    interactiveElements: true
  } as InfographicContent,
  {
    id: 'concept-1',
    type: ContentType.CONCEPT_INFO,
    title: '¿Qué es la Ingeniería de Prompts?',
    text: 'La ingeniería de prompts es el proceso de diseñar y optimizar las entradas (prompts) que se proporcionan a los modelos de lenguaje grandes (LLMs) y otros modelos de IA generativa para obtener respuestas precisas, relevantes y útiles. Un buen prompt es crucial para desbloquear el potencial completo de estos modelos.',
  } as ConceptInfoContent,
  {
    id: 'concept-q1',
    type: ContentType.MULTI_CHOICE_QUESTION,
    title: 'Pregunta de Comprensión',
    question: '¿Cuál es el objetivo principal de la ingeniería de prompts?',
    options: [
      { text: 'Entrenar modelos de IA desde cero.', isCorrect: false },
      { text: 'Diseñar interfaces de usuario para aplicaciones de IA.', isCorrect: false },
      { text: 'Guiar a los modelos de IA para generar los resultados deseados.', isCorrect: true },
      { text: 'Analizar grandes conjuntos de datos.', isCorrect: false },
    ],
    explanation: 'La ingeniería de prompts se centra en cómo formular las preguntas o instrucciones para que la IA entienda y ejecute la tarea correctamente.'
  } as MultiChoiceQuestionContent,
  {
    id: 'concept-2',
    type: ContentType.CONCEPT_INFO,
    title: 'Técnicas Clave de Prompt Engineering',
    text: () => (
      <div>
        <p className="mb-2">Existen varias técnicas para mejorar la calidad de los prompts. Algunas de las más importantes incluyen:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Zero-Shot Prompting:</strong> Pedir al modelo que realice una tarea sin proporcionarle ejemplos previos. El modelo se basa únicamente en su entrenamiento general.</li>
          <li><strong>Few-Shot Prompting:</strong> Incluir algunos ejemplos (shots) de la tarea deseada dentro del prompt. Esto ayuda al modelo a entender mejor el formato y el tipo de respuesta esperada.</li>
          <li><strong>Chain-of-Thought (CoT) Prompting:</strong> Animar al modelo a "pensar en voz alta" o mostrar sus pasos de razonamiento antes de dar la respuesta final. Esto es especialmente útil para problemas complejos.</li>
          <li><strong>Expansión de Contexto:</strong> Proporcionar información de fondo detallada y relevante dentro del prompt para que el modelo tenga suficiente contexto para generar una respuesta informada.</li>
        </ul>
        <p className="mt-2">También es importante considerar la claridad, especificidad, el uso de personas (ej. "Actúa como un experto en X") y la iteración (probar y refinar prompts).</p>
      </div>
    ),
  } as ConceptInfoContent,
  {
    id: 'game-technique-detector',
    type: ContentType.INTERACTIVE_GAME,
    title: '🕵️ Detector de Técnicas',
    gameType: 'technique-detector',
    description: '¡Pon a prueba tu conocimiento! Identifica qué técnica de prompt engineering se utiliza en cada ejemplo.',
    instructions: 'Lee cada prompt cuidadosamente y selecciona la técnica que se está utilizando. Tienes 30 segundos por pregunta y 3 vidas.'
  } as InteractiveGameContent,
   {
    id: 'concept-q2',
    type: ContentType.OPEN_QUESTION,
    title: 'Pregunta Abierta',
    question: 'Describe brevemente una situación en la que usarías Few-Shot Prompting en lugar de Zero-Shot Prompting.',
    suggestedAnswer: 'Usaría Few-Shot Prompting cuando la tarea es novedosa o requiere un formato de salida muy específico que el modelo podría no inferir correctamente sin ejemplos. Por ejemplo, si quiero que la IA genere resúmenes de noticias con un formato de "Titular - Puntos Clave - Sentimiento", proporcionar algunos ejemplos ayudaría mucho más que una simple instrucción (Zero-Shot).'
  } as OpenQuestionContent,
];

const applicationContent: ActivityContentItem[] = [
  {
    id: 'game-prompt-constructor',
    type: ContentType.INTERACTIVE_GAME,
    title: '🎮 Constructor de Prompts',
    gameType: 'prompt-constructor',
    description: 'Aprende construyendo! Arrastra y suelta componentes para crear prompts efectivos.',
    instructions: 'Usa drag-and-drop para construir prompts efectivos. Cada componente tiene un valor en puntos según su importancia.'
  } as InteractiveGameContent,
  {
    id: 'app-1',
    type: ContentType.PRACTICAL_SCENARIO,
    title: 'Escenario 1: Generación de Código',
    scenarioDescription: 'Imagina que necesitas una función simple en Python para una tarea de procesamiento de datos.',
    task: 'Elabora un prompt para que una IA genere una función en Python que tome una lista de números y devuelva una nueva lista con solo los números pares.',
    userPromptLabel: 'Tu prompt para la IA:',
    examplePrompt: "Actúa como un programador Python experto.\nGenera una función en Python llamada `obtener_numeros_pares`.\nEsta función debe aceptar una lista de enteros como entrada.\nDebe devolver una nueva lista conteniendo únicamente los números pares de la lista de entrada.\nIncluye una breve docstring explicando lo que hace la función.",
    exampleAiResponse: () => (
      <pre className="bg-neutral-darker text-white p-3 rounded-md overflow-x-auto text-sm">
        <code>
{`def obtener_numeros_pares(lista_numeros):
  """
  Toma una lista de enteros y devuelve una nueva lista 
  conteniendo únicamente los números pares.
  """
  numeros_pares = []
  for numero in lista_numeros:
    if numero % 2 == 0:
      numeros_pares.append(numero)
  return numeros_pares

# Ejemplo de uso:
# mi_lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# pares = obtener_numeros_pares(mi_lista)
# print(pares)  # Output: [2, 4, 6, 8, 10]`}
        </code>
      </pre>
    ),
    aiModelUsed: 'gemini-2.5-flash-preview-04-17 (simulado)'
  },
  {
    id: 'app-2',
    type: ContentType.PRACTICAL_SCENARIO,
    title: 'Escenario 2: Redacción Creativa',
    scenarioDescription: 'Tu empresa lanza un nuevo producto ecológico y necesitas ideas para un eslogan publicitario.',
    task: 'Crea un prompt para generar 5 eslóganes cortos, pegadizos y que resalten el aspecto ecológico del producto (ej. una botella de agua reutilizable).',
    userPromptLabel: 'Tu prompt para la IA:',
    examplePrompt: "Actúa como un redactor publicitario creativo especializado en sostenibilidad.\nGenera 5 eslóganes publicitarios para una nueva botella de agua reutilizable hecha con materiales reciclados.\nLos eslóganes deben ser cortos (máximo 7 palabras), pegadizos y enfatizar su beneficio ecológico y su diseño moderno.\nFormato deseado: lista numerada de eslóganes.",
    exampleAiResponse: () => (
        <div className="bg-neutral-darker text-white p-3 rounded-md text-sm">
            <p>Aquí tienes 5 eslóganes:</p>
            <ol className="list-decimal list-inside mt-2">
                <li>Hidrátate bien, cuida el planeta también.</li>
                <li>Estilo que recicla, futuro que brilla.</li>
                <li>Tu sorbo sostenible, un cambio visible.</li>
                <li>Menos plástico, más vida. Elige consciente.</li>
                <li>Diseño eco-chic, impacto positivo clic.</li>
            </ol>
        </div>
    ),
    aiModelUsed: 'gemini-2.5-flash-preview-04-17 (simulado)'
  },
];

const reflectionContent: ReflectionPromptContent[] = [
  {
    id: 'reflect-1',
    type: ContentType.REFLECTION_PROMPT,
    title: 'Evaluando la Calidad de las Respuestas de la IA',
    prompt: 'Cuando recibes una respuesta de una IA, ¿qué criterios utilizas para determinar si es una "buena" respuesta? ¿Cómo varían estos criterios según la tarea (por ejemplo, generar código vs. escribir un poema)?',
    pointsToConsider: [
      'Precisión y veracidad de la información.',
      'Relevancia para el prompt original.',
      'Coherencia y fluidez del texto.',
      'Creatividad y originalidad (si aplica).',
      'Ausencia de sesgos o contenido problemático.',
      'Utilidad y aplicabilidad de la respuesta.',
    ]
  },
  {
    id: 'reflect-2',
    type: ContentType.REFLECTION_PROMPT,
    title: 'Consideraciones Éticas en la Ingeniería de Prompts',
    prompt: 'La ingeniería de prompts puede usarse para generar contenido diverso. ¿Qué responsabilidades éticas crees que tiene un ingeniero de prompts al diseñar interacciones con IA, especialmente en relación con la desinformación, el plagio o los sesgos?',
    pointsToConsider: [
      'Transparencia sobre el uso de IA.',
      'Verificación de la información generada.',
      'Diseño de prompts para mitigar sesgos.',
      'Evitar la generación de contenido dañino o engañoso.',
      'Respeto por la propiedad intelectual.',
    ]
  },
];

const selfAssessmentContent: FinalChallengeContent[] = [
  {
    id: 'eval-1',
    type: ContentType.FINAL_CHALLENGE,
    challengeTitle: 'Desafío Final: El Asistente de Proyectos',
    description: 'Imagina que estás construyendo un "Asistente de Proyectos" basado en IA. Tu objetivo es diseñar una serie de prompts que permitan al usuario obtener ayuda en diferentes etapas de un proyecto.',
    tasks: [
      'Diseña un prompt para ayudar a un usuario a definir los objetivos SMART de un nuevo proyecto.',
      'Crea un prompt que genere una lista de posibles riesgos para un proyecto de desarrollo de software, utilizando la técnica de "Chain-of-Thought" para que la IA explique cómo identifica esos riesgos.',
      'Elabora un prompt para redactar un correo electrónico de actualización de progreso del proyecto para los stakeholders, solicitando a la IA que adopte un tono profesional y conciso.',
      'Considera cómo podrías usar un prompt con `responseMimeType: "application/json"` para obtener una estructura de tareas del proyecto que luego tu aplicación pueda procesar.'
    ],
    evaluationCriteria: [
      'Claridad y especificidad de cada prompt.',
      'Uso adecuado de técnicas de prompt engineering (ej. personas, CoT, formato de salida).',
      'Anticipación de posibles malinterpretaciones por parte de la IA.',
      'Potencial de los prompts para generar respuestas útiles y accionables.',
    ]
  }
];

const conceptMapContent: ConceptMapGuideContent[] = [
  {
    id: 'map-1',
    type: ContentType.CONCEPT_MAP_GUIDE,
    title: 'Creando tu Mapa Conceptual',
    instructions: 'Ahora que has explorado varios aspectos de la ingeniería de prompts y la IA generativa, te animamos a crear un Mapa Conceptual o Mental. Esta herramienta visual te ayudará a consolidar tu aprendizaje y a "ver" las conexiones entre los diferentes conceptos y técnicas.',
    keyElementsToInclude: [
        'Ingeniería de Prompts (como nodo central)',
        'Modelos de Lenguaje Grandes (LLMs)',
        'Técnicas de Prompting (Zero-Shot, Few-Shot, CoT, etc.)',
        'Componentes de un Prompt Efectivo (Claridad, Contexto, Persona, Tarea, Formato)',
        'Aplicaciones de la IA Generativa (Código, Texto, Imágenes, etc.)',
        'Evaluación de Resultados de IA',
        'Ética en la IA y Prompts',
        'El Proceso Iterativo de Prompting',
        'Gemini API (y sus capacidades como ejemplo)',
    ],
    exampleImageUrl: 'https://picsum.photos/600/400?grayscale&blur=2' // Placeholder image
  }
];


export const activitySectionsData: Section[] = [
  { id: 'intro', title: 'Introducción', icon: SparklesIcon, contentBlocks: introContent },
  { id: 'comprehension', title: 'Comprensión de Conceptos', icon: LightBulbIcon, contentBlocks: comprehensionContent },
  { id: 'application', title: 'Aplicación Práctica', icon: BeakerIcon, contentBlocks: applicationContent },
  { id: 'reflection', title: 'Reflexión Crítica', icon: BookOpenIcon, contentBlocks: reflectionContent },
  { id: 'evaluation', title: 'Autoevaluación', icon: PuzzlePieceIcon, contentBlocks: selfAssessmentContent },
  { id: 'map', title: 'Mapa Conceptual', icon: CheckCircleIcon, contentBlocks: conceptMapContent },
];
