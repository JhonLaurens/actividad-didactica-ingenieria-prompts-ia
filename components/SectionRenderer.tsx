
import React from 'react';
import { Section, ActivityContentItem, ContentType } from '../types';

import IntroRenderer from './content_renderers/IntroRenderer';
import ConceptInfoRenderer from './content_renderers/ConceptInfoRenderer';
import MultiChoiceQuestionRenderer from './content_renderers/MultiChoiceQuestionRenderer';
import OpenQuestionRenderer from './content_renderers/OpenQuestionRenderer';
import PracticalScenarioRenderer from './content_renderers/PracticalScenarioRenderer';
import ReflectionPromptRenderer from './content_renderers/ReflectionPromptRenderer';
import FinalChallengeRenderer from './content_renderers/FinalChallengeRenderer';
import ConceptMapGuideRenderer from './content_renderers/ConceptMapGuideRenderer';
import InteractiveGameRenderer from './content_renderers/InteractiveGameRenderer';
import InfographicRenderer from './content_renderers/InfographicRenderer';

interface SectionPageProps {
  section: Section;
}

const SectionRenderer: React.FC<SectionPageProps> = ({ section }) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary-DEFAULT opacity-10 rounded-lg"></div>
        <div className="relative p-6">
          <h2 className="text-4xl font-extrabold text-primary-dark border-b-2 border-primary-light pb-2 mb-2">
            {section.title}
          </h2>
          <div className="flex items-center space-x-2 text-primary-DEFAULT">
            <section.icon className="h-6 w-6" />
            <span className="text-sm font-medium">
              {section.contentBlocks.length} actividades en esta sección
            </span>
          </div>
        </div>
      </div>
      
      {section.contentBlocks.map((block: ActivityContentItem) => {
        switch (block.type) {
          case ContentType.INTRO:
            return <IntroRenderer key={block.id} content={block} />;
          case ContentType.CONCEPT_INFO:
            return <ConceptInfoRenderer key={block.id} content={block} />;
          case ContentType.MULTI_CHOICE_QUESTION:
            return <MultiChoiceQuestionRenderer key={block.id} content={block} />;
          case ContentType.OPEN_QUESTION:
            return <OpenQuestionRenderer key={block.id} content={block} />;
          case ContentType.PRACTICAL_SCENARIO:
            return <PracticalScenarioRenderer key={block.id} content={block} />;
          case ContentType.REFLECTION_PROMPT:
            return <ReflectionPromptRenderer key={block.id} content={block} />;
          case ContentType.FINAL_CHALLENGE:
            return <FinalChallengeRenderer key={block.id} content={block} />;
          case ContentType.CONCEPT_MAP_GUIDE:
            return <ConceptMapGuideRenderer key={block.id} content={block} />;
          case ContentType.INTERACTIVE_GAME:
            return <InteractiveGameRenderer key={block.id} content={block} />;
          case ContentType.INFOGRAPHIC:
            return <InfographicRenderer key={block.id} content={block} />;
          default:
            console.warn("Unsupported content block type:", block);
            return null;
        }
      })}
    </div>
  );
};

export default SectionRenderer;
