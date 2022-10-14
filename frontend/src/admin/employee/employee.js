import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




function Manageproduct() {

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get('http://localhost:5000/user/admin/read');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [])



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
            
          <h1>จข้อมูลพนักงาน</h1>
          <br></br>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขที่</TableCell>
                  <TableCell align="center">รูปภาพ</TableCell>
                  <TableCell align="center">ชื่อ - นามสกุล</TableCell>
                  <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                  <TableCell align="center">ตำแหน่ง</TableCell>
                  <TableCell align="center">อีเมล</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
              
                {data.map((row, index) => (
                  
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{index+1}</TableCell>
                    <TableCell align="left">{row.Image_link}</TableCell>
                    <TableCell align="left">{row.name}<label>&nbsp;&nbsp;&nbsp;</label> {row.lastname}</TableCell>
                    <TableCell align="left">{row.tell}</TableCell>
                    <TableCell align="left">{row.position}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    
                  </TableRow>
                  
                ))}
              </TableBody>

            </Table>
          </TableContainer>

          </Container>
    </Box>
  );

}

export default function product() {
  return <Manageproduct />;
}

