import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Carousel, initTE } from "tw-elements";

import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/navbar/footer.component";
import { EmployeeList } from "./components/employee/employee-list.component";
import { CreateEmployee } from './components/employee/employee-add.component';
import EditEmployee from "./components/employee/employee-edit.component";
import { CustomerList } from './components/customer/customer-list.component'
import { CustomerPro } from './components/customer/customer-profile.component'
import { CreateCustomer } from './components/customer/customer-add.component'
import EditCustomer from './components/customer/customer-edit.component'
import { InventoryList } from './components/inventory/inventory-list.component'
import { CreateInventory } from './components/inventory/inventory-add.component'
import EditInventory from './components/inventory/inventory-edit.component'
import { InventoryOrderList } from './components/inventoryOrder/inventoryOrders-list.component'
import { CreateInventoryOrder } from './components/inventoryOrder/inventoryOrders-add.component'

import { FeedbackList } from './components/feedback/feedback-list.component'
import { CreateFeedback } from './components/feedback/feedback-add.component'
import EditFeedback from './components/feedback/feedback-edit.component'


import { UserRegistration } from './components/user/user-registration.component';
import { UserLogin } from './components/user/user-login.component';

import Home from "./components/navbar/home";
import { CustomerFeed } from './components/customer/customer.feedback.component';
import { LeaveList } from './components/leave/leave-list.component';
import { CreateLeave } from './components/leave/leave-add.component'
import { EmpLeaveList } from './components/leave/employee-leave-list.component';

initTE({ Carousel }, true); // set second parameter to true if you want to use a debugger
function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>

          <Route exact path="/nav" element={Navbar} />
          <Route exact path="/" element={<Home />} />

          <Route exact path="/employee" element={<EmployeeList />} />{/* Done */}
          <Route exact path="/creatEmployee" element={<CreateEmployee />} />{/* Done */}
          <Route exact path="/editEmployee/:id" element={EditEmployee} />{/* Done */}

          <Route exact path="/customer" element={<CustomerList />} /> {/* Done */}
          <Route exact path="/customerProfile" element={<CustomerPro />} /> {/* Done */}
          <Route exact path="/customerFeedback" element={<CustomerFeed />} /> {/* Done */}
          <Route exact path="/creatcustomer" element={<CreateCustomer />} /> {/* Done */}
          <Route exact path="/editCustomer/:id" element={EditCustomer} />

          <Route exact path="/inventory" element={<InventoryList />} /> {/* Done */}
          <Route exact path="/creatInventory" element={<CreateInventory />} />{/* Done */}
          <Route exact path="/editInventory/:id" element={EditInventory} />{/* Done */}

          <Route exact path="/leave" element={<LeaveList />} />{/* Done */}
          <Route exact path="/createLeave" element={<CreateLeave />} />{/* Done */}
          <Route exact path="/empLeave" element={<EmpLeaveList />} />{/* Done */}

          <Route exact path="/inventoryorder" element={<InventoryOrderList />} />{/* Done */}
          <Route exact path="/creatInventoryOrder" element={<CreateInventoryOrder />} />  {/* dont edit this */}

          <Route exact path="/feedback" element={<FeedbackList />} />{/* Done */}
          <Route exact path="/creatFeedback" element={<CreateFeedback />} />{/* Done */}
          <Route exact path="/editFeedback/:id" element={EditFeedback} />{/* Done */}

          <Route exact path="/signUp" element={<UserRegistration />} />{/* Done */}
          <Route exact path="/signIn" element={<UserLogin />} />{/* Done */}
        </Routes>
      </Router>
      <Footer />
    </div>
  );

}

export default App;
