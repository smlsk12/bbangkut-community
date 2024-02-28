// ActivityForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const ActivityForm = ({userId}) => {
    const [actiData, setActiData] = useState([]);

    useEffect(() => {
      const fetchActi = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/my/activity/${userId}`);
            const userData = response.data;
            setActiData(userData);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    fetchActi();
  }, [userId]);

  return (
    <div>
      <h2>게시물</h2>
      <ul>
        {actiData.map(activity => (
          <li key={activity.postid}>
            <span>{activity.title}</span>
            <br />
            <span>{moment(activity.date).format('MM월 DD일')}</span>
          </li>
        ))}
      </ul>
      <h2>댓글</h2>
    </div>
  );
};

export default ActivityForm;