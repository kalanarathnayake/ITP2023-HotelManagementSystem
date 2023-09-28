import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import EditEmployee from './employee-edit.component';


const Employee = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='px-6 py-4'>{props.employee.empId}</td>
        <td className='px-6 py-4'>{props.employee.firstName} {props.employee.lastName}</td>
        <td className='px-6 py-4'>{props.employee.position}</td>
        <td className='px-6 py-4'>{props.employee.phoneNumber}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-[#9B804E] rounded-md ' onClick={() => { props.gotoUpdateEmployee(props.employee._id) }}>

                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                            <div class="">
                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                </svg>
                            </div>
                            <div class="">
                                Edit
                            </div>
                        </div>

                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-[#3B362E] rounded-md ' onClick={() => { props.deleteEmployee(props.employee._id) }}>
                        <div class="grid grid-cols-2 gap-1 hover:text-black">
                            <div class="">
                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                Remove
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class EmployeeList extends Component {

    constructor(props) {
        super(props);

        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.gotoUpdateEmployee = this.gotoUpdateEmployee.bind(this);

        this.state = {
            employee: [],
            searchEmployee: "",
            show: false
        };
    }

    refreshList() {
        axios.get('http://localhost:5000/employee/')
            .then(response => {
                this.setState({ employee: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    componentDidMount() {
        this.refreshList();
    }

    gotoUpdateEmployee = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("List id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    deleteEmployee(id) {

        axios.delete('http://localhost:5000/employee/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Employee has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                this.refreshList();
            }

            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessfull',
                    text: "Employee has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }
        })
    }

    employeeList() {
        return this.state.employee.map(currentemployee => {
            return <Employee employee={currentemployee} deleteEmployee={this.deleteEmployee} gotoUpdateEmployee={this.gotoUpdateEmployee} key={currentemployee._id} />;
        })
    }

    searchEmployeeList() {
        return this.state.employee.map((currentemployee) => {
            if (this.state.searchEmployee === currentemployee.empId) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentemployee.empId}</td>
                        <td className='px-6 py-4'>{currentemployee.firstName}{currentemployee.lastName}</td>
                        <td className='px-6 py-4'>{currentemployee.position}</td>
                        <td className='px-6 py-4'>{currentemployee.phoneNumber}</td>

                        <td className='flex justify-center px-6 py-4 '>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-[#9B804E] rounded-md' onClick={() => { this.gotoUpdateEmployee(currentemployee._id) }}>

                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Edit
                                            </div>
                                        </div>

                                    </button>
                                </div>
                            }
                            {"  "}
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3B362E] rounded-md'
                                        onClick={() => {
                                            //Delete the selected record
                                        this.deleteEmployee(currentemployee._id)
                                        }}>
                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Remove
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            }
                        </td>
                    </tr>
                );
            }
        });
    }


    exportEmployee = () => {
        console.log("Export PDF")
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Employee List Report";
        const headers = [["Employee ID", "First Name","last Name", "Position", "Salary", "Gender", "Age", "Contact Number" ]];

        const emp = this.state.employee.map(
            Employee => [
                Employee.empId,
                Employee.firstName,
                Employee.lastName,
                Employee.position,
                Employee.salary,
                Employee.gender,
                Employee.age,
                Employee.phoneNumber
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: emp
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Employee-list.pdf")
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <h3>Employee List</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-[#867556] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/creatEmployee"}>
                                                        Add Employee
                                                    </Link></button>
                                                <button class="text-white bg-[#867556] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportEmployee()}>

                                                    Generate Report
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Employee ID"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchEmployee: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Employee ID</th>
                                            <th className="p-2 tbhead">Name</th>
                                            <th className="p-2 tbhead">position</th>
                                            <th className="p-2 tbhead">phoneNumber</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchEmployee == "" ? this.employeeList() : this.searchEmployeeList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    {/* <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    Update Employee
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header > */}
                                    <Modal.Body className='border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditEmployee empId={this.state.id} key={this.state.id} close={this.closeModalBox} />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

