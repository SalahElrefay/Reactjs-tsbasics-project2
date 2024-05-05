import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { formInputsList, productList } from "./data"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import { IProduct } from "./interfaces"
import { productValidation } from "./validate"
import ErrorMessage from "./components/ErrorMessage"



 const App = () => {

  const defaultProductObject = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category:{
      name:"",
      imageURL:""
    }
  }
  
 

  /* ------STATE --------*/
  const [product , setProduct] = useState<IProduct>(defaultProductObject);

  const [errors , setErrors] = useState({
   title: "" ,
   description: "" ,
   imageURL: "" ,
   price: ""});

  const [isOpen, setIsOpen] = useState(false);
  /* ------HANDLER ------*/

  // function closeModal() {
  //   setIsOpen(false)
  // }

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value , name } = event.target;

    setProduct({
      ...product,
      [name]:value
    });

    setErrors({
      ...errors,
      [name]: '',
    })

  };


 const onCancel = () => {
    console.log("cancel");
    setProduct(defaultProductObject);
    
    closeModal();
  }


 const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {title , description , imageURL , price} = product;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");

    if(!hasErrorMsg){
      setErrors(errors);
      return;
    }
    console.log("SEND THIS PRODUCT TO OUR SERVER");

    closeModal();

    setProduct(defaultProductObject);

    
    // console.log(errors);
    // console.log(product);
    
  }

  



  // function openModal() {
  //   setIsOpen(true)
  // }


// *--------- Renders -------*/
 const renderProductList = productList.map(product=> <ProductCard key={product.id} product = {product}/> )

 const renderFormInputList = formInputsList.map(input => <div className="flex flex-col" key ={input.id}>

  <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700 " >{input.label}</label>
  <Input type="text" name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} />

  <ErrorMessage msg={errors[input.name]} />
 
 </div>)
   

   

    return (
        <main className="container">
          <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal} >Add</Button>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 m-4 rounded-md p-4" >

            {renderProductList}
            
          </div>
          
          <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT" >
            <form className="space-y-3" onSubmit={submitHandler} >
              
              {renderFormInputList}

              <div className="flex items-center space-x-3 " >
                <Button className="bg-indigo-700 hover:bg-indigo-800 px-3 py-3" >Submit</Button>
            
                <Button className="bg-gray-400 hover:bg-gray-500 px-3 py-3" onClick={onCancel} >Cancel</Button>
              </div>
            </form>
            

            
            
          </Modal>
          
        </main>
    )
 }
  export default App