let Next_page_video_link;
let submit_button = document.querySelector("#submit");
submit_button.addEventListener("click", search_anime);

let anime = "naruto";
let url = `https://kitsu.io/api/edge/anime?filter[text]=${anime}`;
localStorage.clear()


fetch(url)
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    create_groupOf_videos(data.data);

    console.log(data);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

// fetch("https://kitsu.io/api/edge/anime/11/streaming-links")
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {

//         console.log(data)
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });

// fetch("https://kitsu.io/api/edge/anime?filter%5Btext%5D=naruto&page%5Bnumber%5D=1&page%5Bsize%5D=10")
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {

//         console.log(data)
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });

// let custome_api = [
//     {
//         title: "jujutsu kaisen season 1",
//         channel_name: "Gege Akutami",
//         thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPX-YOCiHWiR1FQ3Wr9m8gITiYqw-dz8MFQA&usqp=CAU",
//         logo: "",
//         views: "",
//         upload: ""
//     },
//     {
//         title: "jujutsu kaisen season 2",
//         channel_name: "Gege Akutami",
//     },
// ]

function search_anime(params) {
  let anime_name = document.querySelector("#search").value;
  anime = `${anime_name}`;
  url = `https://kitsu.io/api/edge/anime?filter[text]=${anime}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      let child = document.querySelector(".container");
      let parent = document.querySelector("body");
      child.remove();
      let child2 = document.createElement("div");
      child2.classList.add("container");
      parent.append(child2);

      create_groupOf_videos(data.data);

      console.log(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function create_groupOf_videos(data) {
  for (let i = 0; i < data.length; i++) {
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

