/* Sayue Shop: shared behaviour for every page */
(function(){
'use strict';
var D=window.S,B=D.BRAND,esc=D.esc,byId=D.byId,cover=D.cover,CATS=D.CATS,CAT=D.CAT,ICONS=D.ICONS,PRODUCTS=D.PRODUCTS;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var PAGE=document.body.getAttribute('data-page')||'home';
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var cart=load('sy_cart',[]).filter(function(i){return byId(i.id)});
var cur=load('sy_cur','USD')==='INR'?'INR':'USD';
var user=load('sy_user',null),orders=load('sy_orders',[]),purchased=load('sy_purchased',[2,4]);
var coupon=null;
function money(usd){return cur==='USD'?'$'+usd.toFixed(2):'₹'+Math.round(usd*D.RATE).toLocaleString('en-IN')}
function px(usd){return '<span class="px" data-usd="'+usd+'">'+money(usd)+'</span>'}
function priceHtml(p){return '<div class="price">'+(p.sale<p.reg?'<s>'+px(p.reg)+'</s>':'')+'<strong>'+px(p.sale)+'</strong></div>'}
var X='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16"/></svg>';
function toast(m){var t=$('#toast');t.innerHTML='<span class="chalk">'+esc(m)+'</span>';t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show')},2400)}
function stars(){var s='<div class="stars" role="img" aria-label="No ratings yet">';for(var i=0;i<5;i++)s+='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" stroke-linejoin="round"/></svg>';return s+'</div>'}
function cardHTML(p){
  var href='product.html?id='+p.id;
  return '<article class="card lift reveal"><a class="cover" href="'+href+'" aria-label="View details for '+esc(p.title)+'">'+cover(p,0)+'<span class="cat-chip">'+esc(p.cat)+'</span>'+(p.sale<p.reg?'<span class="sale-badge">Sale</span>':'')+'</a>'+
  '<div class="card-body"><h3><a href="'+href+'">'+esc(p.title)+'</a></h3><p class="by">by '+esc(B.author)+'</p>'+
  '<div class="meta"><span>'+esc(p.pages)+'</span><span class="dot" aria-hidden="true">&#10048;</span><span class="fmt">'+esc(p.fmt)+'</span></div>'+
  '<div class="card-foot">'+priceHtml(p)+'<button class="btn sm" data-add="'+p.id+'" aria-label="Add '+esc(p.title)+' to cart">Add to cart</button></div></div></article>';
}

/* ===== Chrome: bloom, header, footer, overlays ===== */
var nav=function(href,label,key){return '<a class="nav-link chalk" href="'+href+'"'+(PAGE===key?' aria-current="page"':'')+'>'+label+'</a>'};
var CNT={};PRODUCTS.forEach(function(p){CNT[p.cat]=(CNT[p.cat]||0)+1});
var FILTERS='<filter id="chalk" x="-8%" y="-20%" width="116%" height="140%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="w"/><feDisplacementMap in="SourceGraphic" in2="w" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="9" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.8" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter>'+
'<filter id="chalkLogo" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.996  0 0 0 0 0.996  0 0 0 0 0.969  1 1 1 0 -1.05" result="a"/><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="w"/><feDisplacementMap in="a" in2="w" scale="5" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="7" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.75" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter>';
var FILTERS2='<filter id="cutout" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1.2756 -4.2912 -0.4332 0 5.7"/></filter>';
var HEADER=
'<a class="skip" href="#main">Skip to content</a>'+
'<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>'+FILTERS+FILTERS2+'</defs></svg>'+
'<header class="site-header" id="siteHeader"><div class="board"><span class="string l" aria-hidden="true"></span><span class="string r" aria-hidden="true"></span>'+
'<div class="hdr">'+
'<button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-haspopup="dialog"><svg viewBox="0 0 24 24"><path d="M4 7c5-1 11 1 16 0M4 12c5 1 11-1 16 0M4 17c5-1 11 1 16 0"/></svg></button>'+
'<a class="brand" href="index.html" aria-label="'+esc(B.name)+' home"><img class="chalk-logo" src="assets/img/Sayue-Shop-logo.png" alt="" width="80" height="80">'+
'<span class="bt"><span class="brand-name chalk">'+esc(B.name)+'</span><span class="tagline chalk">'+esc(B.tagline)+'</span></span></a>'+
'<nav class="nav" aria-label="Main">'+nav('index.html','Home','home')+
'<div class="dd" id="dd"><button class="nav-link chalk" id="shopBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddMenu"'+(PAGE==='shop'||PAGE==='product'?' aria-current="page"':'')+'>Shop <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg></button>'+
'<div class="dd-menu" id="ddMenu"><p class="dd-title chalk">Today&rsquo;s shelves</p><ul><li><a href="shop.html"><span>All titles</span><i class="lead"></i><em>'+PRODUCTS.length+'</em></a></li>'+CATS.map(function(c){return '<li><a href="shop.html?cat='+encodeURIComponent(c)+'"><span>'+esc(c)+'</span><i class="lead"></i><em>'+(CNT[c]||0)+'</em></a></li>'}).join('')+'</ul></div></div>'+
nav('about.html','About','about')+nav('faq.html','FAQ','faq')+'</nav>'+
'<div class="hdr-icons"><a class="icon-btn chalk" href="shop.html?focus=1" aria-label="Search the library"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg></a>'+
'<a class="icon-btn chalk" href="account.html" aria-label="Account"><svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20c1.2-4 4-5.5 7.5-5.5s6.3 1.5 7.5 5.5"/></svg></a>'+
'<button class="icon-btn chalk" id="cartBtn" aria-label="Open cart, 0 items" aria-haspopup="dialog"><svg viewBox="0 0 24 24"><path d="M5.5 8.5h13l-1.1 11.6H6.6z"/><path d="M9 8.5V7a3 3 0 016 0v1.5"/><path d="M9.6 13c1.4 1.2 3.4 1.2 4.8 0"/></svg><span class="badge" id="cartCount">0</span></button></div>'+
'</div></div></header>'+
'<div class="notice" role="note"><span aria-hidden="true">&#10048;</span> '+esc(B.name)+' is a digital only library. All books and creative works are available as digital editions. <span aria-hidden="true">&#10048;</span></div>';
var FOOTER=
'<footer><div class="foot-art" aria-hidden="true"></div><div class="wrap"><div class="foot-row"><a class="foot-brand" href="index.html"><img class="logo" src="assets/img/Sayue-Shop-logo.png" alt="" width="44" height="44"><span><strong>'+esc(B.name)+'</strong><em>'+esc(B.tagline)+'</em></span></a>'+
'<nav class="foot-links" aria-label="Footer"><a href="shop.html">Shop</a><a href="about.html">About</a><a href="faq.html">FAQ</a><a href="account.html">Account</a><a href="policy.html?p=refund">Refunds</a><a href="policy.html?p=privacy">Privacy</a><a href="policy.html?p=terms">Terms</a></nav>'+
'<div class="soc"><a href="'+B.instagram+'" aria-label="Instagram" rel="noopener"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6"/></svg></a><a href="'+B.youtube+'" aria-label="YouTube" rel="noopener"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10.5 9.5v5l4-2.5z"/></svg></a><a href="mailto:'+B.email+'" aria-label="Email"><svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg></a></div></div>'+
'<p class="foot-bar">&copy; '+new Date().getFullYear()+' '+esc(B.name)+'. Digital editions only.</p></div></footer>'+
'<div class="cur" role="group" aria-label="Currency"><button data-cur="INR" aria-pressed="false" aria-label="Rupees">₹</button><button data-cur="USD" aria-pressed="true" aria-label="US dollars">$</button></div>'+
'<button class="totop" id="toTop" aria-label="Scroll to top"><svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg></button><div class="toast" id="toast" role="status" aria-live="polite"></div>'+
'<div class="overlay left" id="ovMenu"><div class="panel" role="dialog" aria-modal="true" aria-label="Menu"><button class="close" data-close aria-label="Close menu">'+X+'</button><ul class="mnav"><li><a href="index.html">Home</a></li><li><a href="shop.html">Shop</a></li>'+CATS.map(function(c){return '<li class="sub"><a href="shop.html?cat='+encodeURIComponent(c)+'">'+esc(c)+'</a></li>'}).join('')+'<li><a href="about.html">About</a></li><li><a href="faq.html">FAQ</a></li><li><a href="account.html">Account</a></li></ul></div></div>'+
'<div class="overlay drawer" id="ovCart"><div class="panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle"><button class="close" data-close aria-label="Close cart">'+X+'</button><h2 id="cartTitle">Your cart</h2><div id="cartBody" style="display:flex;flex-direction:column;flex:1;min-height:0"></div></div></div>';
document.body.insertAdjacentHTML('afterbegin','<div class="bloom" aria-hidden="true">'+D.bloom()+'</div>'+HEADER);
document.body.insertAdjacentHTML('beforeend',FOOTER);
(function(){var W='#DAC49F',K='#C6B48E',R='#884041',SG='#88947E',SD='#747F6E',I='#FEFEF7';
 var g='<svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" focusable="false">'+D.sprig(40,260,200,14,SG,SD)+D.sprig(1400,260,210,-12,SG,SD)+D.flower(110,70,64,8,W,R,9)+D.flower(250,150,38,20,K,R,8)+D.flower(1330,60,60,-10,K,R,9)+D.flower(1190,150,36,12,I,R,7)+'</svg>';
 var n=document.querySelector('.foot-art');if(n)n.innerHTML=g})();
document.title=document.title.replace(/^/,'')+' | '+B.name;

/* ===== Overlay manager with focus trap ===== */
var stack=[],lastFocus=[];
function openO(el){if(stack.indexOf(el)>-1)return;lastFocus.push(document.activeElement);stack.push(el);el.classList.add('open');document.body.style.overflow='hidden';setTimeout(function(){var f=$('.close',el);if(f)f.focus()},60)}
function closeO(el){var i=stack.indexOf(el);if(i<0)return;stack.splice(i,1);el.classList.remove('open');var f=lastFocus.splice(i,1)[0];if(!stack.length)document.body.style.overflow='';if(f&&f.focus)setTimeout(function(){f.focus()},40)}
function focusables(el){return $$('a[href],button:not([disabled]),input:not([disabled]),select,[tabindex]:not([tabindex="-1"])',el).filter(function(n){return n.offsetParent!==null})}
document.addEventListener('keydown',function(e){
  var top=stack[stack.length-1];if(!top)return;
  if(e.key==='Escape'){e.preventDefault();closeO(top);return}
  if(e.key==='Tab'){var f=focusables(top);if(!f.length)return;var a=f[0],b=f[f.length-1];
    if(!top.contains(document.activeElement)){e.preventDefault();a.focus()}
    else if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus()}
    else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus()}}
});
$$('.overlay').forEach(function(o){o.addEventListener('mousedown',function(e){if(e.target===o)closeO(o)});$$('[data-close]',o).forEach(function(b){b.addEventListener('click',function(){closeO(o)})})});
$('#menuBtn').addEventListener('click',function(){openO($('#ovMenu'))});
$('#cartBtn').addEventListener('click',function(){openO($('#ovCart'))});

/* dropdown */
var dd=$('#dd'),shopBtn=$('#shopBtn');
function setDD(o){dd.classList.toggle('open',o);shopBtn.setAttribute('aria-expanded',o)}
shopBtn.addEventListener('click',function(){setDD(!dd.classList.contains('open'))});
dd.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches)setDD(true)});
dd.addEventListener('mouseleave',function(){if(matchMedia('(hover:hover)').matches)setDD(false)});
document.addEventListener('click',function(e){if(!dd.contains(e.target))setDD(false)});
dd.addEventListener('keydown',function(e){if(e.key==='Escape'&&dd.classList.contains('open')){setDD(false);shopBtn.focus()}});

/* ===== Cart ===== */
function count(){return cart.reduce(function(a,i){return a+i.qty},0)}
function subtotal(){return cart.reduce(function(a,i){return a+byId(i.id).sale*i.qty},0)}
function addToCart(id,q,silent){
  var it=cart.filter(function(i){return i.id===id})[0];
  if(it)it.qty=Math.min(20,it.qty+q);else cart.push({id:id,qty:q});
  save('sy_cart',cart);updateCart();
  var b=$('#cartCount');b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse');var cb=$('#cartBtn');cb.classList.remove('swell');void cb.offsetWidth;cb.classList.add('swell');
  if(!silent)toast('Added to your cart');
}
function updateCart(){var n=count();$('#cartCount').textContent=n;$('#cartCount').setAttribute('data-n',n);$('#cartBtn').setAttribute('aria-label','Open cart, '+n+' item'+(n===1?'':'s'));renderCart();if(PAGE==='checkout'&&window.__renderCheckout)window.__renderCheckout()}
function renderCart(){
  var b=$('#cartBody');
  if(!cart.length){b.innerHTML='<p class="cart-empty">Your cart is currently empty.</p><a class="btn ghost" href="shop.html">Continue browsing</a>';return}
  b.innerHTML='<ul class="cart-items">'+cart.map(function(i){var p=byId(i.id);
    return '<li class="ci"><div class="th">'+cover(p,0)+'</div><div><h4>'+esc(p.title)+'</h4><span class="meta">'+esc(p.fmt)+' &middot; '+px(p.sale)+'</span><div class="stepper" role="group" aria-label="Quantity for '+esc(p.title)+'"><button data-cq="'+p.id+'" data-d="-1" aria-label="Decrease">&minus;</button><span>'+i.qty+'</span><button data-cq="'+p.id+'" data-d="1" aria-label="Increase">+</button></div></div><button class="rm" data-rm="'+p.id+'" aria-label="Remove '+esc(p.title)+'">Remove</button></li>'}).join('')+'</ul>'+
    '<div class="totals"><div class="tr big"><span>Subtotal</span>'+px(subtotal())+'</div></div><a class="btn" href="checkout.html" style="margin-top:16px;width:100%">Continue to checkout</a>';
}
$('#cartBody').addEventListener('click',function(e){
  var q=e.target.closest('[data-cq]'),r=e.target.closest('[data-rm]');
  if(q){var it=cart.filter(function(i){return i.id===+q.getAttribute('data-cq')})[0];it.qty+=+q.getAttribute('data-d');if(it.qty<1)cart=cart.filter(function(i){return i!==it});save('sy_cart',cart);updateCart()}
  if(r){cart=cart.filter(function(i){return i.id!==+r.getAttribute('data-rm')});save('sy_cart',cart);updateCart()}
});
document.addEventListener('click',function(e){var a=e.target.closest('[data-add]');if(a)addToCart(+a.getAttribute('data-add'),1)});

/* ===== Currency ===== */
function applyCur(animate){
  $$('[data-cur]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-cur')===cur)});
  function swap(){$$('.px').forEach(function(n){n.textContent=money(+n.getAttribute('data-usd'))})}
  if(!animate){swap();return}
  document.body.classList.add('swap');setTimeout(function(){swap();document.body.classList.remove('swap')},230);
}
$$('[data-cur]').forEach(function(b){b.addEventListener('click',function(){var c=b.getAttribute('data-cur');if(c===cur)return;cur=c;save('sy_cur',cur);applyCur(true)})});

/* ===== Scroll ===== */
var hdr=$('#siteHeader'),tt=$('#toTop');
function onScroll(){hdr.classList.toggle('small',window.scrollY>60);tt.classList.toggle('show',window.scrollY>600)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target;io.unobserve(el);el.classList.add('in');setTimeout(function(){el.style.transitionDelay='0ms'},1400)})},{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null;
function observe(){$$('.reveal:not([data-seen])').forEach(function(el){el.setAttribute('data-seen','1');var sibs=el.parentElement?Array.prototype.filter.call(el.parentElement.children,function(c){return c.classList.contains('reveal')}):[el];el.style.transitionDelay=(Math.max(0,sibs.indexOf(el))%6*60)+'ms';if(io)io.observe(el);else el.classList.add('in')})}

/* ===== Pages ===== */
var qs=new URLSearchParams(location.search);
function tilesHTML(){
  var M=[['Doctrine Books','1-10'],['Poetry Books','2-11'],['Printables','3-2-2'],['Bundles','4-7']];
  return M.map(function(m){return '<a class="tile-img lift reveal" href="shop.html?cat='+encodeURIComponent(m[0])+'" aria-label="Browse '+esc(m[0])+'"><img src="assets/img/'+m[1]+'.png" alt="'+esc(m[0])+' by '+esc(B.name)+'" loading="lazy"></a>'}).join('');
}
function smallTilesHTML(){
  var list=['Audiobooks','Art & Posters','Card Decks','Poetry Cards','Poetry Excerpts'],h=[214,258,196,240,208];
  return '<p class="shelf-label label">More shelves</p><div class="shelf" role="list">'+list.map(function(c,i){var k=CAT[c];return '<a role="listitem" class="spine reveal" style="--h:'+h[i]+'px;--bg:'+k.bg+';--fg:'+k.fg+';--ac:'+k.acc+'" href="shop.html?cat='+encodeURIComponent(c)+'" aria-label="Browse '+esc(c)+'"><span>'+esc(c)+'</span></a>'}).join('')+'</div>';
}

if(PAGE==='home'){
  $('#tiles').innerHTML=tilesHTML();$('#tilesSm').innerHTML=smallTilesHTML();
  $('#featured').innerHTML=PRODUCTS.filter(function(p){return p.id<=3||p.id===5}).map(cardHTML).join('');
}

if(PAGE==='shop'){
  var state={cat:CATS.indexOf(qs.get('cat'))>-1?qs.get('cat'):'All',q:'',sort:'new'};
  var renderChips=function(){$('#chips').innerHTML=['All'].concat(CATS).map(function(c){return '<button class="chip" data-chip="'+esc(c)+'" aria-pressed="'+(state.cat===c)+'">'+esc(c)+'</button>'}).join('')};
  var renderGrid=function(){
    var l=PRODUCTS.filter(function(p){return (state.cat==='All'||p.cat===state.cat)&&(!state.q||(p.title+' '+(p.sub||'')+' '+p.cat+' '+p.tags.join(' ')+' '+p.desc).toLowerCase().indexOf(state.q)>-1)});
    l.sort(function(a,b){return state.sort==='lo'?a.sale-b.sale:state.sort==='hi'?b.sale-a.sale:b.date-a.date});
    $('#grid').innerHTML=l.length?l.map(cardHTML).join(''):'<p class="empty">Nothing on this shelf matches yet. New titles are being set in type, so please check back soon.</p>';
    $('#resultCount').textContent=l.length+' title'+(l.length===1?'':'s')+(state.cat==='All'?'':' in '+state.cat);
    observe();
  };
  $('#chips').addEventListener('click',function(e){var b=e.target.closest('[data-chip]');if(!b)return;state.cat=b.getAttribute('data-chip');renderChips();renderGrid()});
  $('#q').addEventListener('input',function(e){state.q=e.target.value.trim().toLowerCase();renderGrid()});
  $('#sort').addEventListener('change',function(e){state.sort=e.target.value;renderGrid()});
  renderChips();renderGrid();
  if(qs.get('focus'))setTimeout(function(){$('#q').focus()},300);
}

if(PAGE==='product'){
  var p=byId(+qs.get('id'))||PRODUCTS[0],qty=1;
  document.title=p.title;
  var rel=PRODUCTS.filter(function(x){return x.id!==p.id&&x.cat===p.cat});
  PRODUCTS.forEach(function(x){if(x.id!==p.id&&rel.length<4&&rel.indexOf(x)<0)rel.push(x)});rel=rel.slice(0,4);
  $('#pdRoot').innerHTML=
  '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <a href="shop.html?cat='+encodeURIComponent(p.cat)+'">'+esc(p.cat)+'</a></nav>'+
  '<div class="pd"><div><div class="gal-main" id="galMain">'+cover(p,0)+'</div><div class="thumbs" role="group" aria-label="Gallery"><button data-g="0" aria-pressed="true" aria-label="Show front cover">'+cover(p,0)+'</button><button data-g="1" aria-pressed="false" aria-label="Show back cover">'+cover(p,1)+'</button></div></div>'+
  '<div><span class="label">'+esc(p.cat)+'</span><h1 id="pdTitle">'+esc(p.title)+'</h1>'+(p.sub?'<p class="muted" style="font-style:italic;font-size:19px">'+esc(p.sub)+'</p>':'')+
  '<p class="meta" style="margin:8px 0"><span>'+esc(p.pages)+'</span><span class="fmt">'+esc(p.fmt)+'</span>'+(p.sale<p.reg?'<span class="sale-badge" style="position:static">Sale</span>':'')+'</p>'+priceHtml(p)+
  '<div class="row"><div class="stepper" role="group" aria-label="Quantity"><button data-q="-1" aria-label="Decrease quantity">&minus;</button><span id="pdQty" aria-live="polite">1</span><button data-q="1" aria-label="Increase quantity">+</button></div><button class="btn" id="pdAdd">Add to cart</button><button class="btn ghost" id="pdBuy">Buy now</button></div>'+
  '<button class="linkish" id="pdSample" aria-expanded="false">Read a sample</button><div class="sample" id="sampleBox" hidden>'+esc(p.sample)+'</div>'+
  '<div class="ext row"><a class="btn ghost sm" href="#">Paperback on Amazon</a><a class="btn ghost sm" href="#">Kindle edition</a></div>'+
  '<div class="tags" aria-label="Tags">'+p.tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div><p class="note">AI tools assisted with writing and language.</p></div></div>'+
  '<div class="tabs" role="tablist" aria-label="Product information"><button class="tab" role="tab" id="t1" aria-selected="true" aria-controls="p1">Description</button><button class="tab" role="tab" id="t2" aria-selected="false" aria-controls="p2" tabindex="-1">Reviews</button></div>'+
  '<div class="tabpanel" role="tabpanel" id="p1" aria-labelledby="t1"><p>'+esc(p.desc)+'</p></div>'+
  '<div class="tabpanel" role="tabpanel" id="p2" aria-labelledby="t2" hidden>'+stars()+'<p style="margin-top:8px"><em>No reviews yet.</em></p><p class="note">Only customers who bought this title can leave a review.</p></div>'+
  '<div class="related"><h2>You may also like</h2><div class="grid">'+rel.map(cardHTML).join('')+'</div></div>';
  $('#pdRoot').insertAdjacentHTML('afterbegin','<span class="ribbon" aria-hidden="true"><i>&#10048;</i></span>');
  $$('[data-g]').forEach(function(b){b.addEventListener('click',function(){$('#galMain').innerHTML=cover(p,+b.getAttribute('data-g'));$$('[data-g]').forEach(function(x){x.setAttribute('aria-pressed',x===b)})})});
  $$('[data-q]').forEach(function(b){b.addEventListener('click',function(){qty=Math.max(1,Math.min(20,qty+ +b.getAttribute('data-q')));$('#pdQty').textContent=qty})});
  $('#pdAdd').addEventListener('click',function(){addToCart(p.id,qty)});
  $('#pdBuy').addEventListener('click',function(){addToCart(p.id,qty,true);location.href='checkout.html'});
  $('#pdSample').addEventListener('click',function(e){var s=$('#sampleBox');s.hidden=!s.hidden;e.currentTarget.setAttribute('aria-expanded',!s.hidden)});
  $$('.tab').forEach(function(t){t.addEventListener('click',function(){$$('.tab').forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;$('#'+x.getAttribute('aria-controls')).hidden=!on})});
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var all=$$('.tab');var n=all[(all.indexOf(t)+1)%all.length];n.click();n.focus()}})});
}

if(PAGE==='faq'){
  $('#faqList').innerHTML=D.FAQ.map(function(f,i){return '<div class="faq-item"><h3><button class="faq-q" aria-expanded="false" aria-controls="fa'+i+'" id="fq'+i+'">'+esc(f[0])+'<span class="plus" aria-hidden="true"></span></button></h3><div class="faq-a" id="fa'+i+'" role="region" aria-labelledby="fq'+i+'"><div><p>'+esc(f[1])+'</p></div></div></div>'}).join('');
  $('#faqList').addEventListener('click',function(e){var q=e.target.closest('.faq-q');if(q)q.setAttribute('aria-expanded',q.getAttribute('aria-expanded')!=='true')});
  $('#mailBtn').href='mailto:'+B.email;
}

if(PAGE==='policy'){
  var key=D.POLICY[qs.get('p')]?qs.get('p'):'refund';
  $('#polTabs').innerHTML=Object.keys(D.POLICY).map(function(k){return '<a class="tab" role="tab" href="policy.html?p='+k+'" aria-selected="'+(k===key)+'">'+esc(D.POLICY[k][0])+'</a>'}).join('');
  $('#polBody').innerHTML='<h2>'+esc(D.POLICY[key][0])+'</h2><p>'+esc(D.POLICY[key][1])+'</p>';
  document.title=D.POLICY[key][0];
}

if(PAGE==='checkout'){
  var done=false;
  var disc=function(){return coupon?subtotal()*0.1:0};
  window.__renderCheckout=function(){if(done)return;
    var root=$('#coRoot');
    if(!cart.length){root.innerHTML='<p class="cart-empty">Your cart is currently empty.</p><a class="btn" href="shop.html">Browse the library</a>';return}
    var keepN=$('#cn')?$('#cn').value:'',keepE=$('#ce')?$('#ce').value:'';
    root.innerHTML='<div class="co-grid"><div class="panel-card"><h2>Your details</h2><p class="note" style="margin:-4px 0 16px">Demo only. No payment is taken and nothing is sent anywhere.</p><form id="coForm" novalidate><div class="field" id="fName"><label for="cn">Full name</label><input id="cn" autocomplete="name"></div><div class="field" id="fMail"><label for="ce">Email for delivery</label><input id="ce" type="email" autocomplete="email"></div><p class="errmsg" id="coErr" role="alert"></p>'+
    '<div class="gate">Payment step: connect gateway here</div><button class="btn" type="submit" style="width:100%">Place demo order</button></form></div>'+
    '<div class="panel-card"><h2>Order summary</h2><ul class="sum">'+cart.map(function(i){var p=byId(i.id);return '<li><span>'+esc(p.title)+' &times; '+i.qty+'</span>'+px(p.sale*i.qty)+'</li>'}).join('')+(coupon?'<li><span>Coupon WELCOME10</span><span>&minus;'+px(disc())+'</span></li>':'')+'<li style="font-weight:700;font-size:19px"><span>Total</span>'+px(subtotal()-disc())+'</li></ul>'+
    '<div class="coupon"><div class="field"><label for="cc">Coupon code</label><input id="cc" placeholder="Try WELCOME10" autocomplete="off"></div><button type="button" class="btn ghost" id="applyCp" style="align-self:end;margin-bottom:16px">Apply</button></div><p class="errmsg" id="cpMsg" role="status">'+(coupon?'Coupon applied: 10% off.':'')+'</p></div></div>';
    $('#cn').value=keepN;$('#ce').value=keepE;applyCur(false);
    $('#applyCp').addEventListener('click',function(){var v=$('#cc').value.trim().toUpperCase();if(v==='WELCOME10'){coupon=v;window.__renderCheckout()}else $('#cpMsg').textContent=v?'That code is not valid.':'Enter a coupon code first.'});
    $('#coForm').addEventListener('submit',function(e){e.preventDefault();
      var n=$('#cn').value.trim(),m=$('#ce').value.trim(),badM=!/^\S+@\S+\.\S+$/.test(m);
      $('#fName').classList.toggle('err',!n);$('#fMail').classList.toggle('err',badM);
      if(!n||badM){$('#coErr').textContent=!n?'Please enter your name.':'Please enter a valid email address.';(!n?$('#cn'):$('#ce')).focus();return}
      var items=cart.map(function(i){return i.id}),total=subtotal()-disc();
      orders.unshift({no:'SY-'+(1000+orders.length+1),date:new Date().toLocaleDateString(),total:total,ids:items});
      items.forEach(function(id){if(purchased.indexOf(id)<0)purchased.push(id)});
      save('sy_orders',orders);save('sy_purchased',purchased);done=true;
      root.innerHTML='<div class="letter-wrap"><div class="letter"><span class="seal" aria-hidden="true">SV</span><p class="l-date">'+new Date().toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'})+'</p><h2>Dear '+esc(n.split(' ')[0])+',</h2><p>Thank you for choosing a quiet corner of the library. Your order is confirmed (demo only), and a receipt would be sent to '+esc(m)+'.</p><p>Your files are waiting beside this note. Read slowly, and may the pages keep you good company.</p><p class="l-sign">With gratitude,<br><strong>Sayue Verity</strong></p></div><div class="panel-card letter-files"><h3>Download your files</h3><ul class="dl">'+items.map(function(id){var p=byId(id);return '<li><span>'+esc(p.title)+' <span class="muted">('+esc(p.fmt)+')</span></span><button class="btn sm" data-dl>Download</button></li>'}).join('')+'</ul><a class="btn ghost" href="shop.html" style="margin-top:20px">Back to the library</a></div></div>';
      cart=[];coupon=null;save('sy_cart',cart);updateCart();
      $$('[data-dl]',root).forEach(function(b){b.addEventListener('click',function(){toast('Demo only: no file is attached')})});
      window.scrollTo({top:0,behavior:'smooth'});
    });
  };
  window.__renderCheckout();
}

if(PAGE==='account'){
  var renderAccount=function(tab){
    var b=$('#acRoot');
    if(user){
      b.innerHTML='<h2>My Library</h2><p class="muted" style="margin:-4px 0 16px">Signed in as '+esc(user)+'</p><div class="libgrid">'+
      purchased.map(function(id){var p=byId(id);return '<div class="li"><div class="t">'+cover(p,0)+'</div><p>'+esc(p.title)+'</p><button class="btn sm" data-dl style="width:100%">Download</button></div>'}).join('')+'</div>'+
      '<h3 style="font-size:21px;margin-bottom:6px">Order history</h3><ul class="hist">'+(orders.length?orders:[{no:'SY-1000',date:'Sample order',total:15,ids:[2,4]}]).map(function(o){return '<li><span>'+esc(o.no)+' &middot; '+esc(o.date)+'</span>'+px(o.total)+'</li>'}).join('')+'</ul><button class="btn ghost" id="logout" style="margin-top:20px">Log out</button>';
      $$('[data-dl]',b).forEach(function(x){x.addEventListener('click',function(){toast('Demo only: no file is attached')})});
      $('#logout').addEventListener('click',function(){user=null;save('sy_user',null);renderAccount('in')});applyCur(false);return;
    }
    var login=tab==='in';
    b.innerHTML='<h2>Account</h2><div class="tabs" role="tablist" style="margin-top:0"><button class="tab" role="tab" aria-selected="'+login+'" data-t="in">Log in</button><button class="tab" role="tab" aria-selected="'+!login+'" data-t="reg">Register</button></div><div class="tabpanel" role="tabpanel">'+
    (login?'<form id="loginF" novalidate><div class="field" id="lU"><label for="lu">Email or username</label><input id="lu" autocomplete="username"></div><div class="field" id="lP"><label for="lp">Password</label><input id="lp" type="password" autocomplete="current-password"></div><p class="errmsg" id="lErr" role="alert"></p><label class="check"><input type="checkbox"> Remember me</label><button class="btn" type="submit" style="width:100%;margin:8px 0">Log in</button><button type="button" class="linkish" id="lost">Lost your password?</button><p class="note" id="lostMsg"></p></form>'
    :'<form id="regF" novalidate><div class="field" id="rE"><label for="re">Email</label><input id="re" type="email" autocomplete="email"></div><p class="note" style="margin:-8px 0 12px">A link to set your password will be sent to your email.</p><p class="errmsg" id="rErr" role="alert"></p><button class="btn" type="submit" style="width:100%">Register</button></form>')+'</div>';
    $$('[data-t]',b).forEach(function(t){t.addEventListener('click',function(){renderAccount(t.getAttribute('data-t'))})});
    if(login){
      $('#loginF').addEventListener('submit',function(e){e.preventDefault();var u=$('#lu').value.trim(),pw=$('#lp').value;$('#lU').classList.toggle('err',!u);$('#lP').classList.toggle('err',!pw);if(!u||!pw){$('#lErr').textContent='Please enter both your email or username and your password.';return}user=u;save('sy_user',user);renderAccount('in');toast('Welcome back')});
      $('#lost').addEventListener('click',function(){$('#lostMsg').textContent='Demo only: a reset link would be emailed to you.'});
    }else{
      $('#regF').addEventListener('submit',function(e){e.preventDefault();var v=$('#re').value.trim(),bad=!/^\S+@\S+\.\S+$/.test(v);$('#rE').classList.toggle('err',bad);if(bad){$('#rErr').textContent='Please enter a valid email address.';return}$('#rErr').textContent='';$('#regF').insertAdjacentHTML('beforeend','<p class="okmsg" role="status">Thank you. A link to set your password is on its way to '+esc(v)+' (demo only).</p>')});
    }
  };
  renderAccount('in');
}

if(PAGE==='about'){$('#socIg').href=B.instagram;$('#socYt').href=B.youtube}


/* ===== cute extras: cursor candle light, drifting petals, intro candle ===== */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!reduce&&matchMedia('(hover:hover)').matches){
    var g=document.createElement('div');g.className='cursor-glow';g.setAttribute('aria-hidden','true');document.body.appendChild(g);
    var x=0,y=0,tx=0,ty=0,on=false;
    window.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!on){on=true;x=tx;y=ty;g.style.opacity='1'}},{passive:true});
    document.addEventListener('mouseleave',function(){g.style.opacity='0';on=false});
    (function loop(){x+=(tx-x)*.14;y+=(ty-y)*.14;g.style.transform='translate3d('+x+'px,'+y+'px,0)';requestAnimationFrame(loop)})();
  }
  if(!reduce){
    var pw=document.createElement('div');pw.className='petals';pw.setAttribute('aria-hidden','true');
    var cols=['#FEFEF7','#DAC49F','#884041','#C6B48E','#FEFEF7','#DAC49F','#884041','#FEFEF7'];
    for(var i=0;i<8;i++){var el=document.createElement('i');
      el.style.cssText='left:'+(6+i*12)+'%;--sz:'+(10+(i*7)%9)+'px;--dur:'+(22+(i*5)%14)+'s;--del:-'+(i*3.3)+'s;--dx:'+((i%2?1:-1)*(40+i*9))+'px;--rot:'+(300+i*40)+'deg;background:'+cols[i];
      pw.appendChild(el)}
    document.body.appendChild(pw);
    try{if(!sessionStorage.getItem('sy_intro')){sessionStorage.setItem('sy_intro','1');
      var o=document.createElement('div');o.className='intro';o.setAttribute('aria-hidden','true');
      o.innerHTML='<div class="intro-in"><svg viewBox="0 0 60 110" width="70" height="128"><g class="i-flame"><path d="M30 8c10 14 12 28 0 42-12-14-10-28 0-42z" fill="#DAC49F" stroke="#C6B48E" stroke-width="2"/><path d="M30 28c5 8 5 14 0 20-5-6-5-12 0-20z" fill="#884041"/></g><path d="M30 52v8" stroke="#FEFEF7" stroke-width="2.5" stroke-linecap="round"/><rect x="18" y="60" width="24" height="42" rx="3" fill="#FEFEF7"/><ellipse cx="30" cy="104" rx="22" ry="5" fill="#8C7B4F"/></svg><img class="chalk-logo" src="assets/img/Sayue-Shop-logo.png" alt="" width="84" height="84"><p class="chalk">'+esc(B.name)+'</p></div>';
      document.body.appendChild(o);
      setTimeout(function(){o.classList.add('out')},1900);setTimeout(function(){o.remove()},2700);}}catch(e){}
  }
})();


/* ===== colour only where the light falls (author picture) ===== */
(function(){
  var arch=document.querySelector('.owner-arch .o-color');if(!arch)return;arch=arch.parentNode;
  var box=arch.getBoundingClientRect(),rest=function(){box=arch.getBoundingClientRect();return {x:box.width*.12,y:box.height*.62}};
  var r=rest(),x=r.x,y=r.y,tx=x,ty=y,run=false,rad=130;
  function paint(){rad=Math.max(56,Math.round(box.width*.34));arch.style.setProperty('--mx',x+'px');arch.style.setProperty('--my',y+'px');arch.style.setProperty('--rad',rad+'px')}
  function tick(){x+=(tx-x)*.18;y+=(ty-y)*.18;paint();if(Math.abs(tx-x)>.4||Math.abs(ty-y)>.4)requestAnimationFrame(tick);else run=false}
  function go(){if(!run){run=true;requestAnimationFrame(tick)}}
  function move(e){box=arch.getBoundingClientRect();tx=e.clientX-box.left;ty=e.clientY-box.top;go()}
  arch.addEventListener('pointermove',move);arch.addEventListener('pointerdown',move);
  arch.addEventListener('pointerleave',function(){var q=rest();tx=q.x;ty=q.y;go()});
  window.addEventListener('resize',function(){var q=rest();tx=x=q.x;ty=y=q.y;paint()});
  paint();
})();

updateCart();applyCur(false);observe();
})();
