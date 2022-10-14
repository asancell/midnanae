import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './data';
import './components/pos.css';
export default function Dashboard() {

  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >

          <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
          <div>
            <Header countCartItems={cartItems.length}></Header>
            <div className='contai'>

              <Main products={products} onAdd={onAdd}></Main>
   

              <Basket
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                ></Basket>



            </div>


  
          </div>
          </Container>
    </Box>
  );
}

