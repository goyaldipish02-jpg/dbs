var S={dest:'MG Road, Bengaluru',hrs:2,arr:'10:30',opt:'pr',lot:'metro',pay:'UPI',rating:0,useful:null,ref:'',bookings:load(),pri:'balanced',tab:'home',per:'commuter',veh:'car',lang:'en',stu:false,pass:false,pts:0,co2:0,streak:0,last:'',earn:0,user:null,onb:false,mine:[],svc:[],sort:'near',bk:'map',opid:'cp',split:1,cat:'all',com:.12,fee:10,disc:15,moff:true,ci:{},role:null,rb:{},pro:false,ol:'metro',yr:1,tp:5000,bud:500};
function load(){return[]}
function save(){if(!S.user)return;try{localStorage.setItem('ps_s_'+S.user.id,JSON.stringify({b:S.bookings,s:{per:S.per,veh:S.veh,lang:S.lang,stu:S.stu,pass:S.pass,pts:S.pts,co2:S.co2,streak:S.streak,last:S.last,earn:S.earn,role:S.role,onb:S.onb,mine:S.mine,svc:S.svc,sort:S.sort,rb:S.rb,pro:S.pro,com:S.com,fee:S.fee,disc:S.disc,moff:S.moff}}))}catch(e){}}
var DEF=JSON.stringify(S);
function loadU(id){try{var d=JSON.parse(localStorage.getItem('ps_s_'+id));if(d){S.bookings=d.b||[];Object.assign(S,d.s||{})}}catch(e){}}
(function(){try{var u=JSON.parse(localStorage.getItem('ps_u'));if(u&&u.id){S.user=u;loadU(u.id)}}catch(e){}})();
var LG={};function lgReset(){LG={tab:'phone',mode:'in',step:1,ph:'',otp:'',nm:'',em:'',pw:'',err:''}}lgReset();
function LGset(k,v){LG[k]=(k==='ph'||k==='otp')?v.replace(/\D/g,''):v}
function fld(type,ph,k,ac,x){return '<input type="'+type+'" placeholder="'+ph+'" aria-label="'+ph+'" autocomplete="'+ac+'" '+(x||'')+' value="'+String(LG[k]).replace(/"/g,'&quot;')+'" oninput="LGset(\''+k+'\',this.value)" onkeydown="if(event.key===\'Enter\')lgo()">'}
function signin(id,nm){S.user={id:id,name:nm};try{localStorage.setItem('ps_u',JSON.stringify(S.user))}catch(e){}loadU(id);mount();lgReset();S.role='rider';S.onb=false;S.tab='ops';save();go('onb1')}
function lgo(){var g=LG,up=g.mode==='up';
 function bad(m){g.err=m;go('login')}
 if(g.tab==='phone'){
  if(g.step===1){if(up&&!g.nm.trim())return bad('Please enter your name.');if(!/^[6-9]\d{9}$/.test(g.ph))return bad('Enter a valid 10-digit mobile number.');g.err='';g.step=2;return go('login')}
  if(g.otp!=='1234')return bad('Wrong OTP. The demo OTP is 1234.');
  return signin(g.ph,g.nm.trim()||'User '+g.ph.slice(-4))}
 if(up&&!g.nm.trim())return bad('Please enter your name.');
 if(!/^\S+@\S+\.\S+$/.test(g.em))return bad('Enter a valid email address.');
 if(g.pw.length<6)return bad('Password must be at least 6 characters.');
 signin(g.em.toLowerCase(),g.nm.trim()||g.em.split('@')[0])}
function doOut(){save();try{localStorage.removeItem('ps_u')}catch(e){}var d=JSON.parse(DEF);Object.keys(d).forEach(function(k){S[k]=d[k]});mount();lgReset();go('login')}
function cancelB(i){S.bookings.splice(i,1);save();toast('Booking cancelled');go('bookings')}
function prio(b){return '<div class="chips">'+[['balanced','Balanced'],['fast','Fastest'],['cheap','Cheapest']].map(function(p){return '<button class="pill'+(S.pri===p[0]?' on':'')+'" onclick="S.pri=\''+p[0]+'\';go(\''+b+'\')">'+p[1]+'</button>'}).join('')+'</div>'}
var LOTS=[
{id:'city',n:'City Centre Parking',r:80,sp:12,km:1.2,st:'Limited',x:95,y:70},
{id:'metro',n:'Metro Park & Ride',r:50,sp:25,km:2.1,st:'Available',x:250,y:55},
{id:'brig',n:'Brigade Road Lot',r:60,sp:18,km:0.9,st:'Available',x:70,y:175},
{id:'ch',n:'Church St Garage',r:90,sp:0,km:0.7,st:'Full',x:262,y:170}];
var COL={Available:'var(--grn)',Limited:'var(--amb)',Full:'var(--red)'};
LOTS.push({id:'ind',n:'Indiranagar 100ft Lot',r:70,sp:15,km:3.4,st:'Limited',x:130,y:205},{id:'trin',n:'Trinity Metro Park & Ride',r:40,sp:48,km:1.8,st:'Available',x:175,y:35},{id:'cub',n:'Cubbon Park Pay & Park',r:45,sp:30,km:1.6,st:'Available',x:40,y:110},{id:'kor',n:'Koramangala Forum Garage',r:85,sp:0,km:5.2,st:'Full',x:300,y:112});
var CAP={city:40,metro:60,brig:40,ch:30,ind:35,trin:70,cub:50,kor:45},PRS={metro:1,trin:1};
var OPS=[{id:'cp',n:'CityPark Services',r:4.4,rv:812,t:'Private operator',lots:['city','ind']},{id:'ml',n:'Metro Link Parking',r:4.2,rv:2140,t:'Metro station parking',lots:['metro','trin']},{id:'hp',n:'Heritage Parks',r:4.6,rv:530,t:'Private operator',lots:['brig','cub']},{id:'g1',n:'GarageOne',r:4.1,rv:295,t:'Garage chain',lots:['ch','kor']}];
var SV=[['park','🅿️','Find parking'],['pr','🚗🚇','Park & Ride'],['pt','🚌','Public transport'],['ev','⚡','EV charging'],['cov','🏠','Covered'],['h24','🌙','24x7 access'],['rest','🚻','Restroom / break']];
LOTS.forEach(function(l){l.b0=l.r;l.a={city:['cov'],metro:['ev','cov','24x'],brig:['24x','rest'],ch:['cov','rest'],ind:['24x'],trin:['ev','24x','rest'],cub:['rest'],kor:['cov','ev','rest']}[l.id]});
function setRates(){var m={car:1,bike:.4,ev:1}[S.veh]*(S.per==='driver'?.85:1)*(S.stu?.9:1);LOTS.forEach(function(l){l.r=Math.round((S.rb[l.id]||l.b0)*m)})}
var IC={ev:'⚡EV',cov:'🏠Covered','24x':'🌙24x7',rest:'🚻Restroom'},PT={pr:30,pt:20,drive:5};
var L={en:{hi:'Good morning,',where:'Where do you want to go?',home:'Home',park:'Parking',map:'Map',bookings:'Bookings',rewards:'Rewards',hub:'Hub',profile:'Profile'},
kn:{hi:'ಶುಭೋದಯ,',where:'ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?',home:'ಮುಖಪುಟ',park:'ಪಾರ್ಕಿಂಗ್',map:'ನಕ್ಷೆ',bookings:'ಬುಕಿಂಗ್',rewards:'ರಿವಾರ್ಡ್ಸ್',hub:'ಹಬ್',profile:'ಪ್ರೊಫೈಲ್'},
hi:{hi:'सुप्रभात,',where:'आप कहाँ जाना चाहते हैं?',home:'होम',park:'पार्किंग',map:'नक्शा',bookings:'बुकिंग',rewards:'रिवॉर्ड्स',hub:'हब',profile:'प्रोफ़ाइल'}};
function t(k){return (L[S.lang]||L.en)[k]||L.en[k]}
var METRO=30;Object.defineProperty(window,'FEE',{get:function(){return S.pass?0:S.fee}});
function lot(id){return LOTS.filter(function(l){return l.id===id})[0]}
function cost(k,h){return k==='drive'?lot('city').r*h:k==='pr'?lot('metro').r*h+METRO:50}
var DESTS={'MG Road, Bengaluru':[35,27,32],'Indiranagar, Bengaluru':[28,24,30],'Koramangala, Bengaluru':[32,28,35],'Whitefield, Bengaluru':[55,40,48],'Manyata Tech Park, Bengaluru':[50,38,52],'Jayanagar, Bengaluru':[30,29,34]};
var WT={balanced:[1,.1],fast:[1,.03],cheap:[.3,.3]};
function opts(){var T=DESTS[S.dest]||[35,27,32],W=WT[S.pri];
 return [{k:'drive',n:'Drive + Parking',m:T[0],t:'High',tc:'hi',ic:'🚗'},
 {k:'pr',n:'Park & Ride',m:T[1],t:'Low',tc:'lo',ic:'🚗🚇'},
 {k:'pt',n:'Public Transport',m:T[2],t:'Low',tc:'lo',ic:'🚇'}].map(function(o){
  o.c=cost(o.k,S.hrs);o.s=o.m*W[0]+o.c*W[1]+(o.k==='drive'?15:0)+(o.k==='pt'?8:0);return o});
}
function best(){return opts().sort(function(a,b){return a.s-b.s})[0]}
function cur(){return opts().filter(function(o){return o.k===S.opt})[0]}
var $=document.getElementById('app');
function go(t,p){if(!S.user)t='login';setRates();S.tab=t==='map'?'map':t==='home'?'home':t==='ops'?'ops':S.tab;R[t](p);$.firstElementChild&&($.firstElementChild.scrollTop=0)}
function toast(m){var t=document.getElementById('toast');t.textContent=m;t.className='on';setTimeout(function(){t.className=''},1800)}
function shell(inner,nav){$.setAttribute('data-role',S.role||'rider');$.innerHTML=inner+(nav?navbar():'')+'<div id="toast"></div>'}
function navbar(){
 var nv=S.role&&S.role!=='rider'?RT[S.role]:[['home','🏠',t('home')],['ops','🅿️',t('park')],['bookings','🎫',t('bookings')],S.per==='driver'?['hub','💼',t('hub')]:['rewards','🏆',t('rewards')],['profile','👤',t('profile')]];
 return '<div class="nav">'+nv.map(function(x){return '<button class="'+(S.tab===x[0]?'on':'')+'" onclick="S.tab=\''+x[0]+'\';go(\''+x[0]+'\')"><span>'+x[1]+'</span>'+x[2]+'</button>'}).join('')+'</div>'}
function head(t,b){return '<div class="top"><button class="back" aria-label="Back" onclick="go(\''+b+'\')">←</button>'+t+'</div>'}
var R={
splash:function(){shell('<div class="scr splash"><div style="font-size:54px">📍</div><h1>ParkSmart</h1><div style="font-weight:600">Smart parking. Smarter journeys.</div><div style="opacity:.85">Find parking. Avoid traffic.<br>Travel smarter.</div><div style="height:20px"></div><button class="btn g" onclick="go(\'roles\')">Get Started</button></div>')},
home:function(){shell('<div class="scr"><div class="mut">'+t('hi')+'</div><h1>'+t('where')+'</h1>'+
 '<input id="d" list="dl" onfocus="this.select()" aria-label="Destination" value="'+S.dest+'" placeholder="Enter destination" oninput="S.dest=this.value"><datalist id="dl">'+Object.keys(DESTS).map(function(k){return '<option value="'+k+'">'}).join('')+'</datalist>'+
 '<h2>Quick Options</h2><div class="q"><button onclick="go(\'map\')"><span class="ico" style="background:#dce8ff">P</span>Find Parking</button>'+
 '<button onclick="S.opt=\'pt\';go(\'compare\')"><span class="ico" style="background:#dff5e8">🚌</span>Public Transport</button>'+
 '<button onclick="S.opt=\'pr\';S.lot=\'metro\';S.bk=\'home\';go(\'booking\')"><span class="ico" style="background:#e8e0fb">🚗</span>Park &amp; Ride</button></div>'+
 '<div class="card" style="background:var(--soft);border-color:var(--pri2)"><div class="row"><span class="ico">🧠</span><div><div class="b">AI Recommendation</div><div class="mut">Let AI find the best option for you based on traffic, parking, price and more.</div></div></div><div style="height:10px"></div><button class="btn" onclick="go(\'rec\')">Plan My Journey</button></div>'+pcard()+sbtn()+'</div>',1)},
map:function(){
 var pins=LOTS.map(function(l){return '<g class="pin" tabindex="0" role="button" aria-label="'+l.n+'" onclick="S.lot=\''+l.id+'\';go(\'map\')" onkeydown="if(event.key===\'Enter\')this.onclick()">'+
 '<circle cx="'+l.x+'" cy="'+l.y+'" r="'+(S.lot===l.id?17:13)+'" fill="'+COL[l.st]+'" stroke="#fff" stroke-width="3"/><text x="'+l.x+'" y="'+(l.y+5)+'" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">P</text>'+
 '<text x="'+l.x+'" y="'+(l.y-21)+'" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">'+(l.st==='Full'?'Full':'₹'+l.r+' · '+l.sp)+'</text></g>'}).join('');
 var list=LOTS.filter(function(l){return l.st!=='Full'&&(S.cat==='all'||l.a.indexOf(S.cat)>-1)}).sort(function(a,b){return a.km-b.km}).map(function(l){
  return '<div class="card row'+(S.lot===l.id?' sel':'')+'" tabindex="0" onclick="S.lot=\''+l.id+'\';S.opt=\''+(PRS[l.id]?'pr':'drive')+'\';S.bk=\'map\';go(\'booking\')"><span class="ico" style="background:#dce8ff">P</span><div class="sp"><div class="b">'+l.n+'</div><div class="mut">₹'+l.r+'/hour · '+l.sp+' spaces · '+l.km+' km</div><div class="mut">'+l.a.map(function(a){return IC[a]}).join(' ')+'</div></div>›</div>'}).join('');
 shell('<div class="scr">'+head('Parking Availability','home')+'<div class="mut">Near '+S.dest+'</div>'+
 '<svg viewBox="0 0 340 230" style="width:100%;border-radius:14px;background:var(--soft);border:1px solid var(--line)" role="img" aria-label="Map of nearby parking"><g stroke="var(--card)" stroke-width="9" fill="none"><path d="M0 120H340M170 0V230M0 40L340 200M60 0L120 230"/></g><g stroke="var(--line)" stroke-width="3" fill="none"><path d="M0 190H340M250 0V230"/></g>'+
 '<circle cx="170" cy="125" r="16" fill="#2b6fe6" opacity=".2"/><circle cx="170" cy="125" r="7" fill="#2b6fe6" stroke="#fff" stroke-width="3"/>'+pins+'</svg>'+
 '<div class="legend"><span><i class="dot" style="background:var(--grn)"></i>Available</span><span><i class="dot" style="background:var(--amb)"></i>Limited</span><span><i class="dot" style="background:var(--red)"></i>Full</span></div>'+
 cats()+'<h2>Nearby Parking</h2>'+(list||'<div class="card mut">No lots match this filter.</div>')+'<button class="btn" onclick="go(\'rec\')">View Best Options</button></div>',1)},
rec:function(){var b=best();S.opt=b.k;var o=opts();var dv=o.filter(function(x){return x.k==='drive'})[0],sv=dv.m-b.m,sc=dv.c-b.c;
 var why={pr:'Avoids traffic, parking available, lower cost and faster journey.',pt:'Cheapest and traffic-free for a longer stay.',drive:'Fastest door to door for a short stay.'}[b.k];
 var legs={pr:[['🚗','Drive',Math.round(b.m*.5)+' min'],['P','Park','5 min'],['🚇','Metro',(b.m-Math.round(b.m*.5)-5)+' min']],pt:[['🚶','Walk','8 min'],['🚇','Metro',(b.m-14)+' min'],['🚶','Walk','6 min']],drive:[['🚗','Drive',(b.m-5)+' min'],['P','Park','5 min']]}[b.k];
 shell('<div class="scr">'+head('AI Journey Recommendation','home')+'<div class="card"><div class="mut">Destination</div><div class="b">📍 '+S.dest+'</div></div>'+
 '<div class="stat"><div>🚦 Traffic<br><b class="hi">High</b></div><div>🅿️ Parking<br><b class="mo">Moderate</b></div><div>🚇 Transit<br><b class="lo">Available</b></div></div>'+
 prio('rec')+'<div class="card sel"><span class="tag">★ Best Option for You</span><div class="row" style="margin:8px 0"><span class="ico" style="background:var(--pri);color:#fff">'+(b.k==='drive'?'🚗':'🚇')+'</span><div><div class="b" style="font-size:17px">'+b.n+'</div><div class="mut">'+why+'</div></div></div>'+
 (b.k!=='drive'?'<div style="color:var(--grn);font-weight:700;font-size:13px;margin-bottom:8px">Saves '+sv+' min'+(sc>0?' and ₹'+sc:'')+' vs driving all the way</div>':'')+'<div class="stat">'+legs.map(function(l){return '<div>'+l[0]+'<br>'+l[1]+'<br><b>'+l[2]+'</b></div>'}).join('')+'</div>'+
 '<div class="tot" style="margin-top:8px"><span>Total Time</span><b>'+b.m+' min</b></div><div class="tot"><span>Total Cost for '+S.hrs+' h</span><b>₹'+(b.c+(b.k==='pt'?0:FEE))+'</b></div></div>'+
 '<div class="row mut">Parking duration<span class="sp"></span><div class="stp"><button aria-label="Less" onclick="S.hrs=Math.max(1,S.hrs-1);go(\'rec\')">−</button><b style="color:var(--ink)">'+S.hrs+' h</b><button aria-label="More" onclick="S.hrs=Math.min(8,S.hrs+1);go(\'rec\')">+</button></div></div>'+
 '<button class="btn" onclick="choose()">Choose This Option</button><button class="btn o" onclick="go(\'compare\')">Compare all options</button></div>')},
compare:function(){var b=best().k;
 shell('<div class="scr">'+head('Choose Your Best Route','home')+prio('compare')+opts().map(function(o){var on=S.opt===o.k;
  return '<div class="card row'+(on?' sel':'')+'"><span class="ico">'+o.ic+'</span><div class="sp">'+(o.k===b?'<span class="tag">★ AI Recommended</span>':'')+'<div class="b">'+o.n+'</div><div class="mut">'+o.m+' min · ₹'+o.c+(o.k==='pt'?'':' + ₹'+FEE+' fee')+'</div><div class="mut">Traffic: <b class="'+o.tc+'">'+o.t+'</b></div></div><button class="btn s'+(on?' g':'')+'" onclick="S.opt=\''+o.k+'\';go(\'compare\')">'+(on?'Selected':'Select')+'</button></div>'}).join('')+
 '<div class="row mut">Parking duration<span class="sp"></span><div class="stp"><button aria-label="Less" onclick="S.hrs=Math.max(1,S.hrs-1);go(\'compare\')">−</button><b style="color:var(--ink)">'+S.hrs+' h</b><button aria-label="More" onclick="S.hrs=Math.min(8,S.hrs+1);go(\'compare\')">+</button></div></div>'+
 '<div class="mut">🌿 Save time. Reduce congestion. Choose the smarter way.</div><button class="btn" onclick="choose()">Continue</button></div>')},
booking:function(){var l=lot(S.lot);var total=l.r*S.hrs;
 shell('<div class="scr">'+head(l.n,S.bk||'map')+'<div style="height:110px;border-radius:14px;background:linear-gradient(135deg,#1e5fd0,#2aa66b);display:grid;place-items:center;font-size:44px;color:#fff;font-weight:800">P</div>'+
 '<div class="mut">📍 '+l.km+' km from you</div><div>✅ Available spaces: <b>'+l.sp+'</b></div><div>₹<b>'+l.r+'</b>/hour</div>'+
 '<div class="card"><h2>Parking Details</h2><div class="tot"><span>Arrival</span><input type="time" aria-label="Arrival time" value="'+S.arr+'" style="width:130px" onchange="S.arr=this.value"></div>'+
 '<div class="tot" style="align-items:center"><span>Duration</span><div class="stp"><button aria-label="Less" onclick="S.hrs=Math.max(1,S.hrs-1);go(\'booking\')">−</button><b>'+S.hrs+' h</b><button aria-label="More" onclick="S.hrs=Math.min(8,S.hrs+1);go(\'booking\')">+</button></div></div>'+
 '<div class="tot b"><span>Total</span><span>₹'+total+'</span></div></div><button class="btn" onclick="go(\'payment\')">Reserve Parking</button></div>')},
payment:function(){var l=lot(S.lot),pf=l.r*S.hrs,mf=S.opt==='pr'?METRO:0,tt=pf+mf+FEE;
 shell('<div class="scr">'+head('Confirm Booking','booking')+'<div class="card"><div class="b">'+l.n+'</div><div class="mut">'+l.km+' km from you · '+S.arr+' · '+S.hrs+' h</div><div style="height:8px"></div>'+
 '<div class="tot"><span>Parking Fee</span><span>₹'+pf+'</span></div>'+(mf?'<div class="tot"><span>Metro fare</span><span>₹'+mf+'</span></div>':'')+'<div class="tot"><span>Platform Fee</span><span>₹'+FEE+'</span></div><hr style="border:0;border-top:1px solid var(--line)"><div class="tot b" style="font-size:18px"><span>Total</span><span>₹'+tt+'</span></div></div>'+
 '<div class="row mut">Split with friends<span class="sp"></span><div class="stp"><button aria-label="Fewer" onclick="S.split=Math.max(1,S.split-1);go(\'payment\')">−</button><b style="color:var(--ink)">'+S.split+'</b><button aria-label="More" onclick="S.split=Math.min(8,S.split+1);go(\'payment\')">+</button></div></div>'+(S.split>1?'<div class="card" style="background:var(--soft)">Each person pays <b>₹'+Math.ceil(tt/S.split)+'</b> via UPI request</div>':'')+'<h2>Payment Method</h2>'+['UPI','Credit / Debit Card','Wallet'].map(function(m){return '<div class="pay'+(S.pay===m?' on':'')+'" tabindex="0" onclick="S.pay=\''+m+'\';go(\'payment\')">'+(S.pay===m?'◉':'○')+' '+m+'</div>'}).join('')+
 '<button class="btn" onclick="confirmBooking()">Pay &amp; Reserve</button></div>')},
journey:function(){var o=cur(),l=lot(S.lot);
 var steps=o.k==='pr'?[['🏠','Your Location',''],['🚗','Drive to Metro Parking',Math.round(o.m*.5)+' min · '+l.km+' km'],['P','Park your vehicle','5 min'],['🚇','Take Metro',(o.m-Math.round(o.m*.5)-5)+' min'],['📍',S.dest,'']]:
 o.k==='drive'?[['🏠','Your Location',''],['🚗','Drive to '+l.n,(o.m-5)+' min'],['P','Park your vehicle','5 min'],['📍',S.dest,'']]:
 [['🏠','Your Location',''],['🚶','Walk to station','8 min'],['🚇','Take Metro',(o.m-14)+' min'],['🚶','Walk','6 min'],['📍',S.dest,'']];
 shell('<div class="scr">'+head('Your Journey','home')+(o.k!=='pt'?'<div class="card sel row"><span style="font-size:26px">✅</span><div><div class="b">Booking Confirmed!</div><div class="mut">Ref. No: '+S.ref+'</div></div><span class="sp"></span>'+qr(S.ref)+'</div>':'')+
 '<h2>Your Route</h2>'+steps.map(function(s,i){return (i?'<div class="line"></div>':'')+'<div class="step"><span class="ico">'+s[0]+'</span><div><div class="b">'+s[1]+'</div><div class="mut">'+s[2]+'</div></div></div>'}).join('')+
 '<div class="card"><div class="mut">Total Journey Time</div><div class="b" style="font-size:20px">'+o.m+' minutes</div></div>'+
 wg(S.bookings[0],o)+'<button class="btn o" onclick="shr()">📤 Share my plan</button><button class="btn" onclick="toast(\'Navigation started\');setTimeout(function(){go(\'feedback\')},900)">Start Navigation</button></div>')},
feedback:function(){
 shell('<div class="scr">'+head('How was your journey?','home')+'<div class="stars" style="text-align:center">'+[1,2,3,4,5].map(function(i){return '<button aria-label="'+i+' stars" class="'+(i<=S.rating?'on':'')+'" onclick="S.rating='+i+';go(\'feedback\')">★</button>'}).join('')+'</div>'+
 '<div class="mut" style="text-align:center">'+(S.rating?'Great! Your feedback helps us improve recommendations.':'Tap a star to rate.')+'</div><h2>Was the AI recommendation useful?</h2>'+
 '<div class="row"><button class="btn '+(S.useful===true?'g':'o')+'" onclick="S.useful=true;go(\'feedback\')">👍 Yes</button><button class="btn '+(S.useful===false?'':'o')+'" onclick="S.useful=false;go(\'feedback\')">👎 No</button></div>'+
 '<h2>Any suggestions?</h2><textarea rows="4" aria-label="Suggestions" placeholder="Tell us more..."></textarea><button class="btn" onclick="S.rating=0;S.useful=null;toast(\'Thanks for the feedback!\');setTimeout(function(){go(\'home\')},900)">Submit Feedback</button></div>',1)},
bookings:function(){shell('<div class="scr"><h1>Bookings</h1>'+(S.bookings.length?S.bookings.map(function(b,i){return '<div class="card row"><div class="sp"><div class="b">'+b.n+'</div><div class="mut">'+b.t+' · '+b.h+' h · ₹'+b.p+' · '+b.pay+'</div><div class="mut">Ref. '+b.ref+'</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="btn s" onclick="ext('+i+')">+1 h</button><button class="btn s o" onclick="cancelB('+i+')">Cancel</button></div></div>'}).join(''):'<div class="card mut">No bookings yet. Plan a journey and reserve a spot to see it here.</div><button class="btn" onclick="go(\'rec\')">Plan My Journey</button>')+'</div>',1)},
login:function(){var g=LG,ph=g.tab==='phone',up=g.mode==='up',f,b;
 if(ph){if(g.step===1){f=(up?fld('text','Your name','nm','name'):'')+fld('tel','10-digit mobile number','ph','tel','maxlength="10" inputmode="numeric"');b='Send OTP'}
  else{f='<div class="mut">OTP sent to +91 '+g.ph+'. Demo OTP: 1234</div>'+fld('tel','4-digit OTP','otp','one-time-code','maxlength="4" inputmode="numeric"')+'<button class="lnk" onclick="LG.step=1;LG.otp=\'\';LG.err=\'\';go(\'login\')">Change number</button>';b='Verify &amp; continue'}}
 else{f=(up?fld('text','Your name','nm','name'):'')+fld('email','Email address','em','email')+fld('password','Password (min 6 characters)','pw',up?'new-password':'current-password');b=up?'Create account':'Sign in'}
 shell('<div class="scr login"><div class="lhero"><div style="font-size:48px">📍</div><h1 style="font-size:32px">ParkSmart</h1><div style="font-weight:600">Smart parking. Smarter journeys.</div><div style="opacity:.85">Find parking. Avoid traffic. Travel smarter.</div></div>'+
 '<div class="lform"><h1>'+(up?'Create your account':'Welcome back')+'</h1><div class="chips"><button class="pill'+(ph?' on':'')+'" onclick="LG.tab=\'phone\';LG.step=1;LG.err=\'\';go(\'login\')">📱 Phone</button><button class="pill'+(ph?'':' on')+'" onclick="LG.tab=\'email\';LG.err=\'\';go(\'login\')">✉️ Email</button></div>'+f+
 (g.err?'<div role="alert" style="color:var(--red);font-weight:600">'+g.err+'</div>':'')+'<button class="btn" onclick="lgo()">'+b+'</button>'+
 '<button class="lnk" onclick="LG.mode=\''+(up?'in':'up')+'\';LG.step=1;LG.err=\'\';go(\'login\')">'+(up?'Already have an account? Sign in':'New here? Create an account')+'</button>'+
 '<button class="btn o" onclick="signin(\'guest\',\'Guest\')">Continue as guest</button><div class="mut">Demo sign-in: no real account is created, no SMS is sent, and passwords are not stored or checked.</div></div></div>')},
lo:function(){shell('<div class="scr" style="justify-content:center;text-align:center"><div style="font-size:44px">👋</div><h1>Log out?</h1><div class="mut">You are signed in as <b>'+S.user.name+'</b>. Your bookings and points stay saved on this device for when you sign back in.</div><button class="btn" style="background:var(--red)" onclick="doOut()">Log out</button><button class="btn o" onclick="go(HOME[S.role||\'rider\'])">Cancel</button></div>')},
lst:function(){var g=LST,A=[['ev','⚡ EV charging'],['cov','🏠 Covered'],['24x','🌙 24x7'],['rest','🚻 Restroom']];
 shell('<div class="scr">'+head('List your parking',S.mine.length?'mylist':'onb1')+'<div class="mut">Tell us about your lot. Commuters will see it in the parking operator list.</div>'+
 lf('n','Parking name (e.g. Lakeview Basement Parking)')+lf('biz','Business or owner name')+lf('area','Area or address (e.g. Indiranagar, Bengaluru)')+
 '<div class="card">'+stp('Total spaces',g.sp,'LSn(\'sp\',-5)','LSn(\'sp\',5)')+stp('Rate per hour','₹'+g.r,'LSn(\'r\',-5)','LSn(\'r\',5)')+'</div>'+
 '<h2>Amenities</h2><div class="chips" style="flex-wrap:wrap">'+A.map(function(a){return '<button class="pill'+(g.a.indexOf(a[0])>-1?' on':'')+'" style="flex:none;padding:8px 12px" onclick="LSt(\''+a[0]+'\')">'+a[1]+'</button>'}).join('')+
 '<button class="pill'+(g.pr?' on':'')+'" style="flex:none;padding:8px 12px" onclick="LST.pr=!LST.pr;go(\'lst\')">🚇 Near a metro station</button></div>'+
 (g.err?'<div role="alert" style="color:var(--red);font-weight:600">'+g.err+'</div>':'')+'<button class="btn" onclick="lsub()">Submit listing</button></div>')},
mylist:function(){
 shell('<div class="scr">'+rh('My listings','🅿️')+(S.mine.length?S.mine.map(function(m,i){var br=S.rb[m.id]||m.r,est=Math.round(m.sp*.55*4*br*(1-COM()));
  return '<div class="card"><div class="b">'+m.n+'</div><div class="mut">'+m.area+' · '+m.biz+'</div><div class="mut">'+(m.a.map(function(a){return IC[a]}).join(' ')+(m.pr?' 🚇Park &amp; Ride':'')||'No amenities listed')+'</div><div style="margin:6px 0"><span class="tag">Live in this demo</span></div>'+
  stp('Spaces',m.sp,'mupd('+i+',\'sp\',-5)','mupd('+i+',\'sp\',5)')+stp('Rate per hour','₹'+br,'mupd('+i+',\'r\',-5)','mupd('+i+',\'r\',5)')+
  '<div class="mut">Estimate at 55% occupancy: about '+rup(est)+' a day after commission (an assumption, not a promise).</div><div style="height:8px"></div><button class="btn s o" onclick="mdel('+i+')">Remove listing</button></div>'}).join(''):'<div class="card mut">You have not listed any parking yet.</div>')+
 '<button class="btn" onclick="lstOpen()">＋ List '+(S.mine.length?'another':'your first')+' parking</button><button class="lnk" onclick="go(\'onb1\')">Change who I am</button><div class="mut">In the real product, ParkSmart verifies each lot with a site visit before it goes live. Listings here are saved on this device only.</div></div>',1)},
onb1:function(){var P=[['commuter','🧑‍💼','Commuter','Daily or occasional trips into the city'],['driver','🚖','Cab driver','Uber, Ola, Rapido or taxi'],['genz','🎧','Gen Z / student','Budget trips, streaks and split bills'],['owner','🅿️','Parking owner','List your parking and earn from every booking']];
 shell('<div class="scr"><div class="mut">Step 1 of 2 · Hi '+S.user.name+' 👋</div><h1>Who are you?</h1>'+P.map(function(p){var on=S.per===p[0];return '<div class="card row'+(on?' sel':'')+'" tabindex="0" role="button" onclick="S.per=\''+p[0]+'\';S.svc=[];go(\'onb1\')"><span class="ico">'+p[1]+'</span><div class="sp"><div class="b">'+p[2]+'</div><div class="mut">'+p[3]+'</div></div><b>'+(on?'✓':'')+'</b></div>'}).join('')+(S.per==='owner'?'':'<h2>Your vehicle</h2>'+chv('onb1'))+'<button class="btn" onclick="onbNext()">Continue</button></div>')},
onb2:function(){if(!S.svc.length)S.svc={driver:['park','h24','rest'],genz:['pr','pt','ev'],commuter:['pr','park']}[S.per]||['park'];
 shell('<div class="scr"><div class="mut">Step 2 of 2</div><h1>What do you need?</h1><div class="mut">Pick all that apply. We will rank parking operators for you.</div><div class="q" style="grid-template-columns:1fr 1fr">'+SV.map(function(x){var on=S.svc.indexOf(x[0])>-1;return '<button class="'+(on?'on':'')+'" aria-pressed="'+on+'" onclick="tsv(\''+x[0]+'\',\'onb2\')"><span style="font-size:22px">'+x[1]+'</span>'+x[2]+'</button>'}).join('')+'</div><button class="btn" onclick="S.onb=true;save();go(\'ops\')">Show parking operators</button><button class="lnk" onclick="go(\'onb1\')">← Back</button></div>')},
ops:function(){var L=opList(),SR=[['near','Nearest'],['cheap','Cheapest'],['top','Top rated']];
 shell('<div class="scr"><div class="top"><div class="sp"><div class="mut" style="font-weight:500">Near '+S.dest+'</div><div style="font-size:19px;font-weight:800">Parking operators</div></div><button class="btn s o" onclick="go(\'map\')">🗺️ Map</button></div>'+
 '<div class="chips" style="flex-wrap:wrap">'+SV.map(function(x){var on=S.svc.indexOf(x[0])>-1;return '<button class="pill'+(on?' on':'')+'" style="flex:none;padding:8px 12px" onclick="tsv(\''+x[0]+'\',\'ops\')">'+x[1]+' '+x[2]+'</button>'}).join('')+'</div>'+
 '<div class="chips">'+SR.map(function(x){return '<button class="pill'+(S.sort===x[0]?' on':'')+'" onclick="S.sort=\''+x[0]+'\';save();go(\'ops\')">'+x[1]+'</button>'}).join('')+'</div>'+
 (S.svc.indexOf('pt')>-1?'<div class="card row" tabindex="0" onclick="S.opt=\'pt\';go(\'compare\')"><span class="ico">🚌</span><div class="sp"><div class="b">Compare public transport</div><div class="mut">See the metro and bus option for '+S.dest+'</div></div>›</div>':'')+
 (L.length?L.map(function(x){return '<div class="card" tabindex="0" role="button" onclick="S.opid=\''+x.o.id+'\';go(\'opd\')"><div class="row"><span class="ico" style="background:var(--pri);color:#fff">'+x.o.n[0]+'</span><div class="sp"><div class="b">'+x.o.n+' <span class="lo">✓</span></div><div class="mut">'+(x.o.rv?'★ '+x.o.r+' ('+x.o.rv+')':'New')+' · '+x.ls.length+' lots · '+x.km+' km</div></div><div style="text-align:right"><div class="b">₹'+x.min+'</div><div class="mut">from /h</div></div></div><div class="mut" style="margin-top:6px">'+x.tags.map(function(a){return IC[a]}).join(' ')+(x.pr?' 🚇Park &amp; Ride':'')+' · '+x.sp+' spaces open</div>'+(x.mt.length?'<div style="margin-top:6px"><span class="tag">Matches '+x.mt.join(' · ')+'</span></div>':'')+'</div>'}).join(''):'<div class="card mut">No operators offer these services together. Try removing a filter.</div>')+
 '<div class="mut">Operators, ratings and prices are sample data.</div></div>',1)},
opd:function(){var o=OPS.filter(function(x){return x.id===S.opid})[0];
 shell('<div class="scr">'+head(o.n,'ops')+'<div class="card hero"><div class="b" style="font-size:18px">'+o.n+' ✓ Verified</div><div class="mut">'+(o.rv?'★ '+o.r+' · '+o.rv+' reviews':'New on ParkSmart')+' · '+o.t+'</div></div>'+
 o.lots.map(lot).map(function(l){var m=lotMatch(l),full=l.st==='Full';return '<div class="card"><div class="row"><i class="dot" style="background:'+COL[l.st]+'"></i><div class="sp"><div class="b">'+l.n+'</div><div class="mut">₹'+l.r+'/h · '+(full?'Full':l.sp+' spaces')+' · '+l.km+' km</div><div class="mut">'+l.a.map(function(a){return IC[a]}).join(' ')+(PRS[l.id]?' 🚇Park &amp; Ride':'')+'</div></div><button class="btn s'+(full?' o':'')+'" '+(full?'disabled':'onclick="S.lot=\''+l.id+'\';S.opt=\''+(PRS[l.id]?'pr':'drive')+'\';S.bk=\'opd\';go(\'booking\')"')+'>'+(full?'Full':'Book')+'</button></div>'+(m.length?'<div style="margin-top:6px"><span class="tag">Matches '+m.join(' · ')+'</span></div>':'')+'</div>'}).join('')+'</div>',1)},
roles:function(){S.role=null;shell('<div class="scr"><h1>Who are you?</h1><div class="mut">Pick your role. Each one opens its own app view. You can switch any time.</div>'+ROLES.map(function(c,i){return '<div class="card row" tabindex="0" onclick="pick('+i+')"><span class="ico">'+c[2]+'</span><div class="sp"><div class="b">'+c[3]+'</div><div class="mut">'+c[4]+'</div></div>›</div>'}).join('')+'<div class="mut" style="text-align:center">Signed in as '+S.user.name+'</div><button class="btn o" onclick="go(\'lo\')">Log out</button></div>')},
op:function(){var o=ost(),wk=[.82,.9,.95,1,1.12,1.25,.7].map(function(m){return Math.round(o.net*m)});
 shell('<div class="scr">'+rh('Today','📊')+lc('op')+'<div class="card hero"><div class="mut">'+o.l.n+' · today (simulated)</div><div style="font-size:28px;font-weight:800">'+rup(o.net)+'</div><div class="mut">Your share after '+Math.round(COM()*100)+'% commission</div></div>'+
 '<div class="stat"><div>Occupancy<br><b>'+o.occ+'%</b></div><div>Sessions<br><b>'+o.ses+'</b></div><div>Open spaces<br><b>'+o.l.sp+'</b></div></div>'+
 '<div class="card"><h2>Last 7 days (₹)</h2>'+bars(wk,['M','T','W','T','F','S','S'])+'</div>'+
 '<div class="card">'+(o.occ>=85?'🔥 Almost full. Consider raising your rate in the Pricing tab.':o.occ<50?'📉 Low occupancy. A lower evening rate may fill spaces.':'✅ Healthy occupancy.')+'</div></div>',1)},
opres:function(){var o=ost(),P=['KA01MK4821','KA03NB1190','KA05HC7734','KA51ZX0426','KA02JP9018'],T=['09:10','09:40','10:05','10:30','11:15'],H=[2,3,1,4,2];
 var mine=S.bookings.filter(function(b){return b.n===o.l.n}).map(function(b){return [b.ref,b.t,b.h,'New ParkSmart booking']});
 shell('<div class="scr">'+rh('Bookings','🎫')+lc('opres')+mine.concat(P.map(function(p,i){return [p,T[i],H[i],'Reserved']})).map(function(r){var on=S.ci[r[0]];return '<div class="card row"><div class="sp"><div class="b">'+r[0]+'</div><div class="mut">'+r[1]+' · '+r[2]+' h · '+r[3]+'</div></div><button class="btn s'+(on?' g':'')+'" onclick="S.ci[\''+r[0]+'\']=!S.ci[\''+r[0]+'\'];go(\'opres\')">'+(on?'Checked in':'Check in')+'</button></div>'}).join('')+'</div>',1)},
oppay:function(){var o=ost(),D=['Mon','Tue','Wed','Thu','Fri','Sat','Today'],M=[.82,.9,.95,1,1.12,1.25,1],tot=0;
 var rows=D.map(function(d,i){var v=Math.round(o.net*M[i]);if(i<6)tot+=v;return '<div class="tot"><span>'+d+'</span><span>'+rup(v)+' <span class="mut">'+(i<6?'Paid':'Pending T+1')+'</span></span></div>'}).join('');
 var sv=Math.round(o.gross*7*.04-3000/4.3);
 shell('<div class="scr">'+rh('Payouts','💰')+lc('oppay')+'<div class="card hero"><div class="mut">Paid this week</div><div style="font-size:28px;font-weight:800">'+rup(tot)+'</div></div><div class="card">'+rows+'</div>'+
 '<div class="card"><div class="tot"><span>Commission paid (est. week)</span><b>'+rup(o.gross*7*COM())+'</b></div><div class="mut">'+(S.pro?'Pro is on: 4 points lower commission.':sv>0?'ParkSmart Pro would save about '+rup(sv)+' a week after its fee.':'Pro does not pay back at this volume yet.')+'</div></div></div>',1)},
opset:function(){var o=ost();
 shell('<div class="scr">'+rh('Pricing','⚙️')+lc('opset')+'<div class="card"><h2>'+o.l.n+'</h2>'+stp('Hourly rate','₹'+o.br,'rate(-5)','rate(5)')+'<div class="mut">Peak tip: at ₹'+Math.round(o.br*1.2)+'/h in the 6–9 PM rush you could earn about '+rup(Math.round(o.net*.12))+' more a day. Riders see your price live.</div></div>'+
 '<div class="card'+(S.pro?' sel':'')+'"><div class="b">ParkSmart Pro · ₹3,000/mo</div><div class="mut">Live availability sensors, analytics and 4 points lower commission.</div><div style="height:8px"></div><button class="btn'+(S.pro?' o':'')+'" onclick="S.pro=!S.pro;save();go(\'opset\')">'+(S.pro?'Cancel Pro':'Upgrade to Pro')+'</button></div>'+
 '<div class="card"><div class="tot"><span>Without ParkSmart (est.)</span><span>'+rup(Math.round(o.gross/1.18))+'</span></div><div class="tot b"><span>With ParkSmart (gross)</span><span class="lo">'+rup(o.gross)+'</span></div><div class="mut">Assumes about 18% higher utilisation, to be validated in the pilot.</div></div></div>',1)},
plat:function(){var i=S.yr-1,Y=[[.25,3.75,.8,5.7],[2,30,7,6.5],[8,120,28.4,1.6]][i],rv=[[.7,.05,.05,0],[5.6,.6,.5,.3],[22.4,2.5,2.5,1]][i];
 shell('<div class="scr">'+rh('Overview','📈')+'<div class="chips">'+[1,2,3].map(function(y){return '<button class="pill'+(S.yr===y?' on':'')+'" onclick="S.yr='+y+';go(\'plat\')">Year '+y+'</button>'}).join('')+'</div>'+
 '<div class="stat"><div>Bookings<br><b>'+Y[0]+' M</b></div><div>GMV<br><b>₹'+Y[1]+' Cr</b></div><div>Revenue<br><b>₹'+Y[2]+' Cr</b></div></div>'+
 '<div class="card"><h2>Revenue mix (₹ Cr)</h2>'+bars(rv,['Fees','SaaS','Ads','Corp'])+'</div>'+
 '<div class="card"><div class="tot"><span>EBITDA (base case)</span><b class="hi">−₹'+Y[3]+' Cr</b></div><div class="mut">Break-even targeted early in Year 4. From the business plan assumptions.</div></div></div>',1)},
admkt:function(){
 shell('<div class="scr">'+rh('Market','🗺️')+'<h2>Parking supply (Bengaluru)</h2>'+LOTS.map(function(l){var cap=CAP[l.id];return '<div class="card row"><i class="dot" style="background:'+COL[l.st]+'"></i><div class="sp"><div class="b">'+l.n+'</div><div class="mut">'+Math.round((cap-l.sp)/cap*100)+'% full · ₹'+l.r+'/h</div></div><b>'+l.st+'</b></div>'}).join('')+
 '<div class="card"><h2>Operator onboarding</h2>'+bars([120,96,74],['Leads','Verified','Live'])+'</div>'+
 '<div class="card"><h2>Support queue</h2><div class="tot"><span>Refund requests</span><b>6</b></div><div class="tot"><span>Availability mismatches</span><b>3</b></div><div class="tot"><span>Payout queries</span><b>2</b></div></div>'+
 '<div class="card mut">Next cities: Hyderabad, Pune (planned, Year 2).</div></div>',1)},
admrev:function(){var x=sp({pf:150,mf:0,fee:S.fee}),mine=S.bookings.reduce(function(a,b){return a+sp(b).pl},0);
 shell('<div class="scr">'+rh('Revenue','💵')+'<div class="card"><h2>Marketplace pricing</h2>'+stp('Commission',Math.round(S.com*100)+'%','S.com=Math.max(.08,Math.round((S.com-.01)*100)/100);save();go(\'admrev\')','S.com=Math.min(.15,Math.round((S.com+.01)*100)/100);save();go(\'admrev\')')+stp('Platform fee','₹'+S.fee,'S.fee=Math.max(0,S.fee-5);save();go(\'admrev\')','S.fee=Math.min(20,S.fee+5);save();go(\'admrev\')')+'<div class="mut">Changes apply to every booking in this prototype, including riders\' receipts.</div></div>'+
 '<div class="card"><h2>One ₹150 booking</h2>'+split(x)+'</div><div class="card"><div class="tot"><span>ParkSmart earned from your bookings</span><b>'+rup(mine)+'</b></div></div></div>',1)},
city:function(){var n=S.tp,co=Math.round(n*1.4*365/1000),tk=(n*METRO*365/1e7).toFixed(1);
 shell('<div class="scr">'+rh('Impact','🌿')+'<div class="mut">Park &amp; Ride trips per day</div><div class="chips">'+[1000,5000,10000,25000].map(function(x){return '<button class="pill'+(S.tp===x?' on':'')+'" onclick="S.tp='+x+';go(\'city\')">'+x.toLocaleString('en-IN')+'</button>'}).join('')+'</div>'+
 '<div class="stat"><div>Cars off core roads<br><b>'+n.toLocaleString('en-IN')+'/day</b></div><div>CO₂ saved<br><b>'+co+' t/yr</b></div></div><div class="stat"><div>Metro ticket revenue<br><b>₹'+tk+' Cr/yr</b></div><div>Time saved<br><b>'+Math.round(n*8/60).toLocaleString('en-IN')+' h/day</b></div></div>'+
 '<div class="card mut">Estimates use ₹'+METRO+' per metro leg, 1.4 kg CO₂ and 8 minutes saved per trip.</div>'+
 '<div class="card"><div class="tot"><span>Prototype trips: CO₂ saved</span><b>'+S.co2.toFixed(1)+' kg</b></div><div class="tot"><span>Prototype metro fares</span><b>'+rup(S.bookings.reduce(function(a,b){return a+(b.mf||0)},0))+'</b></div></div></div>',1)},
ctcor:function(){var St=[['MG Road',.34],['Indiranagar',.26],['Baiyappanahalli',.22],['Trinity',.18]];
 shell('<div class="scr">'+rh('Corridors','🚇')+'<div class="mut">Purple Line stations, at '+S.tp.toLocaleString('en-IN')+' P&amp;R trips/day (set in Impact)</div>'+St.map(function(x){var n=Math.round(S.tp*x[1]);return '<div class="card"><div class="tot b"><span>'+x[0]+'</span><span>'+n.toLocaleString('en-IN')+' trips</span></div><div class="bar"><i style="width:'+Math.round(x[1]*250)+'%"></i></div><div class="mut">Fare revenue '+rup(n*METRO)+'/day</div></div>'}).join('')+'<div class="mut">Station shares are illustrative.</div></div>',1)},
mer:function(){var b=S.bud,im=Math.round(b/80*1000),tp=Math.round(im*.03),rd=Math.round(tp*.25),sl=rd*250;
 shell('<div class="scr">'+rh('Campaign','📣')+'<div class="card"><div class="b">☕ Brew &amp; Co · '+S.disc+'% off after parking</div><div class="mut">'+(S.moff?'Live: shown to commuters on their journey screen.':'Paused.')+'</div></div>'+
 '<div class="card">'+stp('Daily budget','₹'+b,'S.bud=Math.max(100,S.bud-100);go(\'mer\')','S.bud=Math.min(2000,S.bud+100);go(\'mer\')')+'<div class="mut">₹80 per 1,000 views.</div></div>'+
 '<div class="stat"><div>Views<br><b>'+im.toLocaleString('en-IN')+'</b></div><div>Taps<br><b>'+tp+'</b></div><div>Redeemed<br><b>'+rd+'</b></div></div>'+
 '<div class="card"><div class="tot"><span>Est. sales (₹250 bill)</span><b>'+rup(sl)+'</b></div><div class="tot"><span>Return on ad spend</span><b class="lo">'+(sl/b).toFixed(1)+'x</b></div><div class="mut">Illustrative rates: 3% tap, 25% redeem.</div></div></div>',1)},
merof:function(){
 shell('<div class="scr">'+rh('Offers','🏷️')+'<div class="card'+(S.moff?' sel':'')+'"><div class="b">☕ Brew &amp; Co</div><div class="mut">Offer shown on riders\' journey screens.</div><div style="height:8px"></div>'+stp('Discount',S.disc+'%','S.disc=Math.max(5,S.disc-5);save();go(\'merof\')','S.disc=Math.min(30,S.disc+5);save();go(\'merof\')')+'<button class="btn'+(S.moff?' o':' g')+'" onclick="S.moff=!S.moff;save();go(\'merof\')">'+(S.moff?'Pause offer':'Resume offer')+'</button></div>'+
 '<h2>Recent redemptions</h2>'+S.bookings.slice(0,3).map(function(b){return '<div class="card row"><div class="sp"><div class="b">Ref '+b.ref+'</div><div class="mut">Offer shown after parking at '+b.n+'</div></div></div>'}).join('')+(S.bookings.length?'':'<div class="card mut">No redemptions yet. Make a booking as a rider to see it here.</div>')+'</div>',1)},
hub:function(){var HS=[['Koramangala 5th Block','6–9 PM','1.8×','city'],['MG Road / Brigade Rd','8–11 PM','1.6×','city'],['Manyata Tech Park','5–8 PM','1.5×','metro']];
 var sp=S.bookings.reduce(function(a,b){return a+b.p},0),net=S.earn-sp;
 shell('<div class="scr">'+head('Driver Hub 🚖','home')+
 '<div class="card'+(S.pass?' sel':'')+'"><div class="b">Day Pass · ₹149</div><div class="mut">'+(S.pass?'Active: ₹0 platform fee on every booking.':'₹0 platform fee on every booking. Driver rates (15% off) already apply.')+'</div><div style="height:8px"></div><button class="btn '+(S.pass?'o':'g')+'" onclick="S.pass=!S.pass;save();go(\'hub\')">'+(S.pass?'Turn off':'Buy Day Pass')+'</button></div>'+
 '<h2>Demand hotspots tonight</h2>'+HS.map(function(h){var l=lot(h[3]);return '<div class="card row"><span class="ico" style="background:#fde7c8">🔥</span><div class="sp"><div class="b">'+h[0]+'</div><div class="mut">'+h[1]+' · surge '+h[2]+' · wait at '+l.n+', ₹'+l.r+'/h</div></div><button class="btn s" onclick="S.lot=\''+h[3]+'\';S.opt=\''+(h[3]==='city'?'drive':'pr')+'\';S.hrs=1;S.bk=\'hub\';go(\'booking\')">Wait here</button></div>'}).join('')+
 '<div class="card"><h2>Profit meter</h2><div class="tot"><span>Earnings today ₹</span><input type="number" min="0" inputmode="numeric" aria-label="Earnings today" value="'+(S.earn||'')+'" placeholder="0" style="width:110px" onchange="S.earn=+this.value||0;save();go(\'hub\')"></div><div class="tot"><span>Parking spend</span><b>₹'+sp+'</b></div><div class="tot b"><span>Net</span><span class="'+(net<0?'hi':'lo')+'">₹'+net+'</span></div>'+(S.earn>0?'<div class="mut">Parking is '+Math.round(sp/S.earn*100)+'% of your earnings'+(sp/S.earn>.15?'. Try the Day Pass or a cheaper lot.':'.')+'</div>':'')+'</div>'+
 '<div class="row"><button class="btn o" onclick="S.cat=\'rest\';go(\'map\')">🚻 Break spots</button><button class="btn o" onclick="S.cat=\'ev\';go(\'map\')">⚡ Charging</button></div></div>',1)},
rewards:function(){var lv=Math.floor(S.pts/100),nm=['Newbie','Metro Mate','Traffic Dodger','City Legend'][Math.min(lv,3)];
 var lb=[['Aarav',420],['Meera',310],['You',S.pts],['Kabir',150]].sort(function(a,b){return b[1]-a[1]});
 var bd=[['🚀','First trip',S.pts>0],['🌱','5 kg CO₂',S.co2>=5],['🔥','3-day streak',S.streak>=3]];
 shell('<div class="scr"><h1>Rewards 🏆</h1><div class="card hero"><div class="b" style="font-size:18px">Level '+(lv+1)+' · '+nm+'</div><div class="mut">'+(100-S.pts%100)+' pts to next level</div><div style="height:8px"></div><div class="bar"><i style="width:'+(S.pts%100)+'%"></i></div></div>'+
 '<div class="stat"><div>🔥<br><b>'+S.streak+'</b><br>day streak</div><div>⭐<br><b>'+S.pts+'</b><br>points</div><div>🌱<br><b>'+S.co2.toFixed(1)+' kg</b><br>CO₂ saved (est.)</div></div>'+
 '<div class="row">'+bd.map(function(b){return '<div class="bdg'+(b[2]?'':' off')+'"><b>'+b[0]+'</b>'+b[1]+'</div>'}).join('')+'</div>'+
 '<div class="card"><h2>Leaderboard</h2>'+lb.map(function(x,i){return '<div class="tot"'+(x[0]==='You'?' style="font-weight:800;color:var(--pri)"':'')+'><span>'+(i+1)+'. '+x[0]+'</span><span>'+x[1]+' pts</span></div>'}).join('')+'</div>'+
 '<div class="card"><div class="b">Invite friends, get ₹50</div><div class="mut">Your code: <b>SMART50</b></div><div style="height:8px"></div><button class="btn" onclick="shr(\'Park smarter with me on ParkSmart 🅿️ Use code SMART50 for ₹50 off your first booking.\')">📤 Share code</button></div>'+
 '<div class="mut">Metro and bus trips earn the most points. Driving earns the least.</div></div>',1)},
profile:function(){var P={commuter:'Commuter',driver:'Cab driver',genz:'Gen Z',owner:'Parking owner'};
 shell('<div class="scr"><h1>Profile</h1><div class="card row"><span class="ico">👤</span><div><div class="b">'+S.user.name+'</div><div class="mut">'+P[S.per]+' · '+S.veh.toUpperCase()+'</div><div class="mut">Pay with '+S.pay+' · '+S.bookings.length+' booking(s)</div></div></div>'+
 '<h2>Language</h2><div class="chips">'+[['en','English'],['kn','ಕನ್ನಡ'],['hi','हिन्दी']].map(function(x){return '<button class="pill'+(S.lang===x[0]?' on':'')+'" onclick="S.lang=\''+x[0]+'\';save();go(\'profile\')">'+x[1]+'</button>'}).join('')+'</div>'+
 '<div class="card row" tabindex="0" onclick="S.stu=!S.stu;save();go(\'profile\')"><span class="ico">🎓</span><div class="sp"><div class="b">Student pass</div><div class="mut">10% off parking with a valid student ID</div></div><b>'+(S.stu?'ON':'OFF')+'</b></div>'+
 '<button class="btn" style="background:var(--red)" onclick="go(\'lo\')">Log out</button><div class="mut">Prototype with simulated data. No payments are processed.</div></div>',1)}
};
function COM(){return S.pro?S.com-.04:S.com}
function rup(n){return '₹'+(Math.round(n*10)/10).toLocaleString('en-IN')}
function sp(b){var pf=b.pf||b.p-10,mf=b.mf||0,fe=b.fee==null?10:b.fee,tot=pf+mf+fe,gw=Math.round(tot*.1)/10,cm=Math.round(pf*COM()*10)/10;return {tot:tot,op:Math.round((pf-cm)*10)/10,tr:mf,gw:gw,pl:Math.round((cm+fe-gw)*10)/10}}
function split(x){return [['🅿️ Parking operator',x.op],['🚇 Transit (BMRCL)',x.tr],['📍 ParkSmart (net)',x.pl],['💳 Payment network',x.gw]].filter(function(r){return r[1]>0}).map(function(r){return '<div class="tot"><span>'+r[0]+'</span><b>'+rup(r[1])+'</b></div>'}).join('')}
function wg(b,o){var h='';if(b&&o.k!=='pt'){var x=sp(b);h='<div class="card"><h2>Where your '+rup(x.tot)+' goes</h2>'+split(x)+'<div class="mut">Operators keep '+Math.round((1-COM())*100)+'% of the parking fee. All fees are shown upfront.</div></div>'}
 return h+(S.moff?'<div class="card" style="border-style:dashed"><span class="tag" style="background:var(--amb)">Sponsored</span><div class="b">☕ Brew &amp; Co · '+S.disc+'% off</div><div class="mut">2 min from your destination. Show your booking ref at the counter.</div></div>':'')}
function bars(v,lab){var m=Math.max.apply(null,v)||1,w=300/v.length;return '<svg viewBox="0 0 300 100" style="width:100%" role="img" aria-label="Chart">'+v.map(function(x,i){var h=Math.max(2,x/m*70);return '<rect x="'+(i*w+6)+'" y="'+(80-h)+'" width="'+(w-12)+'" height="'+h+'" rx="4" fill="var(--pri2)"/><text x="'+(i*w+w/2)+'" y="95" text-anchor="middle" font-size="10" fill="var(--mut)">'+lab[i]+'</text>'}).join('')+'</svg>'}
function sbtn(){return '<button class="btn" onclick="go(\'ops\')">🅿️ Parking operators near you</button><button class="lnk" onclick="go(\'onb1\')">Change who I am or what I need</button>'}
function rate(d){var id=S.ol;S.rb[id]=Math.max(10,(S.rb[id]||lot(id).b0)+d);save();go('opset')}
var RN={operator:'Parking operator',admin:'ParkSmart team',city:'Transit & city',merchant:'Local merchant'};
var RT={operator:[['mylist','🅿️','Listings'],['op','📊','Today'],['opres','🎫','Bookings'],['oppay','💰','Payouts'],['opset','⚙️','Pricing']],admin:[['plat','📈','Overview'],['admkt','🗺️','Market'],['admrev','💵','Revenue']],city:[['city','🌿','Impact'],['ctcor','🚇','Corridors']],merchant:[['mer','📣','Campaign'],['merof','🏷️','Offers']]};
var ROLES=[['rider','commuter','🧑‍💼','Commuter','Find parking, skip traffic, save time and money.'],['rider','driver','🚖','Cab driver','Cheap waiting spots, Day Pass, profit meter.'],['rider','genz','🎧','Gen Z','Streaks, points, split bills with friends.'],['operator',0,'🅿️','Parking operator','Run your lot, set prices, get paid T+1.'],['merchant',0,'☕','Local merchant','Reach commuters who are parked nearby.'],['city',0,'🚇','Transit & city','Ridership, ticket revenue, congestion and CO₂.'],['admin',0,'📍','ParkSmart team','Run the marketplace, set fees, track revenue.']];
var HOME={rider:'home',operator:'mylist',admin:'plat',city:'city',merchant:'mer'};
function pick(i){var r=ROLES[i];S.role=r[0];if(r[1])S.per=r[1];S.tab=HOME[r[0]];save();go(S.tab)}
function rh(t,ic){return '<div class="top"><span class="ico" style="background:var(--pri);color:#fff">'+ic+'</span><div class="sp"><div>'+t+'</div><div class="mut" style="font-weight:500">'+RN[S.role]+'</div></div><button class="btn s o" onclick="go(\'lo\')">Log out</button></div>'}
function lc(b){return '<div class="chips" style="flex-wrap:wrap">'+LOTS.filter(function(x){return S.per!=='owner'||x.mine}).map(function(x){return '<button class="pill'+(x.id===S.ol?' on':'')+'" style="flex:none;padding:8px 10px" onclick="S.ol=\''+x.id+'\';go(\''+b+'\')">'+x.n.split(' ')[0]+'</button>'}).join('')+'</div>'}
function ost(){var id=ownFix(),l=lot(id),br=S.rb[id]||l.b0,cap=CAP[id],occ=Math.round((cap-l.sp)/cap*100),ses=(cap-l.sp)*2,gross=ses*2*br;return {l:l,br:br,occ:occ,ses:ses,gross:gross,net:Math.round(gross*(1-COM()))}}
function stp(lab,v,dn,up){return '<div class="tot" style="align-items:center"><span>'+lab+'</span><div class="stp"><button aria-label="Less" onclick="'+dn+'">−</button><b>'+v+'</b><button aria-label="More" onclick="'+up+'">+</button></div></div>'}
var LST={};
function mount(){LOTS=LOTS.filter(function(l){return !l.mine});OPS=OPS.filter(function(o){return !o.mine});
 S.mine.forEach(function(m){LOTS.push({id:m.id,n:m.n,r:m.r,b0:m.r,sp:m.sp,km:m.km,st:'Available',x:m.x,y:m.y,a:m.a.slice(),mine:true});CAP[m.id]=m.sp;if(m.pr)PRS[m.id]=1;else delete PRS[m.id];
  var oid='o_'+S.user.id,o=OPS.filter(function(x){return x.id===oid})[0];if(!o){o={id:oid,n:m.biz,r:0,rv:0,t:'New operator',lots:[],mine:true};OPS.push(o)}o.lots.push(m.id)})}
function ownFix(){if(S.per==='owner'&&S.mine.length){var l=lot(S.ol);if(!(l&&l.mine))S.ol=S.mine[0].id}return S.ol}
function lstOpen(){LST={n:'',biz:S.user.name,area:'',sp:20,r:50,a:[],pr:false,err:''};go('lst')}
function onbNext(){if(S.per==='owner'){S.role='operator';S.onb=true;S.tab='mylist';save();if(S.mine.length)go('mylist');else lstOpen()}else{S.role='rider';go('onb2')}}
function LSn(k,d){LST[k]=Math.max(k==='r'?10:5,LST[k]+d);go('lst')}
function LSt(a){var i=LST.a.indexOf(a);if(i>-1)LST.a.splice(i,1);else LST.a.push(a);go('lst')}
function lsub(){var g=LST;function bad(m){g.err=m;go('lst')}
 if(!g.n.trim())return bad('Enter a name for your parking.');if(!g.area.trim())return bad('Enter the area or address.');
 var id='u'+Date.now().toString(36);S.mine.push({id:id,n:g.n.trim(),biz:g.biz.trim()||S.user.name,area:g.area.trim(),r:g.r,sp:g.sp,km:+(1+Math.random()*3).toFixed(1),x:40+Math.round(Math.random()*260),y:50+Math.round(Math.random()*150),a:g.a.slice(),pr:g.pr});
 S.ol=id;mount();save();toast('Listing submitted');go('mylist')}
function mupd(i,k,d){var m=S.mine[i];m[k]=Math.max(k==='r'?10:5,m[k]+d);if(k==='r')delete S.rb[m.id];mount();save();go('mylist')}
function mdel(i){S.mine.splice(i,1);mount();save();go('mylist')}
function lf(k,ph){return '<input aria-label="'+ph+'" placeholder="'+ph+'" value="'+String(LST[k]).replace(/"/g,'&quot;')+'" oninput="LST.'+k+'=this.value">'}
function tsv(k,b){var i=S.svc.indexOf(k);if(i>-1)S.svc.splice(i,1);else S.svc.push(k);save();go(b)}
function lotMatch(l){var m=[];S.svc.forEach(function(k){if(k==='pr'&&PRS[l.id])m.push('Park & Ride');if(k==='ev'&&l.a.indexOf('ev')>-1)m.push('EV');if(k==='cov'&&l.a.indexOf('cov')>-1)m.push('Covered');if(k==='h24'&&l.a.indexOf('24x')>-1)m.push('24x7');if(k==='rest'&&l.a.indexOf('rest')>-1)m.push('Restroom')});return m}
function uniq(a){return a.filter(function(x,i){return a.indexOf(x)===i})}
function opList(){var f=S.svc.some(function(k){return k!=='park'&&k!=='pt'});
 return OPS.map(function(o){var ls=o.lots.map(lot),ms=ls.map(lotMatch);
  return {o:o,ls:ls,score:Math.max.apply(null,ms.map(function(m){return m.length})),min:Math.min.apply(null,ls.map(function(l){return l.r})),km:Math.min.apply(null,ls.map(function(l){return l.km})),sp:ls.reduce(function(a,l){return a+l.sp},0),tags:uniq([].concat.apply([],ls.map(function(l){return l.a}))),pr:ls.some(function(l){return PRS[l.id]}),mt:uniq([].concat.apply([],ms))}})
 .filter(function(x){return !f||x.score>0}).sort(function(a,b){return b.score-a.score||({near:a.km-b.km,cheap:a.min-b.min,top:b.o.r-a.o.r})[S.sort]})}
function chv(b){return '<div class="chips">'+[['car','🚗 Car'],['bike','🏍️ Bike'],['ev','⚡ EV']].map(function(x){return '<button class="pill'+(S.veh===x[0]?' on':'')+'" onclick="S.veh=\''+x[0]+'\';save();go(\''+b+'\')">'+x[1]+'</button>'}).join('')+'</div>'}
function per(b){function ch(a,k){return '<div class="chips">'+a.map(function(x){return '<button class="pill'+(S[k]===x[0]?' on':'')+'" onclick="S.'+k+'=\''+x[0]+'\';save();go(\''+b+'\')">'+x[1]+'</button>'}).join('')+'</div>'}
 return ch([['commuter','🧑‍💼 Commuter'],['driver','🚖 Driver'],['genz','🎧 Gen Z']],'per')+ch([['car','🚗 Car'],['bike','🏍️ Bike'],['ev','⚡ EV']],'veh')}
function cats(){return '<div class="chips" style="flex-wrap:wrap">'+[['all','All'],['ev','⚡ EV'],['cov','🏠 Covered'],['24x','🌙 24x7'],['rest','🚻 Restroom']].map(function(c){return '<button class="pill" style="flex:none;padding:8px 12px'+(S.cat===c[0]?';background:var(--pri);color:#fff':'')+'" onclick="S.cat=\''+c[0]+'\';go(\'map\')">'+c[1]+'</button>'}).join('')+'</div>'}
function pcard(){if(S.per==='driver')return '<div class="card" style="border-color:var(--amb)"><div class="b">🚖 Driver Hub</div><div class="mut">Cheap waiting spots near demand, a Day Pass and a daily profit meter.</div><div style="height:8px"></div><button class="btn g" onclick="S.tab=\'hub\';go(\'hub\')">Open Driver Hub</button></div>';
 if(S.per==='genz')return '<div class="card hero"><div class="b">🔥 '+S.streak+'-day streak · ⭐ '+S.pts+' pts</div><div class="mut">Take the metro, earn points, cut CO₂. Split parking with friends at checkout.</div><div style="height:8px"></div><button class="btn" style="background:#fff;color:#2a3fb5" onclick="S.tab=\'rewards\';go(\'rewards\')">See rewards</button></div>';return ''}
function qr(r){var h=0,i,c='';for(i=0;i<r.length;i++)h=(h*31+r.charCodeAt(i))>>>0;for(i=0;i<49;i++){h=(h*1103515245+12345)>>>0;if(h>>>16&1)c+='<rect x="'+(i%7)+'" y="'+Math.floor(i/7)+'" width="1" height="1"/>'}return '<svg viewBox="0 0 7 7" width="52" height="52" fill="var(--ink)" role="img" aria-label="Entry pass">'+c+'</svg>'}
function shr(t){t=t||('Parking sorted with ParkSmart 📍 '+cur().n+' to '+S.dest+' in '+cur().m+' min. Use code SMART50 for ₹50 off.');try{if(navigator.share){navigator.share({text:t}).catch(function(){});return}navigator.clipboard.writeText(t).then(function(){toast('Copied!')},function(){toast('Could not copy')})}catch(e){toast('Sharing not available')}}
function award(k){S.pts+=PT[k]||5;S.co2+={pr:1.4,pt:2.1,drive:0}[k]||0;var d=new Date().toDateString();if(S.last!==d){S.streak=S.last===new Date(Date.now()-864e5).toDateString()?S.streak+1:1;S.last=d}}
function ext(i){var b=S.bookings[i],l=LOTS.filter(function(x){return x.n===b.n})[0];b.h++;b.p+=l.r;b.pf=(b.pf||b.p-l.r-10)+l.r;save();toast('Extended 1 h · ₹'+l.r);go('bookings')}
function choose(){var o=cur();S.bk='rec';if(o.k==='pt'){S.ref='';award('pt');save();go('journey')}else{S.lot=o.k==='drive'?'city':'metro';go('booking')}}
function confirmBooking(){var l=lot(S.lot),o=cur();S.ref='PS'+Math.floor(100000+Math.random()*900000);
 S.bookings.unshift({n:l.n,t:S.arr,h:S.hrs,p:l.r*S.hrs+(S.opt==='pr'?METRO:0)+FEE,pf:l.r*S.hrs,mf:S.opt==='pr'?METRO:0,fee:FEE,pay:S.pay,ref:S.ref});award(S.opt);S.split=1;save();toast('Payment successful · +'+(PT[S.opt]||5)+' pts');setTimeout(function(){go('journey')},700)}
mount();S.tab=S.role&&S.role!=='rider'?HOME[S.role]:'ops';go(!S.user?'login':S.role&&S.role!=='rider'?HOME[S.role]:S.onb?'ops':'onb1');
