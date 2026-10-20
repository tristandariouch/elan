import {jsPDF} from 'jspdf';
import {cvSections} from './cv-model.js';
const safe=s=>String(s||'').replace(/[ʼ‘’]/g,"'").replace(/[–—‑]/g,'-').replace(/•/g,'-').replace(/\u00a0/g,' ');
export function makeCVPDF(draft,template='essential'){const pdf=new jsPDF({unit:'mm',format:'a4'}),pro=template==='professional',accent=pro?[61,68,105]:[44,49,61],margin=19,bottom=278,width=172;let y=21;const size=pro?10:10.5,leading=pro?4.6:4.9;
 const page=()=>{pdf.addPage();y=21};const ensure=n=>{if(y+n>bottom)page()};
 const paragraph=(s,n=size,bold=false,color=[63,67,80],space=3)=>{if(!s?.trim())return;pdf.setFont('helvetica',bold?'bold':'normal');pdf.setFontSize(n);pdf.setTextColor(...color);for(const raw of safe(s).split('\n')){const lines=raw.trim()?pdf.splitTextToSize(raw,width):[''];for(const line of lines){ensure(leading);pdf.text(line,margin,y);y+=leading}}y+=space};
 if(pro){pdf.setFillColor(...accent);pdf.rect(margin,13,13,2,'F');y=26}
 paragraph(draft.name||'Votre nom',22,true,accent,5);paragraph(draft.title,12,false,accent,3);paragraph(draft.contact,9,false,[108,112,126],5);pdf.setDrawColor(221,223,231);pdf.line(margin,y-1,191,y-1);y+=6;
 for(const [key,title] of cvSections){if(!draft[key]?.trim())continue;pdf.setFont('helvetica','normal');pdf.setFontSize(size);const rows=safe(draft[key]).split('\n').reduce((n,line)=>n+(line.trim()?pdf.splitTextToSize(line,width).length:1),0),height=7+rows*leading+5;ensure(height<72?height:19);pdf.setFont('helvetica','bold');pdf.setFontSize(10);pdf.setTextColor(...accent);pdf.text(title.toUpperCase(),margin,y);y+=7;paragraph(draft[key],size,false,[63,67,80],5)}
 const count=pdf.getNumberOfPages();for(let i=1;i<=count;i++){pdf.setPage(i);pdf.setDrawColor(230,231,238);pdf.line(margin,285,191,285);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor(145,148,158);pdf.text(`${i} / ${count}`,191,290,{align:'right'})}pdf.setProperties({title:'CV - '+draft.name,subject:'Curriculum vitae',creator:'Élan'});return pdf;}
export function exportCVPDF(draft,template){makeCVPDF(draft,template).save('CV-'+(draft.name||'mon-profil').replace(/[^\p{L}\p{N} -]/gu,'').trim().replace(/ +/g,'-')+'.pdf')}

export function makeLetterPDF(text,{name='',contact='',title='',company=''}={}){
 const pdf=new jsPDF({unit:'mm',format:'a4'}),margin=23,width=164,bottom=272;let y=25;
 const write=(value,size=11,bold=false,gap=4)=>{pdf.setFont('helvetica',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor(47,49,59);for(const raw of safe(value).split('\n')){const lines=raw.trim()?pdf.splitTextToSize(raw,width):[''];for(const line of lines){const step=!raw.trim()?2.8:size<10?4.3:5;if(y+step>bottom){pdf.addPage();y=25}pdf.text(line,margin,y);y+=step}}y+=gap};
 if(name)write(name,18,true,3);if(contact)write(contact,9,false,5);
 pdf.setDrawColor(194,184,210);pdf.line(margin,y,187,y);y+=10;
 if(company)write(company,11,true,1);if(title)write('Candidature - '+title,12,true,7);
 write(text||'',11,false,0);
 const count=pdf.getNumberOfPages();for(let i=1;i<=count;i++){pdf.setPage(i);pdf.setFontSize(8);pdf.setTextColor(135,135,145);pdf.text(`${i} / ${count}`,187,287,{align:'right'})}
 pdf.setProperties({title:'Lettre de motivation - '+name,subject:title,creator:'Élan'});return pdf;
}
export function exportLetterPDF(text,details){makeLetterPDF(text,details).save('Lettre-'+(details.name||'candidature').replace(/[^\p{L}\p{N} -]/gu,'').trim().replace(/ +/g,'-')+'.pdf')}
