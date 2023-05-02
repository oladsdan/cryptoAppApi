import React from 'react'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser';
import { useGetCryptoExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader';

const {Text} = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  
  const {coinId} = useParams()

  const {data, isFetching} = useGetCryptoExchangesQuery(coinId)
  console.log(data)
  const exchangeList = data?.data?.exchanges
  
  if(isFetching) return <Loader />

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangeList.map((exchange)=> (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.uuidPrice)}</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.coinrankingUrl)}

              </Panel>
            
            </Collapse>
          </Col>
        ))

        }
      </Row>
    
    </>
  )
}

export default Exchanges