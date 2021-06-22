import React, {
  useRef,
  useEffect,
  useContext
} from "react";
import {
  useParams,
  useHistory
} from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../utils/context";
import API from "../../utils/api";

const Edit = () => {
  const {id} = useParams();
  const history = useHistory();
  const {state, dispatch} = useContext(AppContext);

  console.log(state.product)
  const productName = useRef(""),
        productPrice = useRef(""),
        productDesc = useRef(""),
  	    productImage = useRef(""),
  	    productCategory = useRef(""),
  	    productStock = useRef("");

  const fetchproduct = () => {
    axios.get(`${API.PRODUCTS}/${id}`, {
      headers: {Authorization: `Bearer ${state.token}`}
    })
    .then(response => {
      dispatch({
        type: "PRODUCT",
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  const submitUpdate = () => {
    axios.put(`${API.UPDATEMENU}/${id}`, {
      "name": productName.current.defaultValue,
      "description": productDesc.current.defaultValue,
      "image": productImage.current.defaultValue,
      "price": productPrice.current.defaultValue,
      "status": productStock.current.defaultValue,
      "categories": {
        "name": productCategory.current.defaultValue.split(","),
      },
    },
    {
      headers: {
        "Authorization": `Bearer ${state.token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      productStock.current.defaultValue = state.available ? "Ya" : "Tidak";

      if(response.ok){
        history.push('/dashboard');
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  useEffect(() => {
    fetchproduct()
  }, [state.product])

  return(
    <>
      {state.product ?
        <form className="form">
          <div className="form-group">
            <label>Name <span className="text-danger">*</span></label>
            <input type="text" ref={productName} defaultValue={state.product.name} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Price ($)<span className="text-danger">*</span></label>
            <input type="text" ref={productPrice} defaultValue={state.product.price} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Category <span className="text-danger">*</span></label>
            <input type="text" ref={productCategory} defaultValue={state.product.categories ? state.product.categories.map((item => `${item.name}, `)) : ""} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Description <span className="text-danger">*</span></label>
            <textarea ref={productDesc} defaultValue={state.product.description} className="form-control" placeholder="Description"></textarea>
          </div>
          {/* {state.product.image !== "" ?
            <div className="form-group">
              <img width="100" className="img-preview" height="100" src={`${state.product.image}/?v="${state.product.id}"`} alt=""/>
            </div> :
            null
          } */}
          <div className="form-group">
            <label>Change Image <span className="text-danger"></span></label>
            <input ref={productImage} className="form-control file-upload" type="file" />
          </div>
          <div className="form-group">
            <label>Available <span className="text-danger"></span></label>
            <select ref={productStock} className="form-control">
              <option defaultValue="Ya">Ya</option>
              <option defaultValue="Tidak">Tidak</option>
            </select>
          </div>
          <div className="form-group">
            <button onClick={submitUpdate} className="btn btn-primary">Update</button>
          </div>
        </form>
        :
        (<p>Please wait...</p>)
      }
    </>
  )
}

export default Edit;