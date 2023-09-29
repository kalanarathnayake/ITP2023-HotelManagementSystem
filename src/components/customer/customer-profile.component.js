import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import  EditCustomer  from './customer-edit.component';
import AuthenticationService from "../user/AuthenticationService";

const CustomerProfile = props => (
    <div class=""></div>
)

export class CustomerPro extends Component {

    constructor(props) {
        super(props);

        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.gotoUpdateCustomer = this.gotoUpdateCustomer.bind(this);

        this.state = {
            customer: [],
            searchCustomer: "",
            show:false,
            loggedUserId:""
        };
    }

    refreshList(){
        axios.get('http://localhost:5000/customer/')
        .then(response => {
            this.setState({ customer: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }


    componentDidMount() {
        this.refreshList();
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const loggedUserRole = AuthenticationService.loggedUserRole();
        const loggedUserId = AuthenticationService.loggedUserId();
        console.log(isUserLoggedIn)
        console.log(loggedUserRole)
        console.log(loggedUserId)
        this.setState({searchCustomer: loggedUserId});
    }

    gotoUpdateCustomer = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" +id);
    }

    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }

    deleteCustomer(id) {
        axios.delete('http://localhost:5000/customer/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            if(response.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Customer has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                this.refreshList();
            }
            
            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessful',
                    text: "Customer has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }

            
        })
    }

    customerList() {
        return this.state.customer.map(currentcustomer => {
            return <CustomerProfile customer={currentcustomer} deleteCustomer={this.deleteCustomer} gotoUpdateCustomer={this.gotoUpdateCustomer} key={currentcustomer._id} />;
        })
    }

    searchCustomerList() {

        return this.state.customer.map((currentcustomer) => {
            if (
                this.state.searchCustomer === currentcustomer.firstName
            ) {
                return (
                        <div class="container mx-auto my-24">
                                <div class="bg-white relative shadow rounded-lg w-4/12 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto mb-10">
                                    <div class="flex justify-center">
                                            <img src="https://cdn.discordapp.com/attachments/823867229535469628/1157262758220402718/images.png?ex=6517f86e&is=6516a6ee&hm=efa2f9369cbdf5ecdd08ea1b31098ccb88527c233c62b280f935fc8ef88d4323&" alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                                    </div>
                                    
                                    <div class="mt-16 mb-10">
                                        <h1 class="font-bold text-center text-3xl text-gray-900">{currentcustomer.firstName} {currentcustomer.lastName}</h1>
                                        <p class="text-center text-sm text-gray-400 font-medium">{currentcustomer.role}</p>

                                        <div class="w-full pb-10">
                                            <h3 class="text-center font-medium text-gray-900 px-6">Personal Details</h3>
                                            <p class="mx-20 text-left text-base text-gray-400 font-medium">Full Name: {currentcustomer.firstName+ "_"+currentcustomer.lastName}</p>
                                            <p class="mx-20 text-left text-base text-gray-400 font-medium">Contact Numbers: {currentcustomer.phone1 +"/"+currentcustomer.phone2}</p>
                                            <p class="mx-20 text-left text-base text-gray-400 font-medium">Email: {currentcustomer.email}</p>
                                            <p class="mx-20 text-left text-base text-gray-400 font-medium">Address : {currentcustomer.address+","+currentcustomer.country}</p>
                                            <div class="">
                                                <button className='mx-20 inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-[#c8a565] rounded-md hover:bg-[#433722]' onClick={() => { this.gotoUpdateCustomer(currentcustomer._id) }}>
                                                        <div class=" grid grid-cols-1 gap-1">
                                                            <div class="">
                                                                Edit
                                                            </div>
                                                        </div>
                                                </button>
                                                <button className='hidden inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-[#5a4a2d] rounded-md hover:bg-[#af9159]' onClick={() => { this.deleteCustomer(currentcustomer._id) }}>
                                                        <div class=" grid grid-cols-1 gap-1">
                                                            <div class="">
                                                                Delete Profile
                                                            </div>
                                                        </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                );
            }
        });
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                {this.state.searchCustomer === "" ? this.customerList() : this.searchCustomerList()}
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    {/* <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    Edit Customer
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header > */}
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditCustomer cusId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

