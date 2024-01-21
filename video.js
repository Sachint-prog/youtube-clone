let url = localStorage.getItem("url");



if (url != null) {



  let furl = "https://www.youtube.com/embed/" + url;

  let elem_video = document.querySelector("#video_main_screen")
  elem_video.setAttribute("src", furl) 



  // let parent = document.querySelector(".video_links_container");
  // let child = document.createElement("div");
  // child.innerHTML = `<iframe width="812" height="457" src="${furl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  // parent.append(child);
  
  
  let anime_name = localStorage.getItem("anime_name")
  let anime_id = localStorage.getItem("index")
  let url_fetch = `https://kitsu.io/api/edge/anime?filter[text]=${anime_name}`;
  
  
  fetch(url_fetch)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        
        let genre = data.data[anime_id].relationships.genres.links.related
        console.log(data.data[anime_id].attributes)
        let title_c = data.data[anime_id].attributes.abbreviatedTitles[0]
        let description_c = data.data[anime_id].attributes.description
        let start_date_c = data.data[anime_id].attributes.startDate
        let end_date_c = data.data[anime_id].attributes.endDate
        let episode_length_c = data.data[anime_id].attributes.episodeLength
        let episode_count_c = data.data[anime_id].attributes.episodeCount
        let alternate_title_c = data.data[anime_id].attributes.titles
        let status_c = data.data[anime_id].attributes.status
        let show_type_c = data.data[anime_id].attributes.showType

        details(
          title_c,
          description_c,
          start_date_c,
          end_date_c,
          episode_length_c,
          episode_count_c,
          alternate_title_c,
          status_c,
          show_type_c)

        genre_fetch(genre)

        let child = document.querySelector(".container");
        let parent = document.querySelector("body");
        child.remove();
        let child2 = document.createElement("div");
        child2.classList.add("container");
        child2.innerHTML = "<h1>Recommendations</h1>"
        parent.append(child2);

        create_groupOf_videos(data.data);
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });



}


function genre_fetch(url) {
  fetch(url)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        console.log(data)
        let genre_tag = document.querySelector(".genres")
        let genre_content = []
        for (let i = 0; i < data.data.length; i++) {
          genre_content.push(data.data[i].attributes.name)
        }
        console.log(genre_content)
        genre_tag.textContent = "genre: " + genre_content
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
}


function details(
  title_c,
  description_c,
  start_date_c,
  end_date_c,
  episode_length_c,
  episode_count_c,
  alternate_title_c,
  status_c,
  show_type_c) {
  let title = document.querySelector(".title")
  let description = document.querySelector(".description")
  let start_date = document.querySelector(".start_date")
  let end_date = document.querySelector(".end_date")
  let episode_length = document.querySelector(".episode_length")
  let episode_count = document.querySelector(".episode_count")
  let alternate_title = document.querySelector(".alternate_title")
  let status = document.querySelector(".status")
  let show_type = document.querySelector(".show_type")


  title.textContent = title_c
  description.textContent = "description: " + description_c
  start_date.textContent = "start date: " + start_date_c
  end_date.textContent = "end date: " + end_date_c
  episode_length.textContent = "episode length: " + episode_length_c + " minutes"
  episode_count.textContent = "episode count: " + episode_count_c
  status.textContent = "status: " + status_c
  show_type.textContent = "show type: " + show_type_c
  
  alternate_title.textContent = `alternate title: ${alternate_title_c.en}, ${alternate_title_c.en_jp}, ${alternate_title_c.ja_jp}` 
}



function createVideo(
  title,
  thumbnail,
  no_of_episodes,
  upload_time,
  id,
  video_link,
  episodeLength,
  status,
  index
) {
  let parent = document.querySelector(".container");
  let child = document.createElement("div");
  child.classList.add("video_container");
  child.innerHTML = `
                <a href="blank.html" target="_blank" class="video_link" data-href = "${video_link}" id="${index}">
                    <div id="video${id}" class="video" data-time = "20:50"></div>
                </a>
                <div class="details">
                    <div class="logo"></div>
                    <div class="data">
                        <div class="title">${title}</div>
                        <div class="channel_name">episodes: ${no_of_episodes}</div>
                        <div class="meta_data">
                            <div>date: ${upload_time}</div>
                            <div>status: ${status}</div>
                        </div>
                    </div>
                </div>
            `;
  parent.append(child);
  let url1 = `url(${thumbnail})`;
  let video1 = document.getElementById(`video${id}`);
  video1.style.backgroundImage = url1;
  let time = video1.setAttribute("data-time", episodeLength + " minutes");
  console.log(time);
}



function create_groupOf_videos(data) {
  for (let i = 0; i < data.length; i++) {
    let index_i = localStorage.getItem("index")
    if(index_i == i){
      continue
    }
    let title = data[i].attributes.canonicalTitle;
    let thumbnail = data[i].attributes.posterImage.original;
    let no_of_episodes = data[i].attributes.episodeCount;
    let upload_time = data[i].attributes.startDate;
    let id = data[i].id;
    let video_link = data[i].attributes.youtubeVideoId;
    let episodeLength = data[i].attributes.episodeLength;
    let status = data[i].attributes.status;
    let index = i;

    createVideo(
      title,
      thumbnail,
      no_of_episodes,
      upload_time,
      id,
      video_link,
      episodeLength,
      status,
      index
    );
    if (i == data.length - 1) {
      let next_page = document.querySelectorAll(".video_link");
      next_page.forEach((element) => {
        element.addEventListener("click", function () {
          let links_1 = element.getAttribute("data-href");
          let v_index = element.getAttribute("id")
          Next_page_video_link = `<iframe width="812" height="457" src="${links_1}" title="The Last - Naruto the Movie - Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
          console.log(links_1);
          console.log(Next_page_video_link);
          localStorage.setItem("url",links_1)
          localStorage.setItem("anime_name",anime)
          localStorage.setItem("index",v_index)
        });
      });
    }
  }
}
