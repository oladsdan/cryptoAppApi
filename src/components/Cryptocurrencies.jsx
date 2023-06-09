import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100; // this is used to shuffle the coins to display only 10 cryptocurrencies so we add it to the useGetCryptoQurey


  //destruction of the getcyptoquery
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    setCryptos(filteredData)

  },[cryptosList, searchTerm]) // this will execute when both changes

  if(isFetching) return <Loader/>
 

  return (
    <>
      {/* creating a search item */}
      {!simplified && (
        // this ensures that the search does not show on the homepage
        <div className="search-crypto">
          <input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} style={{height: "40px"}} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency)=> (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={<img className="crypto-image" src={currency.iconUrl} />}
              hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>

              </Card>
            </Link>
            <Link to={`/exchanges/${currency.uuid}`}>
              <Button>List of Exchanges ({currency.name})</Button>
            </Link>

          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies