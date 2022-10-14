import { useState, useEffect } from 'react';
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
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import upload from './../../assets/upload.png'

export default function Dashboard() {


 

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://localhost:5000/product/type');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);



  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [qty, setQty] = useState(0);
  const [price_sell, setPrice_sell] = useState(0);
  const [description, setDescription] = useState("");

  const [productList, setProductList] = useState([]);


  const addProduct = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    axios.post("http://localhost:5000/product/create-product", {
      name: name,
      type_product_id: type,
      picture: fileName,
      qty: qty,
      price_sell: price_sell,
      description: description,
    }).then(() => {
      setProductList([
        ...productList,
        {
          name: name,
          type_product_id: type,
          picture: fileName,
          qty: qty,
          price_sell: price_sell,
          description: description,
        },
      ]);
    });
  };


  const [uploaded, setUploaded] = useState(false)
  const [imageProduct, setImageProduct] = useState("");

  
  const uploadImg = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    axios.post('http://localhost:5000/product/upload-img-product', {
      headers: { "Content-Type": "multipart/form-data" } ,
      productImg: fileName,
    }).then(() => {
      setImageProduct([
        ...imageProduct,
        {
          productImg: fileName,
        },
      ]);
    });
  };


  const chooseFile = () =>{ 
    document.getElementById('imageFile').click(uploadImg);
  }


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

      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        <Typography variant="h4">
          เพิ่มข้อมูลสินค้า
        </Typography>
        <div
          sx={{ p: 2 }}
          style={{
            background: '#FFFFFF',
            border: 50
          }}>
          <form component="form"
            noValidate onSubmit={() => { addProduct() &&  uploadImg() }}
            sx={{ mt: 1, pt: 2, pb: 10 }}
            encType="multipart/form-data"
          >
            <Grid container spacing={4} sx={{ mt: 5, }}>
            <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 รูปภาพสินค้า
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <Card
                >
                  <TextField
                  fullWidth
                  type="file"
                  name="productImg"
    
                  size="small"
                  onChange={(event) => {
                    setFile(URL.createObjectURL(event.target.files[0]));
                    setFileName(event.target.files[0].name)
                  }}
                />
                <center><img src={file} height="250px" width="auto"/></center>
                {/* <CardMedia
                    component="img"
                    height="250px"
                    width="auto"
                    image={upload}
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setFileName(event.target.files[0].name)
                    }}
                  /> */}
                  {/* <input hidden id="imageFile" accept='image' type="file"></input> */}

                </Card>

              </Grid>
              <Grid item xs={3}></Grid>












              {/* <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 รูปภาพสินค้า
              </Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="file"
                  name="file"
                  size="small"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                    setFileName(event.target.files[0].name)
                  }}
                /> */}
              {/* </Grid> */}
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ mb: 1, }} align="right">
                  ประเภทสินค้า
                </Typography>
              </Grid>
              <Grid item xs={6}>

                <Select
                  value={type}
                  fullWidth
                  name="type"
                  size="small"
                  onChange={(event) => {
                    setType(event.target.value)
                  }}
                >
                  {data.map((row) => (
                    <MenuItem key={row.type_product_id} value={row.type_product_id}>{row.name}</MenuItem>
                  ))};
                </Select>

              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ mb: 1, }} align="right">
                  ชื่อสินค้า
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                <Typography variant="h6" sx={{ mb: 1, }} align="right">
                  จำนวน
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                <Typography variant="h6" sx={{ mb: 1, }} align="right">
                  ราคาขาย
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                <Typography variant="h6" sx={{ mb: 1, }} align="right">
                  รายละเอียด
                </Typography></Grid>
              <Grid item xs={6}>
                <TextareaAutosize
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
        </div>
      </Container>
    </Box>
  );
}

