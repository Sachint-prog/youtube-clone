let url = localStorage.getItem("url");



if (url != null) {



  let parent = document.querySelector(".video_links_container");
  let furl = "https://www.youtube.com/embed/" + url;
  let child = document.createElement("div");
  child.innerHTML = `<iframe width="812" height="457" src="${furl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  parent.append(child);
  
  
  let anime_name = localStorage.getItem("anime_name")
  let anime_id = localStorage.getItem("index")
  let url_fetch = `https://kitsu.io/api/edge/anime?filter[text]=${anime_name}`;
  
  
  fetch(url_fetch)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
  
        console.log(data.data[anime_id]);
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });



}