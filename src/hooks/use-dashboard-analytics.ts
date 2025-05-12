import { useState, useEffect } from "react";

const MOCK_ANALYTICS_DATA = {
  metrics: [
    { name: "Total Users", value: 1250, change: "+12%" },
    { name: "Active Projects", value: 45, change: "+5%" },
    { name: "Revenue", value: "$125,000", change: "+8%" },
    { name: "Conversion Rate", value: "3.2%", change: "+0.5%" }
  ],
  chartData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [100, 200, 300, 400, 500, 600],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Revenue",
        data: [50, 100, 150, 200, 250, 300],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      }
    ]
  }
};

const useDashboardAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(MOCK_ANALYTICS_DATA);
  const [timeframe, setTimeframe] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeframe]);

  return { analyticsData, timeframe, setTimeframe, isLoading };
};

export default useDashboardAnalytics;
