const $=id=>document.getElementById(id);
const KEY="ayuStudyTrackerV1";
let data=JSON.parse(localStorage.getItem(KEY)||'{"name":"","class":"Class 9","exam":"","target":3,"topics":[]}');

function save(){localStorage.setItem(KEY,JSON.stringify(data));render();}
function today(){return new Date().toISOString().slice(0,10)}

function render(){
  $("studentName").value=data.name||"";
  $("studentClass").value=data.class||"Class 9";
  $("examDate").value=data.exam||"";
  $("targetInput").value=data.target||3;
  $("welcome").textContent=data.name?`Keep going, ${data.name}! Your plan is saved on this device.`:"Add your first topic below.";
  const filter=$("filter").value;
  const visible=data.topics.filter(t=>filter==="all"||(filter==="done"?t.done:!t.done));
  $("topicList").innerHTML=visible.length?visible.map(t=>`
    <div class="topic ${t.done?"done":""}">
      <input class="check" type="checkbox" ${t.done?"checked":""} onchange="toggleTopic('${t.id}')">
      <div><div class="name">${escapeHtml(t.name)}</div><div class="meta">${escapeHtml(t.subject)} • Added ${t.date}</div></div>
      <button class="delete" onclick="deleteTopic('${t.id}')">✕</button>
    </div>`).join(""):`<p>No topics in this filter yet.</p>`;
  const total=data.topics.length, done=data.topics.filter(t=>t.done).length, todayDone=data.topics.filter(t=>t.doneDate===today()).length;
  $("totalCount").textContent=total;$("doneCount").textContent=done;$("progressCount").textContent=total?Math.round(done/total*100)+"%":"0%";$("todayCount").textContent=todayDone;
  const target=data.target||3, pct=Math.min(100,Math.round(todayDone/target*100));
  $("bar").style.width=pct+"%";$("targetText").textContent=`${todayDone} / ${target} completed today`;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
window.toggleTopic=id=>{const t=data.topics.find(x=>x.id===id);if(t){t.done=!t.done;t.doneDate=t.done?today():"";save();}};
window.deleteTopic=id=>{data.topics=data.topics.filter(x=>x.id!==id);save();};
$("saveProfile").onclick=()=>{data.name=$("studentName").value.trim();data.class=$("studentClass").value;data.exam=$("examDate").value;save();};
$("saveTarget").onclick=()=>{data.target=Math.max(1,Number($("targetInput").value)||3);save();};
$("addBtn").onclick=()=>{const name=$("topic").value.trim();if(!name)return;data.topics.push({id:Date.now().toString(),name,subject:$("subject").value,done:false,doneDate:"",date:today()});$("topic").value="";save();};
$("filter").onchange=render;
$("themeBtn").onclick=()=>{document.body.classList.toggle("light");$("themeBtn").textContent=document.body.classList.contains("light")?"🌙 Dark":"☀️ Light";};
render();
