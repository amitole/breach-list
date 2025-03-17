// Define the structure of a breach data item
export interface Breach {
  id: string;
  Name: string;
  Title: string;
  BreachDate: string;
  Description: string;
  LogoPath: string;
  ModifiedDate: string;
  PwnCount: number;
  Domain: string;
  DataClasses: string[];
}

// Fetch breach data from the API
export async function fetchBreaches(offset: number = 0): Promise<Breach[]> {
  try {
    // Use our proxy API route instead of the external API directly
    const response = await fetch(`/api/breaches?offset=${offset}`);

    console.log(response);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching breach data:", error);
    throw error;
  }
}
