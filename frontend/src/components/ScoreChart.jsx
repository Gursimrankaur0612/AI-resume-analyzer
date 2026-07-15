import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ScoreChart({ history }) {

  const data = history.map((item) => ({
    date: new Date(item.analyzedAt).toLocaleDateString(),
    score: item.score,
  }));

  return (
    <div className="card shadow-sm border-0 mt-5">

      <div className="card-body">

        <h3 className="fw-bold mb-4">
          Resume Score Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#0d6efd"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ScoreChart;