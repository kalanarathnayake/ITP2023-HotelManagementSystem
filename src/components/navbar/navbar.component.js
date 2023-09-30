import { Component } from "react";
import AuthenticationService from "../user/AuthenticationService";
import { Modal } from "react-bootstrap";

class navbar extends Component {
  logout = () => {
    AuthenticationService.logout();

    window.location = "/"
  }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

  render() {
      const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const loggedUserRole = AuthenticationService.loggedUserRole();
    const loggedUserId = AuthenticationService.loggedUserId();

    console.log("User Id is" + loggedUserId);
    // const loggedUser = AuthenticationService.loggedUserName();
    let loggedAsEManager = false; //employeemanager
    let loggedAsCManager = false; //customermanager
    let loggedAsIManager = false; //inventorymanager
    let loggedAsAdmin = false;
    let unknownUser = false;
    let loggedAsCustomer = false;
    let loggedAsEmployee = false;

    if (isUserLoggedIn === true) {
      console.log("User Logged In")
    } else {
      unknownUser = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'employeemanager') {
      loggedAsEManager = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'employee') {
      loggedAsEmployee = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'customermanager') {
      loggedAsCManager = true;
    }if (loggedUserRole != null && loggedUserRole === 'customer') {
      loggedAsCustomer = true;
    }
    if (loggedUserRole != null && loggedUserRole === 'inventorymanager') { 
      loggedAsIManager = true;
    } 
    if (loggedUserRole != null && loggedUserRole === 'superadmin') {
      loggedAsAdmin = true;
    }

    return (
      <div>
        <div>
          <nav className="flex flex-col w-full px-6 py-4 bg-white shadow sm:flex-row sm:text-left sm:justify-between sm:items-baseline">
            {unknownUser &&
              <>
                <div className="mb-2 sm:mb-0">
                  <a href="/" className="text-xl text-orange-600 no-underline duration-300 hover:text-orange-dark hover:font-bold">Home</a>
                </div>
                <div class="">
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div class="flex flex-col sm:flex-row sm:text-left sm:justify-between">
                    <button class="flex  bg-[#645232] hover:bg-[#907543] focus:ring-4 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">  <a className="text-white no-underline text-md from-neutral-50" href="/creatCustomer">Sign Up</a></button>
                  </div>
                  <div class="flex flex-col sm:flex-row sm:text-left sm:justify-between">
                    <button class="flex text-white bg-[#9B804E] hover:bg-[#c9ac75] focus:ring-4 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"><a className="text-white no-underline text-md" href="/signIn">Sign In</a></button>
                  </div>
                </div>
              </>
            }
            {isUserLoggedIn &&
              <>
                <div className="mb-2 sm:mb-0">
                  <a href="/" className="text-xl text-orange-600 no-underline duration-300 hover:text-orange-500 hover:font-bold">Home</a>
                </div>
                <div className='text-lg font-light hover:text-orange-dark'>
                  {loggedAsEManager &&
                    <>
                      <div>
                        <a href="/employee" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Employee Management</a>
                        <a href="/leave" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Leave Management</a>
                        <a href="/empLeave" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">My Leave Dash</a>
                      </div>
                    </>
                  }

                  {loggedAsCManager && //done
                    <div>
                      <a href="/customer" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Customer</a>
                      <a href="/feedback" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Feedback</a>
                    </div>
                  }
                  {loggedAsCustomer && //done
                    <div>
                      <a href="/customerProfile" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">My Profile</a>
                      <a href="/customerFeedback" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">FeedBacks</a>
                    </div>
                  }
                  {loggedAsIManager && 
                    <>
                      <div>
                        <a href="/inventory" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Inventory</a>
                        <a href="/inventoryorder" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Inventory Order</a>
                        <a href="/inventoryDash" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Dash Board</a>
                      </div>
                    </>
                  }

                  {loggedAsEmployee &&
                    <>
                      <div>
                        <a href="/empLeave" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">My Leave Dash</a>
                      </div>
                    </>
                  }
{
                    loggedAsAdmin &&
                    <>
                      <a href="/employee" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Employees</a>
                      <a href="/customer" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Customer</a>
                      <a href="/feedback" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Feedback</a>
                      <a href="/inventory" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Inventory</a>
                      <a href="/inventoryorder" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Inventory Order</a>
                      <a href="/leave" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">Leave</a>
                      <a href="/empLeave" className="m-2 text-black no-underline duration-300 hover:text-orange-800 hover:font-normal">emp Leave</a>
                    </>
                  }

                </div>
                <div class="flex flex-col sm:flex-row sm:text-left sm:justify-between">
                  <button class="flex text-white bg-[#9B804E] hover:bg-[#d7b26e] focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800" onClick={this.logout}> Logout</button>
                </div>
              </>
            }
          </nav>
        </div >
      </div >
    );
  }
}

export default navbar;