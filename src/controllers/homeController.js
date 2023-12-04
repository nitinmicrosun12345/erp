const homeService = require("../services/homeService");
const homeSErvice = require("../middleware/authMiddleware");
const getHomeData = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("userid", userId);
    const userName = await homeService.getUserName(userId);

    const serviceNames = await homeService.getCompanyServices();

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    res.json({ userName, serviceNames, greeting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getHomeData };
