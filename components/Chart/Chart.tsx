import moment from 'moment';
import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function Chart({ data: notes }) {
  const data = useMemo(() => {
    if (!notes.length) {
      return [];
    }

    const sortedNotes = notes.sort((a, b) => a.createdAt - b.createdAt);
    let currentInterval = sortedNotes[0].createdAt;
    const groups = {
      [currentInterval]: 0,
    };

    sortedNotes.forEach(note => {
      const a = groups[currentInterval];
      if (note.createdAt <= currentInterval + 10000) {
        groups[currentInterval] = a + 1;
      } else {
        currentInterval += 10000;
        groups[currentInterval] = a + 1;
      }
    });

    return Object.keys(groups).map(key => ({
      createdAt: moment(+key)
        .format('HH mm ss')
        .replace(/\ /g, ':'),
      count: +groups[key],
    }));
  }, [notes]);

  return (
    <div style={{ width: 750, height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Line
            legendType="square"
            type="linear"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
