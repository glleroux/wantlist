import { Discojs } from "discojs";

const token = process.env.REACT_APP_DISCOGS_PERSONAL_TOKEN;

const client = new Discojs({
  userAgent: "rbwantlist/1.0",
  userToken: token
});

const getUserReleases = async (username, data, page = 1) => {
    data = data || [];
    const response = await client.getWantlistForUser(username, {
      page
    });
    const releases = response.wants;
    data = data.concat(releases);
    const wantlistPages = response.pagination.pages;
    const currentPage = response.pagination.page;
    if (currentPage === wantlistPages) {
      return data;
    }
    return await getUserReleases(username, data, page + 1);
  };
  
  export default getUserReleases;