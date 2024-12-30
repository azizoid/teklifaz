export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch repository details.");
  }
  return response.json();
};
