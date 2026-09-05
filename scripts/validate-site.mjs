import fs from 'node:fs';
import vm from 'node:vm';

const required=['index.html','designs.html','packages.html','site-config.js','robots.txt','sitemap.xml'];
const fail=[];
for(const f of required) if(!fs.existsSync(f)) fail.push(`missing required file: ${f}`);
if(fail.length){console.error(fail.join('\n'));process.exit(1)}

const ctx={window:{}};
vm.runInNewContext(fs.readFileSync('site-config.js','utf8'),ctx,{filename:'site-config.js'});
const cfg=ctx.window.NAYA_CONFIG;
if(!cfg||typeof cfg!=='object') fail.push('window.NAYA_CONFIG is missing');
if(!cfg?.brand) fail.push('config.brand is empty');
if(!/^\d{10,15}$/.test(String(cfg?.whatsapp||''))) fail.push('config.whatsapp must be international digits only');
if(!cfg?.storageKey) fail.push('config.storageKey is missing');
if(!Array.isArray(cfg?.designFiles)) fail.push('config.designFiles must be an array');
const count=Number(cfg?.designCount||0);
if(!Number.isInteger(count)||count<1) fail.push('config.designCount must be a positive integer');
if(Array.isArray(cfg?.designFiles)&&count>cfg.designFiles.length) fail.push('designCount exceeds designFiles length');
for(const name of (cfg?.designFiles||[]).slice(0,count)) if(!fs.existsSync(`assets/designs/${name}`)) fail.push(`missing design image: assets/designs/${name}`);
if(cfg?.heroImage&&!fs.existsSync(cfg.heroImage)) fail.push(`missing hero image: ${cfg.heroImage}`);

for(const file of ['index.html','designs.html','packages.html']){
  const html=fs.readFileSync(file,'utf8');
  if(!html.includes('<meta name="viewport"')) fail.push(`${file}: viewport meta missing`);
  if(!html.includes('site-config.js')) fail.push(`${file}: site-config.js not loaded`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  const dup=ids.filter((id,i)=>ids.indexOf(id)!==i);
  if(dup.length) fail.push(`${file}: duplicate id(s): ${[...new Set(dup)].join(', ')}`);
  for(const m of html.matchAll(/href="([^"#][^"]*)"/g)){
    const href=m[1];
    if(/^(https?:|mailto:|tel:|javascript:)/.test(href)) continue;
    const clean=href.split('#')[0].split('?')[0];
    if(clean && !fs.existsSync(clean)) fail.push(`${file}: broken local link -> ${href}`);
  }
}

const index=fs.readFileSync('index.html','utf8');
if(!index.includes('google-site-verification')) fail.push('index.html: Google verification meta was removed');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
for(const page of ['https://danialbo13.github.io/naya-tattoo/','https://danialbo13.github.io/naya-tattoo/designs.html','https://danialbo13.github.io/naya-tattoo/packages.html']) if(!sitemap.includes(page)) fail.push(`sitemap missing ${page}`);

if(fail.length){console.error('NAYA validation failed:\n- '+fail.join('\n- '));process.exit(1)}
console.log(`NAYA validation passed: ${count} designs, required pages/config/assets verified.`);
