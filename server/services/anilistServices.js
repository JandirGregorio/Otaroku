const query = `
  query ($search: String) { 
    Media (search: $search, type: ANIME) {
      id
      title { romaji english }
      coverImage { large }
      description(asHtml: false)
      siteUrl
      externalLinks { site type url }
      }
    }
`;

const url = 'https://graphql.anilist.co';

const searchAnime = async (title) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { search: title }
    })
  }
  const response = await fetch(url, config);

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`AniList request failed: ${response.status}`);
  }

  const data = await response.json();
  const media = data.data.Media;
  // rest -> id, title, coverImage, description, siteUrl
  const { externalLinks, ...rest } = media
  const streaming = externalLinks.filter((i) => i.type === 'STREAMING');
  return {...rest, streaming};
  
};

module.exports = { searchAnime };
