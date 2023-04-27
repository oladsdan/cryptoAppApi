import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined } from '@ant-design/icons';

const {Title, Text} = Typography
const {Option} = Select

const CryptoDetails = () => {
  const { coinId } = useParams(); // useParams helps us to use the coinId as parameter
  const [timePeriod, setTimePeriod] = useState('7d') // this is used to distinguished the timeframes for our chats


  console.log(coinId)


  return (
    <div>CryptoDetails {coinId} </div>

  )
}

export default CryptoDetails