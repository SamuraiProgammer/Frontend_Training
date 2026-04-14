export default async function handler(req, res) {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl/cron}`);

    const data = await response.json();

    console.log("Cron ran at:", new Date().toISOString(), data);

    res.status(200).json({
      success: true,
      message: "Backend pinged successfully",
      data,
    });
  } catch (error) {
    console.error("Cron error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}