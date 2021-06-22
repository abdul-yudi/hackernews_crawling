import React, {
  useContext,
  useEffect
} from "react";
import {
  Link,
} from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../utils/context";
import API from "../../utils/api";

const Dashboard = () => {

  const {state, dispatch} = useContext(AppContext);

  const fetchProducts = () => {
    axios.get(`${API.PRODUCTS}`, {
      headers: {Authorization: `Bearer ${state.token}`}
    })
    .then(response => {
      dispatch({
        type: "PRODUCTS",
        payload: response.data
      })
    })
    .catch(error => {
      console.log(error.message);
      if(error.message === "Internal Server Error"){
        alert('Connection Timeout')
      }
    });
  }

  const Contentproducts = () => {
    if(state.products){
      const data = state.products.map((obj) => (
              <tr key={obj.id}>
                <td> {obj.name} </td>
                <td> {obj.image !== "" ? <img src={`${obj.image}/?v="${obj.id}`} width="70" height="70"/> : "Image not set"} </td>
                <td> {`$ ${obj.price}`} </td>
                <td> {obj.description} </td>
                <td> {obj.categories.name} </td>
                <td> {obj.status ? "Available" : "Not Available"} </td>
                <td>
                  <Link to={`/edit/${obj.id}`} className="btn btn-primary">Edit</Link>
                  <Link onClick={() => deleteProduct(obj.id)} className="btn btn-danger">Edit</Link>
                </td>
              </tr>
            ));

      return data;
    }else{
      return( <tr><td colSpan="6" align="center">No Records Found!</td></tr> )
    }
  }

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`${API.PRODUCTS}/${id}`, {
        headers: {Authorization: `Bearer ${state.token}`}
      })
      .then(response => {
        dispatch({
          type: "DELETEPRODUCT",
          payload: response.data
        })
      })
      .catch(error => {
        console.log(error.message);
        if(error.message === "Internal Server Error"){
          alert('Connection Timeout')
        }
      });
    }
    return false;
  }

  useEffect(() => {
    fetchProducts();
  }, [state.products])

  return (
    <>
      <h1>Dashboard</h1>
      <Link className="btn btn-primary float-right" to="/create">Create</Link><br/><br/>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="bg-primary text-white">
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          state.products ?
            <Contentproducts/> :
            (<p className="text-center">Please wait...</p>)
          }
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
