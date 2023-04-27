import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import cryptoImage from '../images/cryptocurrency.png'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const { Text, Title} = Typography
const { option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';


const News = ({simplified}) => {
  const {data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 :12})
 

 if(!cryptoNews?.value) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.value.map((news, idx)=> (
        <Col xs={24} sm={12} lg={8} key={idx}>
          <Card hoverable className='News-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-titie" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || cryptoImage } alt="news" />
              </div>
              <p>
                {news.description >100 
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || cryptoImage} alt="news"/>
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>

            </a>

 
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News