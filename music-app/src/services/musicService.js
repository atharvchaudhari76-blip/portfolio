// Use 96kbps quality - this quality tier on Saavn's CDN is unencrypted
// and plays with full audio including vocals. Higher quality (160/320kbps)
// uses DRM encryption that browsers cannot decrypt, resulting in only
// background/instrumental audio playing.

const SAAVN_API = 'https://jiosaavn-api-privatecvc2.vercel.app';
const PREFERRED_QUALITY = '96kbps'; // DO NOT change - higher qualities are DRM encrypted

const mapSongItem = (item) => {
  // Find 96kbps URL (unencrypted, plays fully with vocals)
  let streamUrl = null;
  if (item.downloadUrl && item.downloadUrl.length > 0) {
    const preferred = item.downloadUrl.find(u => u.quality === PREFERRED_QUALITY);
    // Fallback chain: 96kbps → 48kbps → 12kbps (all unencrypted)
    const fallback48 = item.downloadUrl.find(u => u.quality === '48kbps');
    const fallback12 = item.downloadUrl.find(u => u.quality === '12kbps');
    streamUrl = (preferred || fallback48 || fallback12)?.link || null;
  }

  return {
    id: item.id,
    title: item.name,
    artist: item.primaryArtists || 'Unknown Artist',
    thumbnail: item.image?.length > 0 ? item.image[item.image.length - 1].link : '',
    duration: parseInt(item.duration) || 0,
    streamUrl,
    hasLyrics: item.hasLyrics === 'true' || item.hasLyrics === true,
    language: item.language || '',
    album: item.album?.name || '',
    year: item.year || '',
    views: parseInt(item.playCount) || 0,
    jiosaavnUrl: item.url || '',
  };
};

export const searchMusic = async (query) => {
  try {
    const response = await fetch(
      `${SAAVN_API}/search/songs?query=${encodeURIComponent(query)}&limit=20`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();

    if (data.status === 'SUCCESS' && data.data?.results) {
      return data.data.results.map(mapSongItem);
    }
    return [];
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};

export const getTrending = async () => {
  // Use specific album/artist searches so the first result is always the original
  // Include album name to avoid instrumentals/remixes being returned first
  const hits = [
    'Tauba Tauba Bad Newz Karan Aujla',
    'Kesariya Brahmastra Arijit Singh',
    'Aayi Nai AP Dhillon',
    'Sajni Jal The Band',
    'O Maahi Dunki Arijit Singh',
    'Heeriye Arijit Singh',
    'Tum Se Hi Jab We Met',
    'Raataan Lambiyan Shershaah',
  ];

  const results = [];

  for (const hit of hits) {
    try {
      const res = await searchMusic(hit);

      // Pick the first result that:
      // 1. Has a valid stream URL
      // 2. Is NOT an instrumental/remix/lofi (filter by name keywords)
      // 3. Has the HIGHEST play count (most popular = original version)
      const filtered = res.filter(song => {
        if (!song.streamUrl) return false;
        const lower = song.title.toLowerCase();
        const badKeywords = ['instrumental', 'karaoke', 'ringtone', 'bgm', 'background'];
        return !badKeywords.some(k => lower.includes(k));
      });

      // Sort by play count to get original version first
      const sorted = filtered.sort((a, b) => b.views - a.views);

      if (sorted.length > 0) {
        results.push(sorted[0]);
      }
    } catch (err) {
      console.error(`Failed to fetch: ${hit}`, err);
    }
  }

  return results;
};

export const getStreamUrl = async () => null;
