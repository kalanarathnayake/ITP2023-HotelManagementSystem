import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";

export class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmpID = this.onChangeEmpID.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);    
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.empId,
            empId: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            salary: '',
            gender: '',
            position: '',
            age: ''
        }
    }

    onChangeEmpID(e) {
        this.setState({
            empId: e.target.value
        });
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }

    onChangeSalary(e) {
        this.setState({
            salary: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangePosition(e) {
        this.setState({
            position: e.target.value
        });
    }
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const employee = {
            empId: this.state.empId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            position: this.state.position,
            salary: this.state.salary,
            gender: this.state.gender,
            age: this.state.age,
            phoneNumber: this.state.phoneNumber,
        }

        console.log(employee);

        if (this.state.empId.length <= 5) {
            this.setState({ empIDError: "Employee ID should be 5 characters." })
        }else if (this.state.firstName.length <= 3) {
            this.setState({ firstNameError: "First Name characters should be more then 5." })
        }else if (this.state.lastName.length <= 3) {
            this.setState({ lastNameError: "Last Name characters should be more then 5." })
        }else if (this.state.phoneNumber.length !== 10) {
            this.setState({ phoneNoError: "Contact Number is invalid." })
        } else if (isNaN(this.state.salary) || this.state.salary <= 0) {
            this.setState({ salaryError: "Please add a valid salary detail." })
        } else if (this.state.position < 4) {
            this.setState({ positionError: "Your position is too short." })
        } else if (this.state.age < 18) {
            this.setState({ ageError: "please add valid age count." })
        }else {
        axios.post('http://localhost:5000/employee/', employee)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Employee has been added!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })
                    window.location = '/employee';
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#e00404'
                    })
                }
            })
        }
    }

    clearData = () => {
        this.setState({
            empId: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            salary: '',
            gender: '',
            position: '',
            age: ''
        })
    }

    render() {
        return (
<div className="flex flex-col px-5 pb-14 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase'>
                                                Add Employee
                                            </p>
                                            <div class="grid grid-cols-3 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID </label>
                                                    <input type="text"
                                                        // required
                                                        className="form-control"
                                                        value={this.state.empId}
                                                        onChange={this.onChangeEmpID}

                                                    /> <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.empIDError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >First Name</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.firstNameError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Last Name</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.lastNameError}</p>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Contact Number</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.phoneNumber}
                                                        onChange={this.onChangePhoneNumber}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.phoneNoError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Position</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.position}
                                                        onChange={this.onChangePosition}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.positionError}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Salary</label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    value={this.state.salary}
                                                    onChange={this.onChangeSalary}
                                                />
                                                <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.salaryError}</p>

                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Gender</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.gender}
                                                        onChange={this.onChangeGender}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Age</label>
                                                    <input type="number"
                                                        required
                                                        className="form-control"
                                                        value={this.state.age}
                                                        onChange={this.onChangeAge}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.ageError}</p>
                                                </div>
                                                <p />

                                            </div>

                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-[#9B804E] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Create Employee" />
                                    </div>
                                            </div>
                                        </form>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}