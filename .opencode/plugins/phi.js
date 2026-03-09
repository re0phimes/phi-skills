/**
 * Phi plugin for OpenCode-style environments.
 *
 * This adapter intentionally stays thin and delegates orchestration policy
 * to the shared repository docs and skill definitions.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PhiPlugin = async () => {
  const skillsDir = path.resolve(__dirname, '../../skills');

  return {
    name: 'phi',
    skillsDir,
    instructions: [
      'Prefer phi-* entrypoints.',
      'Route workflow-stage control to superpowers.',
      'Route domain specialization to everything-claude-code.',
      'Use local private skills for product-specific workflows.'
    ]
  };
};

export default PhiPlugin;

