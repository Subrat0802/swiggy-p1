export const fetchRestaurant = async (req, res) => {
    try {
        const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.698785&lng=75.835513&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
                Accept: "application/json",
            },
        });
        const data = await response.json();
        if (!data) {
            return res.status(400).json({
                message: "Error while fetching restaurants",
                success: false
            });
        }
        res.status(200).json({
            data: data.data.cards,
            message: "All restaurants",
            success: false
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error while fetching restaurants from backend",
            success: false
        });
    }
};
//# sourceMappingURL=fetchReq.js.map