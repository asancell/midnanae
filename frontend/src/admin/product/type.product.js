import  { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function Dashboard() {

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



  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeList, setTypeList] = useState([]);

  const addtypeproduct = () => {

    axios.post("http://localhost:5000/product/create-typeproduct", {
      name: name,
      description: description,
    }).then(() => {
      setTypeList([
        ...typeList,
        {
          name: name,
          description: description,
        },
      ]);
    });
  };

  const params = useParams();

  const updateTypeProduct = (id) => {
    axios.put(`http://localhost:5000/product/update-typeproduct/${params.id }` ).then(
      (response) => {
        setTypeList(
          typeList.map((row) => {
            return row.type_product_id === id
              ? {
                  itype_product_id: row.id,
                  name: name,
                  description: description,
                }
              : row;
          })
        );
      }
    );
  };

  const deleteTypeProduct = (id) => {
    axios.delete(`http://localhost:5000/product/delete-typeproduct/${id}`).then((response) => {
      setTypeList(
        typeList.filter((row) => {
          return row.type_product_id !== id;
        })
      );
    });
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
            เพิ่มข้อมูลประเภทสินค้า
          </Typography>
          <Box  
          sx={{ p: 2 , mb:5}}        
          style={{  
            background: '#FFFFFF',
            border: 50
          }}>
          <form component="form" 
          noValidate onSubmit={addtypeproduct} 
          sx={{ mt: 1, pt: 2, pb: 2}}
          >
            <Grid container spacing={4} sx={{ mt: 5,}}>
              <Grid item xs={3}>
              <Typography variant="h6" sx={{ mb: 1,}} align="right">
                 ชื่อประเภทสินค้า
              </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={name}
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
              <Typography variant="h6" align="right">
                 รายละเอียด
              </Typography></Grid>
              <Grid item xs={6}>
              <TextareaAutosize
              value={description}
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
                  sx={{ mt: 1, mb: 2 }}
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
                  sx={{ mt: 1, mb: 2 }}
                >
                  ยืนยัน
                </Button>
              </Grid>
            </Grid>
            </form >
            </Box >

            <h1>จัดการประเภทสินค้า</h1>
          <br></br>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขที่</TableCell>
                  <TableCell align="center">ชื่อสินค้า</TableCell>
                  <TableCell align="center">รายละเอียด</TableCell>
                  <TableCell align="center">จัดการ</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
              
                {data.map((row, index) => (
                  
                  <TableRow
                    key={row.type_product_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{index+1}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="center">
                    <Button
                    variant="contained"
                    sx={{ mr: 1, }}
                    onClick={() => {updateTypeProduct(row.type_product_id)}}
                    >
                      แก้ไข
                    </Button>
                    <Button
                    variant="contained"
                    onClick={() => {
                      deleteTypeProduct(row.type_product_id)
                      alert("Delete Seccess");
                      window.location.reload();
                    } }
                    >
                      ลบ
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          </Container>
    </Box>
  );
}

