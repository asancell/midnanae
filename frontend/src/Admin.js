import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import NestedList from './admin/components/navbar';
import Dashbord from './admin/Dashboard';

//import routers employee
import Employee from './admin/employee/employee';
import Addemployee from './admin/employee/add.employee';
import Proadmin from './admin/employee/profile.admin';

//impor routers product
import Editproduct from './admin/product/edit.product';
import Addproduct from './admin/product/add.product';
import Manageproduct from './admin/product/manage.product';
import Typeproduct from './admin/product/type.product';
import Wstproduct from './admin/product/wst.product';

//import router purch
import Purch from './admin/purch/purch';
import Addpurch from './admin/purch/add.purch';
import Managepurch from './admin/purch/manage.purch';
import Requestpurch from './admin/purch/request';

//import router sell
import Sell from './admin/sell/sell';
import Managesell from './admin/sell/manage.sell';
import Historysell from './admin/sell/history.sell';

//import router sell
import Usercustomer from './admin/user/customer.admin';
import Userfarmer from './admin/user/farmer.admin';

import Pos from './admin/pos/pos';

const mdTheme = createTheme();
function Admin() {

  return (
    <ThemeProvider theme={mdTheme}>

    <Box sx={{ display: 'flex' }}>
      <Box>
          <NestedList />
      </Box>

      <Router>
        <Routes>
          <Route path="/admin" element={<Dashbord/>} />

          <Route path="/admin/employee" element={<Employee />} />
          <Route path="/admin/employee/add" element={<Addemployee />} />
          <Route path="/admin/employee/profile" element={<Proadmin />} />

          <Route path="/admin/product/Edit/:id" element={<Editproduct />} />
          <Route path="/admin/product/add" element={<Addproduct />} />
          <Route path="/admin/product/manage" element={<Manageproduct />} />
          <Route path="/admin/product/type" element={<Typeproduct />} />
          <Route path="/admin/product/wst" element={<Wstproduct />} />

          <Route path="/admin/purch/show" element={<Purch />} />
          <Route path="/admin/purch/add" element={<Addpurch />} />
          <Route path="/admin/purch" element={<Managepurch />} />
          <Route path="/admin/purch/sell" element={<Requestpurch />} />

          <Route path="/admin/sell/show" element={<Sell />} />
          <Route path="/admin/sell/manage" element={<Managesell />} />
          <Route path="/admin/sell/history" element={<Historysell />} />

          <Route path="/admin/user/customer" element={<Usercustomer />} />
          <Route path="/admin/user/farmer" element={<Userfarmer />} />

          <Route path="/admin/pos" element={<Pos />} />
        </Routes>
      </Router>

    </Box>
    </ThemeProvider>


  );
}

export default Admin;

