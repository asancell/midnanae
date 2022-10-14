import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';


export default function Addpurch() {


 
  const [file, setFile] = useState();
  // const [fileName, setFileName] = useState("");
  
  // console.log(fileName)
const uploadImg = () => {
const form = document.querySelector("form");
// const formData = new FormData(form);
console.log(form);
if(form){
    // form.addEventListener("submit", (e) => {
    //   e.preventDefault();
     const formData = new FormData(form);
    console.log(formData);
    axios.post('http://localhost:5000/product/upload-img-product', formData , {
      
      headers: {
        "Content-Type": "multipart/form-data",
      },
      
    }) 
    .then((res) => {
      console.log(res);
      console.log(formData);
    })
    .catch((err) => {
      console.log(err);
    });
  }
// )}
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
            method='post'
            noValidate onSubmit={ uploadImg() }
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
                  name="file"
                  size="small"
                  onChange={(event) => {
                    setFile(URL.createObjectURL(event.target.files[0]));
                    // setFileName(event.target.files[0].name)
                  }}
                />
                <center><img src={file} height="250px" width="auto"/></center>
                </Card>

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

