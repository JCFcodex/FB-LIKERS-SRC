const apiUrl="/api/fetchTikTokVideo";let autoNextEnabled=!1,isLoading=!1;async function fetchTikTokVideo(){try{const e=await axios.post(apiUrl);if(200!==e.status)throw new Error("Failed to fetch video");const{videoUrl:t,title:n,region:o,username:d,nickname:i}=e.data,a=document.getElementById("tiktokVideo"),c=document.getElementById("videoTitle"),l=document.getElementById("region"),s=document.getElementById("username"),k=document.getElementById("nickname");a.src=t,c.textContent=n,l.textContent=`Region: ${o}`,s.textContent=`Username: ${d}`,k.textContent=`Nickname: ${i}`,a.addEventListener("loadedmetadata",(()=>{isLoading=!1,document.getElementById("nextButton").disabled=!1})),autoNextEnabled&&a.addEventListener("ended",(()=>{isLoading||fetchAndDisplayTikTokVideo()}))}catch(e){console.error("Error fetching TikTok video:",e),isLoading||fetchAndDisplayTikTokVideo()}}function fetchAndDisplayTikTokVideo(){isLoading=!0,document.getElementById("nextButton").disabled=!0,fetchTikTokVideo()}document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("nextButton"),t=document.getElementById("autoNextButton");e.addEventListener("click",fetchAndDisplayTikTokVideo),t.addEventListener("click",(()=>{autoNextEnabled=!autoNextEnabled,t.textContent="Auto Next: "+(autoNextEnabled?"ON":"OFF"),autoNextEnabled&&!isLoading&&fetchAndDisplayTikTokVideo()})),fetchAndDisplayTikTokVideo()}));
