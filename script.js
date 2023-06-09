const videoCardContainer = document.querySelector(".video-container");


let api_key = "AIzaSyD3DjoHKcvIxObGs9ERmw6VFZxff30r32E";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channels_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch( video_http + new URLSearchParams ({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))

.then(res => res.json())  
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    });
}) 
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
 fetch( channels_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    id: video_data.snippet.channelId
 }))

.then(res => res.json())
.then(data => {
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
})
}

const makeVideoCard =(data) => {
    videoCardContainer.innerHTML +=     `
    <div class="video" onclick="location.href ='https://youtube.com/watch?v=${data.id}'">;
    <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
    <div class="content">
        <img src="${data.channelThumbnail}" alt="" class="channel-icon">
        <div class="info">
          <h4 class="title">${data.snippet.title} </h4>
           <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
     </div>
  </div>

    `;
}

