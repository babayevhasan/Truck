import React, { PureComponent } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#357bf7", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

export default class FromLocationBarChart extends PureComponent {
    render() {
        const { data } = this.props;

        const fromLocationCount = data.reduce((acc, curr) => {
            acc[curr.fromLocation] = (acc[curr.fromLocation] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.entries(fromLocationCount).map(([key, value]) => ({
            name: key,
            value,
        }));

        return (
            <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        barCategoryGap="40%"
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill={COLORS[0]} barSize={35} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}


