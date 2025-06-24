
import React from 'react';

export enum ContentType {
  INTRO = 'INTRO',
  CONCEPT_INFO = 'CONCEPT_INFO',
  MULTI_CHOICE_QUESTION = 'MULTI_CHOICE_QUESTION',
  OPEN_QUESTION = 'OPEN_QUESTION',
  PRACTICAL_SCENARIO = 'PRACTICAL_SCENARIO',
  REFLECTION_PROMPT = 'REFLECTION_PROMPT',
  FINAL_CHALLENGE = 'FINAL_CHALLENGE',
  CONCEPT_MAP_GUIDE = 'CONCEPT_MAP_GUIDE',
  INTERACTIVE_GAME = 'INTERACTIVE_GAME',
  PROMPT_STUDIO = 'PROMPT_STUDIO',
  INFOGRAPHIC = 'INFOGRAPHIC',
}

export interface BaseContent {
  id: string;
  type: ContentType;
  title?: string;
}

export interface IntroContent extends BaseContent {
  type: ContentType.INTRO;
  welcomeTitle: string;
  description: string;
  learningObjectives: string[];
}

export interface ConceptInfoContent extends BaseContent {
  type: ContentType.CONCEPT_INFO;
  text: string | (() => React.ReactNode);
}

export interface MultiChoiceQuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface MultiChoiceQuestionContent extends BaseContent {
  type: ContentType.MULTI_CHOICE_QUESTION;
  question: string;
  options: MultiChoiceQuestionOption[];
  explanation?: string;
}

export interface OpenQuestionContent extends BaseContent {
  type: ContentType.OPEN_QUESTION;
  question: string;
  suggestedAnswer?: string;
}

export interface PracticalScenarioContent extends BaseContent {
  type: ContentType.PRACTICAL_SCENARIO;
  scenarioDescription: string;
  task: string;
  userPromptLabel?: string;
  examplePrompt?: string;
  exampleAiResponse?: string | (() => React.ReactNode);
  aiModelUsed?: string;
}

export interface ReflectionPromptContent extends BaseContent {
  type: ContentType.REFLECTION_PROMPT;
  prompt: string;
  pointsToConsider?: string[];
}

export interface FinalChallengeContent extends BaseContent {
  type: ContentType.FINAL_CHALLENGE;
  challengeTitle: string;
  description: string;
  tasks: string[];
  evaluationCriteria?: string[];
}

export interface ConceptMapGuideContent extends BaseContent {
  type: ContentType.CONCEPT_MAP_GUIDE;
  instructions: string;
  exampleImageUrl?: string;
  keyElementsToInclude?: string[];
}

export interface InteractiveGameContent extends BaseContent {
  type: ContentType.INTERACTIVE_GAME;
  gameType: 'prompt-constructor' | 'technique-detector' | 'scenario-simulator' | 'optimization-lab';
  description: string;
  instructions?: string;
}

export interface PromptStudioContent extends BaseContent {
  type: ContentType.PROMPT_STUDIO;
  instructions: string;
  initialPrompt?: string;
  techniques: string[];
  scenarios: string[];
}

export interface InfographicContent extends BaseContent {
  type: ContentType.INFOGRAPHIC;
  imageUrl: string;
  altText: string;
  caption?: string;
  interactiveElements?: boolean;
}

export type ActivityContentItem =
  | IntroContent
  | ConceptInfoContent
  | MultiChoiceQuestionContent
  | OpenQuestionContent
  | PracticalScenarioContent
  | ReflectionPromptContent
  | FinalChallengeContent
  | ConceptMapGuideContent
  | InteractiveGameContent
  | PromptStudioContent
  | InfographicContent;

export interface Section {
  id: string;
  title: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
  contentBlocks: ActivityContentItem[];
}
