/* Sayue Shop: shared data and helpers */
window.S=(function(){
var BRAND={name:'Sayue Shop',tagline:'A Sanctuary for Thought',author:'Sayue Verity',email:'sayueshop@proton.me',
  instagram:'https://www.instagram.com/sayue_verity',youtube:'https://youtube.com/@sayue_verity',live:'https://sayue.shop/'};
var RATE=83; /* sample rate: 1 USD = 83 INR */
var CATS=['Audiobooks','Poetry Books','Doctrine Books','Printables','Art & Posters','Bundles','Card Decks','Poetry Cards','Poetry Excerpts'];
var CAT={
 'Doctrine Books':{bg:'#554339',fg:'#FEFEF7',acc:'#C9AE8C',icon:'doc'},
 'Poetry Books':{bg:'#747F6E',fg:'#FEFEF7',acc:'#DAC49F',icon:'poe'},
 'Printables':{bg:'#4C220C',fg:'#FEFEF7',acc:'#C9AE8C',icon:'pri'},
 'Bundles':{bg:'#8C7B4F',fg:'#FEFEF7',acc:'#EBDBB9',icon:'bun'},
 'Audiobooks':{bg:'#41463F',fg:'#FEFEF7',acc:'#DAC49F',icon:'aud'},
 'Art & Posters':{bg:'#884041',fg:'#FEFEF7',acc:'#DAC49F',icon:'art'},
 'Card Decks':{bg:'#88947E',fg:'#41463F',acc:'#41463F',icon:'deck'},
 'Poetry Cards':{bg:'#DAC49F',fg:'#4B3A21',acc:'#884041',icon:'pcard'},
 'Poetry Excerpts':{bg:'#C6B48E',fg:'#4B3A21',acc:'#554339',icon:'exc'}
};
var ICONS={
 doc:'<rect x="18" y="62" width="64" height="13" rx="2"/><rect x="24" y="48" width="54" height="13" rx="2"/><rect x="20" y="34" width="60" height="13" rx="2"/><path d="M30 26h40M50 18v8"/>',
 poe:'<path d="M72 14C48 20 30 40 26 70c14-4 30-16 36-30 4-8 8-16 10-26z"/><path d="M26 70L18 88M40 58l16-4M44 46l14-4"/>',
 pri:'<path d="M28 14h32l14 14v58H28z"/><path d="M60 14v14h14M38 46h26M38 58h26M38 70h18"/>',
 bun:'<rect x="18" y="34" width="18" height="52" rx="2"/><rect x="40" y="24" width="18" height="62" rx="2"/><rect x="62" y="38" width="20" height="48" rx="2"/><path d="M14 60h72" stroke-dasharray="3 5"/>',
 aud:'<path d="M24 62V52a26 26 0 0152 0v10"/><rect x="18" y="58" width="13" height="24" rx="5"/><rect x="69" y="58" width="13" height="24" rx="5"/>',
 art:'<rect x="20" y="22" width="60" height="56" rx="2"/><path d="M26 70l18-22 12 14 8-8 12 16"/><circle cx="64" cy="38" r="5"/>',
 deck:'<rect x="22" y="30" width="40" height="56" rx="4" transform="rotate(-8 42 58)"/><rect x="38" y="20" width="40" height="56" rx="4"/><path d="M48 40h20M48 50h20"/>',
 pcard:'<rect x="18" y="28" width="64" height="46" rx="4"/><path d="M30 44h40M30 54h28M30 64h18"/>',
 exc:'<path d="M24 58c0-12 6-20 16-22M56 58c0-12 6-20 16-22"/><rect x="22" y="58" width="16" height="14" rx="2"/><rect x="54" y="58" width="16" height="14" rx="2"/>'
};
/* Titles, page counts for the first three are from the live shop. Prices, blurbs and the rest are sample content. */
var PRODUCTS=[
 {id:1,title:'Stewacracy',sub:'A System that lets life live',img:['5-2','6-1'],cat:'Doctrine Books',pages:'445 pages',fmt:'E-Book PDF',reg:24,sale:18,date:10,tags:['governance','systems','ecocentrism','framework'],
  desc:'A complete framework for governing shared life by stewardship rather than ownership. Across 445 pages the book sets out the principles, the institutions and the daily habits of a community in which power is held for a season and handed on. Written for readers who like to follow an argument all the way down.',
  sample:'"Power is not a possession. It is a lantern lent for a season, and it must be returned in better light than it was found."'},
 {id:2,title:'Candle In Cage',img:['3-2','4'],cat:'Poetry Books',pages:'111 pages',fmt:'E-Book PDF',reg:12,sale:9,date:9,tags:['poems','longing','night'],
  desc:'A collection of poems about holding a small flame inside narrow walls: what it costs to stay lit, and what the light still manages to do. Best read slowly, a few poems at a time.',
  sample:'"The cage was never the cruelty. The cruelty was the flame learning to apologise for its warmth."'},
 {id:3,title:'Stain Of My Soul',img:['1','2'],cat:'Poetry Books',pages:'102 pages',fmt:'E-Book PDF',reg:11,sale:11,date:8,tags:['poems','memory','confession'],
  desc:'Poems of ink, memory and the marks we cannot wash from ourselves, and the quiet decision to call those marks ours. Honest, intimate and unhurried.',
  sample:'"Some stains are only the shape of where we were held too long."'},
 {id:4,title:'A Year of Evening Pages',cat:'Printables',pages:'40 pages',fmt:'Printable',reg:8,sale:6,date:7,tags:['journal','planner','print'],
  desc:'A printable evening journal with prompts for twelve months: one gentle question, one line of verse and room to answer. Prints on A4 or Letter.',
  sample:'"Week one: what did you set down today that you were glad to stop carrying?"'},
 {id:5,title:'The Reader’s Retreat Bundle',cat:'Bundles',pages:'4 titles',fmt:'E-Book PDF',reg:42,sale:30,date:11,tags:['bundle','gift','save'],
  desc:'Four favourites gathered into one parcel, at a gentle discount: a doctrine book, two poetry collections and a printable journal.',
  sample:'"A shelf is a small country. This bundle is its first four citizens."'},
 {id:6,title:'Moth-Light Poetry Cards',cat:'Poetry Cards',pages:'24 cards',fmt:'Printable',reg:7,sale:5,date:5,tags:['cards','poems','print'],
  desc:'Twenty-four small poems set as printable cards, sized to slip into a book, a letter or a coat pocket.',
  sample:'"Even the moth knows: what we need is not the sun, only something near."'},
 {id:7,title:'Quill and Candle Poster Set',cat:'Art & Posters',pages:'6 posters',fmt:'Printable',reg:10,sale:10,date:3,tags:['art','poster','print'],
  desc:'Six line-art posters in warm, muted tones, printable at A3 or 11 by 17 inches. Quiet company for a reading corner.',
  sample:'"Print one. Pin it where the morning light finds it first."'},
 {id:8,title:'Mindful Card Deck',cat:'Card Decks',pages:'52 cards',fmt:'Printable',reg:9,sale:7,date:4,tags:['deck','questions','mindful'],
  desc:'Fifty-two reflective questions for solitary evenings or slow conversations, ready to print, cut and shuffle.',
  sample:'"What did you plant this year that you will not live to harvest?"'},
 {id:9,title:'Rooms Made of Rain',cat:'Audiobooks',pages:'5 h 20 min',fmt:'Audiobook',reg:14,sale:14,date:6,tags:['audio','poems','narrated'],
  desc:'A narrated collection of rain poems, recorded in a quiet room with the window open. Delivered as chaptered MP3 files.',
  sample:'"Listen: the roof is practising an old language, and the gutter answers in vowels."'},
 {id:10,title:'Evening Excerpts, Vol. 1',cat:'Poetry Excerpts',pages:'18 pages',fmt:'E-Book PDF',reg:4,sale:3,date:2,tags:['excerpts','short','poems'],
  desc:'A small pamphlet of single-page excerpts drawn from longer works: the quickest way into the writing.',
  sample:'"Begin anywhere. The page forgives its own first line."'}
];
var FAQ=[
 ['What does the shop offer?','Original books on philosophy, poetry, reflective writing and conceptual systems, plus printables, posters, card decks, poetry cards, excerpts and curated bundles.'],
 ['What format will I receive?','Digital PDF files unless stated otherwise. Audiobooks arrive as chaptered MP3 files and printables as print-ready PDFs.'],
 ['Will I receive a printed book?','No. This is a digital-only library. If a paperback exists, it is bought through the Amazon link on the book page.'],
 ['Is a Kindle edition available?','Some titles are on Amazon Kindle. Where one exists, its link sits on the book page.'],
 ['How do I access my book?','Download access is given right after payment, on the confirmation screen and in My Library under your account.'],
 ['Can I share the PDF?','No. Files are licensed for personal use only. Copying, redistributing, reselling or uploading them is not permitted.'],
 ['Do you offer refunds?','Digital products are delivered instantly, so orders are generally non-refundable. If you hit a technical problem, please tell us and we will help.'],
 ['How can I contact you?','Write to the email address in the footer. Replies usually arrive within two working days.']
];
var POLICY={
 refund:['Refund Policy','Placeholder text. Digital products are delivered immediately and are generally non-refundable. If a file is damaged or you were charged in error, contact us within 14 days. Replace this with the text from your live Refund Policy page.'],
 privacy:['Privacy Policy','Placeholder text. We collect only what is needed to deliver your files: your name and email address. We never sell personal information. Replace this with the text from your live Privacy Policy page.'],
 terms:['Terms and Conditions','Placeholder text. All works are licensed for personal, non-commercial reading. Copying, resale and redistribution are not permitted. Replace this with the text from your live Terms page.']
};

function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function byId(id){return PRODUCTS.filter(function(p){return p.id===id})[0]}
function wrapText(t,n){var w=t.split(' '),l=[],c='';w.forEach(function(x){if((c+' '+x).trim().length>n&&c){l.push(c);c=x}else c=(c+' '+x).trim()});if(c)l.push(c);return l}
function icon(name,size,color,x,y){var s=size/100;return '<g transform="translate('+x+' '+y+') scale('+s+')" fill="none" stroke="'+color+'" stroke-width="'+Math.min(3/s,4)+'" stroke-linecap="round" stroke-linejoin="round">'+ICONS[name]+'</g>'}
function cover(p,v){
  if(p.img)return '<img src="assets/img/'+p.img[v?1:0]+'.png" alt="'+(v?'Back cover of ':'Cover of ')+esc(p.title)+'" loading="lazy">';
  var c=CAT[p.cat],lines=wrapText(p.title,14),ty=190-(lines.length-1)*16;
  var s='<svg viewBox="0 0 300 400" role="img" aria-label="'+(v?'Back cover of ':'Cover of ')+esc(p.title)+'" preserveAspectRatio="xMidYMid slice"><rect width="300" height="400" fill="'+c.bg+'"/><rect x="16" y="16" width="268" height="368" fill="none" stroke="'+c.acc+'" stroke-width="1.5" opacity=".8"/>';
  if(!v){
    s+=icon(c.icon,84,c.acc,108,52);
    s+='<g fill="'+c.fg+'" font-family="Cormorant Garamond,Georgia,serif" text-anchor="middle">';
    lines.forEach(function(l,i){s+='<text x="150" y="'+(ty+i*32)+'" font-size="26" font-weight="600">'+esc(l)+'</text>'});
    s+='<path d="M110 '+(ty+lines.length*32-8)+'h80" stroke="'+c.acc+'" stroke-width="1.5"/><text x="150" y="348" font-size="12" letter-spacing="2" fill="'+c.acc+'">'+esc(p.cat.toUpperCase())+'</text></g>';
  }else{
    s+='<g fill="'+c.fg+'" font-family="Cormorant Garamond,Georgia,serif" text-anchor="middle" font-style="italic" font-size="15">';
    wrapText(p.sample.replace(/"/g,''),26).slice(0,5).forEach(function(l,i){s+='<text x="150" y="'+(120+i*26)+'">'+esc(l)+'</text>'});
    s+='</g>'+icon(c.icon,44,c.acc,128,300);
  }
  return s+'</svg>';
}

/* ===== Aesthetic flower background (palette colours only) ===== */
function flower(x,y,r,rot,petal,mid,n){
  n=n||8;var g='<g transform="translate('+x+' '+y+') rotate('+rot+')"><g class="sway">';
  for(var i=0;i<n;i++){g+='<ellipse cx="0" cy="'+(-r*0.62)+'" rx="'+(r*0.26)+'" ry="'+(r*0.62)+'" fill="'+petal+'" stroke="#8C7B4F" stroke-width="1.4" transform="rotate('+(i*360/n)+')"/>'}
  for(var j=0;j<n;j++){g+='<path d="M0 0V'+(-r*0.9)+'" stroke="#8C7B4F" stroke-width=".8" opacity=".55" transform="rotate('+(j*360/n)+')"/>'}
  return g+'<circle r="'+(r*0.2)+'" fill="'+mid+'" stroke="#4C220C" stroke-width="1.2"/><circle r="'+(r*0.07)+'" fill="#EBDBB9"/></g></g>';
}
function sprig(x,y,len,rot,leaf,stem){
  var g='<g transform="translate('+x+' '+y+') rotate('+rot+')"><g class="sway"><path d="M0 0C'+(len*0.12)+' '+(-len*0.35)+' '+(-len*0.1)+' '+(-len*0.7)+' 0 '+(-len)+'" fill="none" stroke="'+stem+'" stroke-width="2.4" stroke-linecap="round"/>';
  for(var i=1;i<=5;i++){var t=i/6,yy=-len*t,s=i%2?1:-1;g+='<ellipse cx="'+(s*len*0.09)+'" cy="'+yy+'" rx="'+(len*0.05)+'" ry="'+(len*0.12)+'" fill="'+leaf+'" stroke="'+stem+'" stroke-width="1.2" transform="rotate('+(s*52)+' 0 '+yy+')"/>'}
  return g+'<ellipse cx="0" cy="'+(-len)+'" rx="'+(len*0.04)+'" ry="'+(len*0.09)+'" fill="'+leaf+'" stroke="'+stem+'" stroke-width="1.2"/></g></g>';
}
function bloom(){
  var W='#DAC49F',K='#C6B48E',R='#884041',O='#8C7B4F',SG='#88947E',SD='#747F6E',F='#41463F',I='#FEFEF7';
  var s='<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">';
  s+=sprig(70,420,360,12,SG,SD)+sprig(150,900,420,-6,SG,SD)+sprig(1380,520,380,-14,SG,SD)+sprig(1290,900,340,8,SG,SD)+sprig(720,40,230,172,SG,SD);
  s+=flower(90,90,130,10,W,R,10)+flower(330,40,70,30,K,O,8)+flower(40,300,62,0,I,R,7);
  s+=flower(1350,110,120,-8,K,R,9)+flower(1180,50,66,18,W,O,8)+flower(1410,330,58,6,I,O,7);
  s+=flower(180,810,110,-14,W,O,9)+flower(380,870,60,12,I,R,7)+flower(60,640,72,4,K,R,8);
  s+=flower(1260,800,124,12,I,R,10)+flower(1090,870,62,-10,W,O,8)+flower(1390,670,70,0,W,R,8);
  s+=flower(740,860,54,0,K,R,7)+flower(560,30,44,0,W,O,7)+flower(900,60,40,20,I,R,6);
  return s+'</svg>';
}
return {BRAND:BRAND,RATE:RATE,CATS:CATS,CAT:CAT,ICONS:ICONS,PRODUCTS:PRODUCTS,FAQ:FAQ,POLICY:POLICY,esc:esc,byId:byId,cover:cover,icon:icon,bloom:bloom,flower:flower,sprig:sprig};
})();
