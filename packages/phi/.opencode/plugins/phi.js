/**
 * Phi series plugin for OpenCode-style environments.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PhiPlugin = async () => {
  const skillsDir = path.resolve(__dirname, '../../../../skills/phi');

  return {
    name: 'phi',
    skillsDir,
    instructions: [
      'Prefer phi-* entrypoints.',
      'Use this package for phi workflow orchestration and domain routing only.',
      'Install the faq package separately when standalone FAQ skills are needed.'
    ]
  };
};

export default PhiPlugin;
