
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(function () {
    getProducts();
  }, []);

  function getProducts() {
    axios.get("http://localhost:3000/products")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addProduct() {
    if (title === "" || price === "") {
      alert("Please enter name and price");
      return;
    }

    axios.post("http://localhost:3000/products", {
      title: title,
      price: Number(price)
    })
      .then(function () {
        getProducts();
        clearForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editProduct(product) {
    setTitle(product.title);
    setPrice(String(product.price));
    setEditId(product.id);
  }

  function updateProduct() {
    axios.put("http://localhost:3000/products/" + editId, {
      title: title,
      price: Number(price)
    })
      .then(function () {
        getProducts();
        clearForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
function deleteProduct(id) {
  axios.delete("http://localhost:3000/products/" + id)
    .then(function () {
      getProducts();
    })
    .catch(function (error) {
      console.log(error);
    });
}

  function clearForm() {
    setTitle("");
    setPrice("");
    setEditId(null);
  }

  return (
    <div>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={function (event) {
          setTitle(event.target.value);
        }}
      />

      <input
        type="number"
        placeholder="Product price"
        value={price}
        onChange={function (event) {
          setPrice(event.target.value);
        }}
      />

      {editId === null ? (
        <button onClick={addProduct}>Add Product</button>
      ) : (
        <button onClick={updateProduct}>Update Product</button>
      )}

      {products.map(function (product) {
        return (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ₹{product.price}</p>

            <button onClick={function () {
              editProduct(product);
            }}>
              Edit
            </button>

<button onClick={function () {
  deleteProduct(product.id);
}}>
  Delete
</button>

          </div>
        );
      })}
    </div>
  );
}

export default App;
