export async function getDealerById(sellerId: string) {
  try {
    const response = await fetch(`/api/dealer/${sellerId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dealer data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getDealerById:', error);
    throw error;
  }
}
