// This file will act as a wrapper for the Discourse REST API.

const DISCOURSE_URL = process.env.NEXT_PUBLIC_DISCOURSE_URL || '';
const API_KEY = process.env.DISCOURSE_API_KEY || '';
const API_USERNAME = process.env.DISCOURSE_API_USERNAME || 'system';

// A helper function to make authenticated requests to the Discourse API.
async function discourseFetch(path: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Api-Key': API_KEY,
    'Api-Username': API_USERNAME,
    ...options.headers,
  };

  try {
    const response = await fetch(`${DISCOURSE_URL}${path}`, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.join(', ') || 'Discourse API request failed');
    }
    return response.json();
  } catch (error) {
    console.error('Discourse API Error:', error);
    throw error;
  }
}

/**
 * Fetches the latest Bytes (topics) from Discourse.
 */
export async function getLatestBytes() {
  // In Discourse, "latest" topics are the main feed.
  // This is a placeholder. The actual implementation will call the Discourse API.
  console.log('Fetching latest bytes...');
  return {
    // Example data structure
    topic_list: {
      topics: [],
    },
  };
  // Example implementation: return discourseFetch('/latest.json');
}

/**
 * Fetches Terets (tags or categories) from Discourse.
 */
export async function getTerets() {
  // This could fetch categories or tags depending on the app's structure.
  console.log('Fetching terets...');
  return {
    // Example data structure
    category_list: {
      categories: [],
    },
  };
  // Example implementation: return discourseFetch('/categories.json');
}

/**
 * Fetches the details of a single Byte (topic) and its posts.
 * @param topicId The ID of the topic to fetch.
 */
export async function getByteDetails(topicId: string | number) {
  console.log(`Fetching details for byte ${topicId}...`);
  return {
    // Example data structure
    id: topicId,
    title: 'Example Byte',
    post_stream: {
      posts: [],
    },
  };
  // Example implementation: return discourseFetch(`/t/${topicId}.json`);
}

/**
 * Fetches a user's profile from Discourse.
 * @param username The username of the user to fetch.
 */
export async function getUserProfile(username: string) {
  console.log(`Fetching profile for user ${username}...`);
  return {
    // Example data structure
    user: {
      username,
      name: 'Example User',
      avatar_template: '',
    },
  };
  // Example implementation: return discourseFetch(`/users/${username}.json`);
}
