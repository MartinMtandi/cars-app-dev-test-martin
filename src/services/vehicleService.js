export const getVehicleById = async (id) => {
  try {
    const response = await fetch(`/api/vehicle/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch vehicle data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
};
