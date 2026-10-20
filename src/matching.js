const clean=s=>String(s||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
const criteria={
 'real-belfius-digital':[
 ['digital','Parcours digital ou marketing',25,'Avez-vous une formation ou une expérience professionnelle pertinente en digital ou marketing ?','digital',true],
 ['reporting','Suivi des performances et reporting',35,'Avez-vous déjà suivi des indicateurs et présenté des résultats de performance ?','reporting',true],
 ['analysis','Analyse et présentation des résultats',25,'Pouvez-vous donner un exemple où votre analyse a aidé une équipe à décider ?','analysis',true],
 ['nl','Français / néerlandais : atout',8,'Travaillez-vous avec aisance en français et en néerlandais ?','nl',false],
 ['qlik','Qlik Sense : atout',7,'Avez-vous déjà utilisé Qlik Sense ?','qlik',false]],
 'real-ulb-diversite':[
 ['master','Master pertinent',20,'Possédez-vous un master pertinent pour cette fonction ?','master',true],
 ['projects2','Deux ans de gestion de projets',25,'Avez-vous au moins deux ans d’expérience réelle en gestion ou suivi de projets ?','manual',true],
 ['theme2','Deux ans sur les thématiques demandées',30,'Avez-vous au moins deux ans d’expérience professionnelle, associative ou académique en égalité, diversité ou lutte contre les discriminations ?','manual',true],
 ['fr','Français C1 demandé',10,'Votre niveau de français permet-il une rédaction professionnelle autonome de niveau C1 ?','fr',true],
 ['en','Compréhension écrite anglais B2',10,'Comprenez-vous des documents professionnels en anglais au niveau B2 ?','en',true],
 ['tools','Outils de communication et organisation : atout',5,'Utilisez-vous des outils de bureautique et de création de supports ?','tools',false]],
 'real-axis-rh':[
 ['degree','Bachelor, master ou équivalent',15,'Disposez-vous du diplôme demandé ou d’une expérience équivalente ?','degree',true],
 ['projects2','Deux ans de gestion de projets',25,'Avez-vous au moins deux ans de gestion de projets ?','manual',true],
 ['nl','Très bonne maîtrise du néerlandais',20,'Pouvez-vous travailler de façon très autonome en néerlandais, à l’écrit et à l’oral ?','nl',true],
 ['en','Très bonne maîtrise de l’anglais',10,'Pouvez-vous travailler de façon très autonome en anglais, à l’écrit et à l’oral ?','enHigh',true],
 ['rh','Connaissances RH',20,'Avez-vous des connaissances concrètes en RH ou culture d’entreprise, au-delà de votre motivation ?','manual',true],
 ['freelance','Statut freelance',10,'Êtes-vous disposé·e et en mesure d’exercer ce poste en freelance ?','manual',true]],
 'real-alter-marketing':[
 ['marketing','Marketing et communication',30,'Avez-vous déjà mené des actions de marketing ou de communication ?','digital',true],
 ['sales','Vente et suivi administratif',25,'Avez-vous une expérience de la vente et du suivi administratif ou de la facturation ?','manual',true],
 ['ape','APE obligatoire',25,'Votre éligibilité APE a-t-elle été confirmée pour cet engagement ?','ape',true],
 ['fr','Très bon français',10,'Êtes-vous à l’aise en rédaction professionnelle en français ?','fr',true],
 ['tools','Outils numériques',10,'Maîtrisez-vous les outils de communication cités ou des équivalents ?','tools',false]],
 'real-vocatio-com':[
 ['com5','Cinq ans en communication',25,'Avez-vous au moins cinq ans d’expérience dans une fonction de communication ?','manual',true],
 ['degreecom','Diplôme en communication',15,'Possédez-vous le diplôme de communication demandé ou un accord d’équivalence de l’employeur ?','manual',true],
 ['nl','Rédaction autonome en néerlandais',25,'Pouvez-vous rédiger et réviser des contenus professionnels en néerlandais de manière autonome ?','nl',true],
 ['fr','Rédaction autonome en français',15,'Pouvez-vous rédiger et réviser des contenus professionnels en français de manière autonome ?','fr',true],
 ['digital','Communication numérique',10,'Avez-vous réalisé des contenus et campagnes numériques ?','digital',true],
 ['half','Mi-temps accepté',10,'Le mi-temps de 50 % vous convient-il ?','manual',true]],
 'real-cbai-communication':[
 ['digital','Communication et réseaux sociaux',35,'Avez-vous réalisé des actions de communication et des contenus pour les réseaux sociaux ?','digital',false],
 ['editorial','Organisation éditoriale',25,'Avez-vous organisé un calendrier de contenus ou de publications ?','manual',false],
 ['advocacy','Expérience de plaidoyer',25,'Avez-vous une expérience concrète de plaidoyer ou d’argumentation publique ?','manual',false],
 ['requirements','Exigences complètes vérifiées',15,'Avez-vous relu les conditions de l’annonce complète et confirmé que vous les remplissez ?','manual',true]]
};
function level(p,name){return p.languages.find(l=>clean(l.name)===name)?.level||''}
function language(p,name,min){const v=level(p,name);if(!v||v==='À préciser')return 'unknown';if(/maternelle/i.test(v))return 'yes';const ordered=['A1','A2','B1','B2','C1','C2'],i=ordered.indexOf(v);return i<0?'unknown':i>=ordered.indexOf(min)?'yes':'no'}
function infer(kind,p){const text=clean([p.experience,p.studies,p.tools,...p.skills].join(' ')),studies=clean(p.studies);if(kind==='fr')return language(p,'francais','C1');if(kind==='en')return language(p,'anglais','B2');if(kind==='enHigh')return language(p,'anglais','C1');if(kind==='nl')return language(p,'neerlandais','C1');if(kind==='ape')return ['yes','no'].includes(p.ape)?p.ape:'unknown';if(kind==='master')return /master/.test(studies)?'yes':'unknown';if(kind==='degree')return /master|bachel|bachelor/.test(studies)?'yes':'unknown';const patterns={digital:/campagnes? digital|marketing digital|paid search|google ads|communication digitale/,reporting:/reporting|analyse des performances|suivi des performances|presentation des resultats/,analysis:/analyse|analy[sz]|recommandation/,tools:/excel|word|powerpoint|canva|wrike/,qlik:/qlik/};return patterns[kind]?.test(text)?'yes':'unknown'}
export function matchOffer(state,job){const list=criteria[job.id];if(!list)return {supported:false,score:null,rows:[],questions:[],coverage:0};const answers=job.matchAnswers||{},rows=list.map(([id,label,weight,question,kind,required])=>{const answer=answers[id],status=['yes','no','unknown'].includes(answer)?answer:infer(kind,state.profile);return {id,label,weight,question,kind,required,status,origin:answer!==undefined?'Votre réponse':'Profil déclaré'}}),yes=rows.filter(r=>r.status==='yes').reduce((n,r)=>n+r.weight,0),unknown=rows.filter(r=>r.status==='unknown').reduce((n,r)=>n+r.weight,0),coverage=100-unknown;return {supported:true,rows,score:coverage>=30?Math.round(yes+unknown*.5):null,minimum:yes,maximum:yes+unknown,coverage,blocked:rows.filter(r=>r.required&&r.status==='no'),questions:rows.filter(r=>r.status==='unknown').sort((a,b)=>Number(b.required)-Number(a.required)||b.weight-a.weight).slice(0,3)}}
