import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
export default class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhone1 = this.onChangePhone1.bind(this);
        this.onChangePhone2 = this.onChangePhone2.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeCPass = this.onChangeCPass.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.cusId,
            firstName: '',
            lastName: '',
            phone1: '',
            phone2: '',
            address: '',
            email: '',
            country: '',
            pass: '',
            cPass: '',
            role:'customer'
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/customer/` + this.state.id)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    phone1: response.data.phone1,
                    phone2: response.data.phone2,
                    address: response.data.address,
                    email: response.data.email,
                    country: response.data.country,
                    pass: response.data.pass,
                    cPass: response.data.cPass,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onChangePhone1(e) {
        this.setState({
            phone1: e.target.value
        });
    }
    
    onChangePhone2(e) {
        this.setState({
            phone2: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }
    onChangePass(e) {
        this.setState({
            pass: e.target.value
        });
    }
    onChangeCPass(e) {
        this.setState({
            cPass: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
        const customers = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone1: this.state.phone1,
            phone2: this.state.phone2,
            address: this.state.address,
            email: this.state.email,
            country: this.state.country,
            pass: this.state.pass,
            cPass: this.state.cPass,
            role: 'customer'
        }
        console.log(customers);

        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!this.state.firstName) {
            this.setState({ firstNameError: "Your First Name cannot be null." })
        }else if (!this.state.lastName) {
            this.setState({ lastNameError: "Your Last Name cannot be null." })
        }else if (this.state.phone1.length !== 10) {
            this.setState({ phone1Error: "Please Enter a valid Phone Number." })
        }else if (this.state.phone2.length !== 10) {
            this.setState({ phone2Error: "Please Enter a valid Phone Number." })
        }else if (!this.state.email || regex.test(this.state.email) === false) {
            this.setState({ emailError: "Please Enter a valid email." })
        } else if (!this.state.country) {
            this.setState({ countryError: "Country cannot be null." })
        }else if (this.state.address.length < 10) {
            this.setState({ addressError: "Address should contain more than 10 characters." })
        } else if (!this.state.pass || !this.state.cPass) {
            this.setState({ passNullError: "Password and confirm password cannot be null." })
        }else if (this.state.pass !== this.state.cPass) {
            this.setState({ passUnequalError: "Passwords are not matching" })
        }else if (this.state.pass.length < 5 && this.state.cPass.length) {
            this.setState({ passLengthError: "Passwords should contain at least 5 characters" })
        } else {
            axios.put('http://localhost:5000/customer/' + this.state.id, customers)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.props.close();

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Customer has been updated!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'There was an error updating!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })
        }
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className='' onSubmit={this.onSubmit}>
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>Edit Customer Details</p>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>First Name </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}

                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.firstNameError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>last Name </label>
                                                    <input type="text"
                                                        // required
                                                        className="form-control"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}

                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.lastNameError}</p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Email</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.email}
                                                        onChange={this.onChangeEmail}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.emailError}</p>
                                                </div>
                                                <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Contact Number</label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.phone1}
                                                            onChange={this.onChangePhone1}
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.phone1Error}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Contact Number</label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                                value={this.state.phone2}
                                                                onChange={this.onChangePhone2}
                                                            />
                                                            <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.phone2Error}</p>
                                                    </div>
                                                </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Address</label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.address}
                                                            onChange={this.onChangeAddress}
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.addressError}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Country</label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                                value={this.state.country}
                                                                onChange={this.onChangeCountry}
                                                            />
                                                            <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.countryError}</p>
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Password</label>
                                                        <input type="password"
                                                            required
                                                            className="form-control"
                                                            value={this.state.pass}
                                                            onChange={this.onChangePass}
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.passNullError}</p>
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.passUnequalError}</p>
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.passLengthError}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Confirm Password</label>
                                                        <input type="password"
                                                            required
                                                            className="form-control"
                                                                value={this.state.cPass}
                                                                onChange={this.onChangeCPass}
                                                            />
                                                            <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.contactError}</p>
                                                    </div>
                                                </div>


                                            {/* <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Address</label>
                                                <textarea type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.address}
                                                    onChange={this.onChangeAddress}
                                                /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.addressError}</p>
                                            </div> */}




                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-[#9B804E] hover:bg-[#867556] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Edit Customer" />
                                            </div>
                                        </form>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}