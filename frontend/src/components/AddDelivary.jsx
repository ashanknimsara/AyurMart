import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddDelivery = () => {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      cusName: "",
      address: "",
      date: "",
      nic: "",
      contactNumber: "",
      deliveryStatus: "Pending",
    },
    onSubmit: values => {
      console.log(values);

      if (id) {
        axios.put(`http://localhost:3001/api/Delivery/update-Delivery/${id}`, values)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire('Delivery Updated successfully');
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Something went wrong!!');
          });
      } else {
        axios.post(`http://localhost:3001/api/Delivery/add-Delivery`, values)
          .then((res) => {
            Swal.fire('Delivery saved successfully');
          })
          .catch((err) => {
            console.log(err);
            Swal.fire('Something went wrong!!');
          });
      }
    }
  });

   /* const validationSchema = yup.object({
        emp_name: yup
            .string()
            .required("emp_name is required!"),
        emp_phone_no: yup.string().required("emp_phone_no is required!"),
        emp_email: yup
            .string()
            .required("emp_email is required!"),
        emp_photo: yup.string().required("emp_photo is required!!"),
        emp_address: yup.string().required("emp_address is required!!"),
        emp_dob: yup.date().required("emp_dob is required!!"),
        emp_gender: yup.string().required("emp_gender is required!!"),
        emp_nic: yup.string().required("emp_nic is required!!"),
        emp_epf_no: yup.string().required("emp_epf_no is required!!"),
        emp_join_date: yup.date().required("emp_join_date is required!!"),
        emp_cv: yup.string().required("emp_cv is required!!"),
        emp_type: yup.string().required("emp_type is required!!"),
        dept_id: yup.string().required("dept_id is required!!"),
        emp_account_id: yup.string().required("emp_account_id is required!!")
        
    });*/
    /*var emp_name = ""
    var emp_phone_no = ""
    var emp_email = ""
    var emp_photo = ""
    var emp_address = ""
    var emp_dob = ""
    var emp_gender = ""
    var emp_nic = ""
    var emp_epf_no = ""
    var emp_join_date = ""
    var emp_cv = ""
    var dept_id = ""
    var emp_type = ""
    var emp_account_id = ""

    const [employe, setEmploye] = useState([]);
    const [BankAccount, setBankAccount] = useState([]);
    const [Department, setDepartment] = useState([]);
    const [projects, setProjects] = useState([]);

    const getemployeDataForUpdate = (id) => {
        axios.get(`http://localhost:3001/api/employee-manage/get-employees/` + id)
            .then(res => {
                formik.setFieldValue('emp_name' , res.data.result.emp_name)
                formik.setFieldValue('emp_phone_no' , res.data.result.emp_phone_no)
                formik.setFieldValue('emp_email' , res.data.result.emp_email)
                formik.setFieldValue('emp_photo' , res.data.result.emp_photo)
                formik.setFieldValue('emp_address' , res.data.result.emp_address)
                formik.setFieldValue('emp_dob' , res.data.result.emp_dob)
                formik.setFieldValue('emp_gender' , res.data.result.emp_gender)
                formik.setFieldValue('emp_nic' , res.data.result.emp_nic)
                formik.setFieldValue('emp_epf_no' , res.data.result.emp_epf_no)
                formik.setFieldValue('emp_join_date' , res.data.result.emp_join_date)
                formik.setFieldValue('emp_cv' , res.data.result.emp_cv)
                formik.setFieldValue('dept_id' , res.data.result.dept_id)
                formik.setFieldValue('emp_type' , res.data.result.emp_type)
                formik.setFieldValue('emp_account_id' , res.data.result.emp_account_id)
            })
    }

    const getEmployeData = () => {
        axios.get(`http://localhost:3001/api/employee-manage/get-employees`)
            .then(res => {
                const allEmpData = res.data.result;
                setEmploye(allEmpData)
            })
    }

    const getBankAccountData = () => {
        axios.get(`http://localhost:3001/api/Bankaccount-manage/get-BankAccount`)
            .then(res => {
                const allBankData = res.data.BankAccount;
                //   console.log(allEmpData)
                setBankAccount(allBankData)
            })
    }

    const getDepartmentData = () => {
        axios.get(`http://localhost:3001/api/department-manage/get-Department`)
            .then(res => {
                const allDeptData = res.data.Department;
                //   console.log(allEmpData)
                setDepartment(allDeptData)
            })
    }

    useEffect(() => {
        
        getBankAccountData()
        getDepartmentData()
        getEmployeData()
        if (id) {
            getemployeDataForUpdate(id)
        }
    }, [])
*/

                return (
                    <div className="home">
                     
                        <div className="homeContainer">
                          

                            
                            {
                                id ? <h1 className='m-4'>Update An Employee</h1> : <h1 className='m-4'>Add Delivary Details</h1>
                            }
                            <form onSubmit={formik.handleSubmit}>
                                <div className='p-4'>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Custemer Name</label>
                                               <input onChange={formik.handleChange}  id="" type='text' name='cusName'className='form-control' />
                                               
                                                <p className="text-danger p-1">
                                
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Address</label>
                                                <input onChange={formik.handleChange}  id="" type='text' name='address'className='form-control' />
                                               
                                                <p className="text-danger p-1">
                                                   
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">date</label>
                                                <input onChange={formik.handleChange}  id="" type='Date' name='date'className='form-control' />
                                               
                                               
                                                <p className="text-danger p-1">
                                                    
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Nic</label>
                                                <input onChange={formik.handleChange} id="" type='text' name='nic'className='form-control' />
                                               
                                                <p className="text-danger p-1">
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Phone No</label>
                                                <input onChange={formik.handleChange}  id="" type='text' name='contactNumber'className='form-control' />
                                               
                                                <p className="text-danger p-1">
                                                   
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    
                                    
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group">
                                            <label htmlFor="exampleInputEmail1"></label>
                                                <input type="submit" name='Save' value={id ? "Update Delevary" : "SAVE Delevary"} className='btn btn-secondary' />
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                            </form>


                        </div>


                    </div>
                )
    
}

export default AddDelivery