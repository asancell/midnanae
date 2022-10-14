import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function Product(props) {


  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get('http://localhost:5000/product/type');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

 


  const [productList, setProductList] = useState([]);

  const { id } = useParams();

useEffect(() => {
    const fetchproduct = async () =>{
      try {
        const {data: response} = await axios.get(`http://localhost:5000/product/${id}`)
        setProductList(response)
      } catch (error) {
        console.error(error.message );
      }
    }
    fetchproduct();
  }, [id])

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [qty, setQty] = useState(0);
  const [price_sell, setPrice_sell] = useState(0);
  const [description, setDescription] = useState("");

  const updateProduct = (id) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      axios.patch(`http://localhost:5000/product/update-product/${id}`,{ 
        id: id,
        name: name,
        type_product_id: type,
        picture: fileName,
        qty: qty, 
        price_sell: price_sell,
        description: description 
      }).then(
        (response) => {
          setProductList(
            productList.map((val) => {
              return val.id === id
                ? {
                  id: val.id,
                  name: name,
                  type_product_id: type,
                  picture: fileName,
                  qty: qty, 
                  price_sell: price_sell,
                  description: description 
                  }
                : val;
            })
          );
        }
      );
    } catch (error) {
      console.log(error);
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

          <Container maxWidth="lg"  sx={{ mt: 15, mb: 4 }}>
          <Typography variant="h4">
          </Typography>
          
          <div  
          sx={{ p: 2 }}        
          style={{  
            background: '#FFFFFF',
            border: 50
          }}>
         { productList.map((row) => (
          <form component="form" 
          key={row.id}
          noValidate onSubmit={updateProduct}
          sx={{ mt: 1, pt: 2, pb: 10}}
          encType="multipart/form-data"
          >
            
              
            <Grid container spacing={4} sx={{ mt: 5,}}>
            
              <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 รูปภาพสินค้า
              </Typography>
              </Grid>
              <Grid item xs={6}>

                <TextField
                  // value={row.picture}
                  fullWidth
                  type="file"
                  name="picture"
                  size="small"
 
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                    setFileName(event.target.files[0].name)
                  }}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 ประเภทสินค้า
              </Typography>
              </Grid>
              <Grid item xs={6}>

              <Select
                value={type}
                defaultValue={row.type}
                fullWidth
                name="type"
                size="small"
                onChange={(event) => {
                  setType(event.target.value)
                }}
              >
                {data.map((row, index) => (
                <MenuItem key={index} value={row.type_product_id} >{row.name}</MenuItem>
                ))};
                </Select>
              
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 ชื่อสินค้า
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={row.name}
                  fullWidth
                  name="name"
                  size="small"
                  onChange={(event) => {
                    setName(event.target.value)
                  }}
                />
              </Grid>   
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 จำนวน
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={row.qty}
                  type="number"
                  fullWidth
                  name="qty"
                  size="small"
                  onChange={(event) => {
                    setQty(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 ราคาขาย
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField

                  defaultValue={row.price}
                  type="number"
                  fullWidth
                  name="price_sell"
                  size="small"
                  onChange={(event) => {
                    setPrice_sell(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>              
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 รายละเอียด
              </Typography></Grid>
              <Grid item xs={6}>
              <TextareaAutosize
                defaultValue={row.des}
                minRows={4}
                name="description"
                size="small"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setDescription(event.target.value)
                }}
              />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  type="cancel"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ background: '#ffeb3b', }}

                >
                  ยกเลิก
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  
                  ยืนยัน
                </Button>
              </Grid>
            
            </Grid>
                
            </form >
   ))}
            </div>

          </Container>
    </Box>
  );
}

