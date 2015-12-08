import {get, post} from "jquery";

let API = {
  saveBookmark(newBookmark) {
    return post("/api/links", newBookmark);
  },
  getAllBookmarks() {
    // return get("/api/links");
    return post("/graphql", {
      query: `
        {
          bookmarks: allLinks {
            id
            title
            url
          }
        }
      `
    })
  }
};

export default API;
