import React, {
  useRef,
  useEffect,
  useContext
} from "react";
import {
  useHistory
} from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../utils/context";
import API from "../../utils/api";

const Create = () => {
  const history = useHistory();

  const {state, dispatch} = useContext(AppContext);

  const productName = useRef(""),
        productPrice = useRef(""),
        productDesc = useRef(""),
        productImage = useRef(""),
  	    productCategory = useRef(""),
  	    productStock = useRef("")

  useEffect(() => {
    dispatch({
      type: "CHECKTOKEN"
    });
  }, [state.token])
  
  const submitCreate = () => {
    axios.post(`${API.PRODUCTS}`, {
      "name": productName.current.value,
      "price": productPrice.current.value,
      "description": productDesc.current.value,
      "image": productImage.current.value,
      "categories": [{
        "name": productCategory.current.value,
      }],
      "status": productStock.current.value === "Ya" ? true : false
    },
    {
      headers: {
        "Authorization": `Bearer ${state.token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok){
        console.log('ok')
        history.push('/dashboard');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  
  return(
    <>
      <form className="form">
        <div className="form-group">
          <label>Name <span className="text-danger">*</span></label>
          <input type="text" ref={productName} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Price (IDR)<span className="text-danger">*</span></label>
          <input type="text" ref={productPrice} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Category <span className="text-danger">*</span></label>
          <input type="text" ref={productCategory} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Description <span className="text-danger">*</span></label>
          <textarea ref={productDesc} className="form-control" placeholder="Description"></textarea>
        </div>
        <div className="form-group">
          <label>Image <span className="text-danger"></span></label>
          <input ref={productImage} className="form-control" type="file" />
        </div>
        <div className="form-group">
          <label>Out of Stock <span className="text-danger"></span></label>
          <select ref={productStock} className="form-control">
            <option value="Ya">Ya</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div>
        <div className="form-group">
          <button onClick={submitCreate} className="btn btn-primary">Create</button>
        </div>
      </form>
    </>
  )
}

export default Create;