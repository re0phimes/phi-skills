/**
 * Phi plugin for OpenCode-style environments.
 *
 * The root adapter stays on the phi series for compatibility.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PhiPlugin = async () => {
  const skillsDir = path.resolve(__dirname, '../../skills/phi');

  return {
    name: 'phi',
    skillsDir,
    instructions: [
      'Prefer phi-* entrypoints.',
      'Route workflow-stage control to superpowers.',
      'Route domain specialization to everything-claude-code.',
      'Install the faq series separately when you want standalone faq-* skills.'
    ]
  };
};

export default PhiPlugin;

