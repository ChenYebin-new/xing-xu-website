import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const out = 'output/command-one-ui-2026-10-03';
const gitArgs = ['-c', `safe.directory=${root.replaceAll('\\', '/')}`];
function git(args, allowed = [0]) {
  const result = spawnSync('git', [...gitArgs, ...args], { cwd: root, encoding: 'utf8' });
  if (!allowed.includes(result.status)) throw new Error(result.stderr);
  return result.stdout.replaceAll('\r\n', '\n');
}

// Keep the new documentation away from the pre-existing, unpublished RFQ section.
let readme = fs.readFileSync('README.md', 'utf8').replaceAll('\r\n', '\n');
const start = readme.indexOf('## 展示与交互优化（2026-10-03）');
const end = readme.indexOf('## 全站代码审查（2026-09-30，本地）', start);
if (start < 0 || end < start) throw new Error('Expected UI documentation section is missing.');
const section = readme.slice(start, end).trim();
readme = (readme.slice(0, start) + readme.slice(end)).trimEnd() + '\n\n' + section + '\n';
fs.writeFileSync('README.md', readme);

const shared = [
  ['src/styles/global.css', 'output/design-refinement-2026-10-03/baseline/global.css'],
  ['DESIGN.md', 'output/design-refinement-2026-10-03/baseline/DESIGN.md'],
  ['README.md', `${out}/README.before-ui.md`],
];
function diff(before, after, target) {
  return git(['diff', '--no-index', '--no-color', '--', before, after], [0, 1])
    .replace(/^diff --git .*$/m, `diff --git a/${target} b/${target}`)
    .replace(/^--- .*$/m, `--- a/${target}`)
    .replace(/^\+\+\+ .*$/m, `+++ b/${target}`);
}
let own = '', prior = '';
for (const [target, baseline] of shared) {
  const headPath = `${out}/${path.basename(target)}.HEAD`;
  fs.writeFileSync(headPath, git(['show', `HEAD:${target}`]));
  own += diff(baseline, target, target);
  prior += diff(headPath, baseline, target);
}
fs.writeFileSync(`${out}/ui-shared.patch`, own);
fs.writeFileSync(`${out}/prior-shared.patch`, prior);
const direct = ['src/components/SiteHeader.astro', 'src/layouts/BaseLayout.astro', 'src/pages/index.astro', 'src/scripts/motion.ts', 'src/scripts/product-gallery.ts'];
fs.writeFileSync(`${out}/scope.json`, JSON.stringify([...shared.map(([target]) => target), ...direct], null, 2));
git(['archive', '--format=zip', `--output=${out}/base.zip`, 'HEAD']);
console.log(JSON.stringify({ scope: [...shared.map(([target]) => target), ...direct], sharedPatchBytes: own.length, preservedPatchBytes: prior.length }));
