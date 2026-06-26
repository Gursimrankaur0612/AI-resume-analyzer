import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TopSkillsChart() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/resume/top-missing-skills")
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 const data = {
  labels: skills.slice(0, 5).map((item) => item.skill),

  datasets: [
    {
      label: "Occurrences",

      data: skills.slice(0, 5).map((item) => item.count),

      backgroundColor: [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
        "#6f42c1",
      ],

      borderRadius: 8,
    },
  ],
};
const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },

    title: {
      display: true,
      text: "Top 5 Missing Skills",
      font: {
        size: 18,
      },
    },
  },

  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

  return (
    <div className="card p-4 mt-4">
      <h2 className="text-center mb-4">
  📊 Top Missing Skills
</h2>

      <Bar
  data={data}
  options={options}
/>
    </div>
  );
}

export default TopSkillsChart;