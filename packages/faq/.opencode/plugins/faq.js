/**
 * FAQ series plugin for OpenCode-style environments.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const FaqPlugin = async () => {
  const skillsDir = path.resolve(__dirname, '../../../../skills/faq');

  return {
    name: 'faq',
    skillsDir,
    instructions: [
      'Use this package for standalone faq-* skills.',
      'Prefer faq-generator for extraction, faq-grounded-review for grounded answers, and faq-judge for quality scoring.',
      'Install the phi package separately if you want phi-* orchestration entrypoints.'
    ]
  };
};

export default FaqPlugin;
