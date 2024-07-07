export const getAllInvoices = async () => {
  try {
    const res = await fetch("/api/getAllInovices");
    if (!res.ok) {
      throw new Error("Fetching error");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
