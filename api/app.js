const express = require("express");
const app = express();
const {verify} = require('jsonwebtoken')
const cors = require("cors");
const fileUpload=require("express-fileupload")


app.use(cors());
app.use(express.json());
app.use(fileUpload({}))
app.use(express.static('public'))

function AdminAuthorization_HTTP_Request(req, res, next) {
    if (!req.body.token) {
        return res.json({error: 'Unauthorized Access', message: ''})
    }

    let token = req.body.token
    let secret = "abc@123"

    try {
        // verify token
        req['adminInfo'] = verify(token, secret) // return data
        next()
    } catch (error) {
        res.json({error: error.message, message: ''})
    }
}
function UserAuthorization_HTTP_Request(req, res, next) {
    if (!req.body.token) {
        return res.json({error: 'Unauthorized Access', message: ''})
    }

    let token = req.body.token
    let secret = "abc@123"

    try {
        // verify token
        req['userInfo'] = verify(token, secret) // return data
        next()
    } catch (error) {
        res.json({error: error.message, message: ''})
    }
}


const adminController = require("./controllers/admin.controller")
const  userController=require("./controllers/user.controller")
const connection = require("./connection");


app.set("/", (req, res) => {
    res.set("Response from server");
});

app.post("/category", adminController.AddCategory)
app.get("/category", adminController.ReadCategory)
app.delete("/category/:id", adminController.DeleteCategory)

app.post("/upload-photo", adminController.UploadPhoto)
app.post("/subcategory", adminController.AddSubCategory)
app.get("/subcategory", adminController.Readsubcategory)
app.get("/get-subcategory/:categoryId", adminController.ReadSubCategory)
app.delete("/subcategory/:id", adminController.DeleteSubCategory)

app.post("/products", adminController.AddProduct)
app.get("/products", adminController.ReadProducts)
app.delete("/products/:id", adminController.DeleteProducts)

app.post("/add-to-cart", UserAuthorization_HTTP_Request, userController.AddToCart)
app.post("/read-cart-data",UserAuthorization_HTTP_Request,userController.ReadCart)
app.delete("/delete-cart/:id",userController.DeleteCart)
app.delete("/empty-cart", UserAuthorization_HTTP_Request, userController.EmptyCart)
app.post("/update-cart-data",UserAuthorization_HTTP_Request,userController.UpdateCartQuantity)

app.post("/search-bar",userController.SearchBar)

// app.post("/order",UserAuthorization_HTTP_Request,userController.OrderGenerate)
app.post("/place-order", UserAuthorization_HTTP_Request, userController.PlaceOrder)
// app.post("/read-bill",UserAuthorization_HTTP_Request,userController.ReadBill)

app.post("/my-orders", UserAuthorization_HTTP_Request, userController.MyOrders);

// app.post("/product-by-catgeory",userController.ReadProductByCategory)

app.post("/read-user",UserAuthorization_HTTP_Request,userController.ReadUser)
app.post("/update-user",UserAuthorization_HTTP_Request,userController.UpdateUser)

app.post("/adminlogin", adminController.AdminLogin)
// app.post("/change-password",adminController.AdminChangePassword)
app.post("/change-password", AdminAuthorization_HTTP_Request, adminController.AdminChangePassword)

      //****for user******
app.post("/user-signup",userController.UserSignup)
app.post("/user-login",userController.UserLogin)
app.post("/user-change-password",UserAuthorization_HTTP_Request,userController.UserChangePassword)

app.post("/contact",UserAuthorization_HTTP_Request,userController.Contact)

app.get("/pending-order",adminController.ReadPendingOrder)
app.post("/ship-order",adminController.ShipOrder)
app.get("/shipped-order",adminController.ReadShippedOrder)

const Port = 5000;
app.listen(Port, (error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("Server is Running");
    }
})
