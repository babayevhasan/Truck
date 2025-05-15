
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1", "#FF9DA7", "#9C755F", "#BAB0AC"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontWeight: 600, fontSize: 14 }}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        style={{ fontSize: 12 }}
      >{`${value} items`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        style={{ fontSize: 12 }}
      >{`(${(percent * 100).toFixed(1)}%)`}</text>
    </g>
  );
};

export default class StatusChart extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { data } = this.props;

    const statusCount = data.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(statusCount).map(([key, value], index) => ({
      name: key,
      value,
      fill: COLORS[index % COLORS.length],
    }));

    const totalValue = data.length;

    return (
      <div style={{ 
        width: "100%", 
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        color: "#333"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "5px 0px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: 20,
          textAlign: "center"
        }}>
          <div style={{
            fontSize: 12,
            color: "#666",
            marginBottom: 4
          }}>Total Items</div>
          <div style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#2c3e50"
          }}>{totalValue}</div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 5
        }}>
          <div style={{ 
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <div style={{ 
              width: "100%", 
              height: 260,
              position: 'relative'
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    onMouseEnter={this.onPieEnter}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ 
            background: "#fff",
            borderRadius: 12,
            padding: "16px 0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
              padding: "0 16px"
            }}>
              {chartData.map((entry) => (
                <div key={entry.name} style={{
                  background: "#f9fafc",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                  }
                }}
                onMouseEnter={() => this.onPieEnter(null, chartData.findIndex(d => d.name === entry.name))}
                >
                  <div style={{
                    width: 12,
                    height: 12,
                    backgroundColor: entry.fill,
                    marginRight: 12,
                    flexShrink: 0
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: 13, 
                      color: "#666",
                      marginBottom: 4
                    }}>{entry.name}</div>
                    <div style={{ 
                      fontSize: 18, 
                      fontWeight: 600,
                      color: "#2c3e50",
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      {entry.value}
                    </div>
                    <div style={{ 
                      fontSize: 12, 
                      color: "#7f8c8d"
                    }}>
                      {Math.round((entry.value / totalValue) * 100)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}