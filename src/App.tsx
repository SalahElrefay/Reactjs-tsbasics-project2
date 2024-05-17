import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { categories, colors, formInputsList, productList } from "./data"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import { IProduct } from "./interfaces"
import { productValidation } from "./validate"
import ErrorMessage from "./components/ErrorMessage"
import CircleColor from "./components/CircleColor"
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select"
import { TProductName } from "./types"
import toast, { Toaster } from "react-hot-toast";


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
  const [products , setProducts] = useState<IProduct[]>(productList);

  const [product , setProduct] = useState<IProduct>(defaultProductObject);

  const [productToEdit , setProductToEdit] = useState<IProduct>(defaultProductObject);

  const [productToEditIdx , setProductToEditIdx] = useState<number>(0);

  const [errors , setErrors] = useState({
   title: "" ,
   description: "" ,
   imageURL: "" ,
   price: ""});

   const [tempColors , setTempColor] = useState<string[]>([]);

   console.log(tempColors);

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenEditModal , setIsOpenEditModal] = useState(false);

  const [isOpenConfirmModal , setIsOpenConfirmModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  console.log("PRODUCT TO EDIT" , productToEdit);


  /* ------HANDLER ------*/

  // function closeModal() {
  //   setIsOpen(false)
  // }

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);  

  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const openConfirmModal = () => setIsOpenConfirmModal(true);

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
  const onChangeEditHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value , name } = event.target;

    setProductToEdit({
      ...productToEdit,
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

  const removeProductHandler = () => {
    const filtered = products.filter(product => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };


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

    setProducts(prev => [{...product, id:uuid(), colors: tempColors ,category: selectedCategory}, ...prev]);

    

    closeModal();

    setProduct(defaultProductObject);
    setTempColor([]);

    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });

    
    // console.log(errors);
    // console.log(product);
    
  }
 const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {title , description , imageURL , price} = productToEdit;

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

    const updatedProducts = [...products];

    updatedProducts[productToEditIdx] = {...productToEdit , colors: tempColors.concat(productToEdit.colors)};
    

    setProducts(updatedProducts);


    setProductToEdit(defaultProductObject);
    setTempColor([]);
    closeEditModal();

    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });

    
    // console.log(errors);
    // console.log(product);
    
  }

  



  // function openModal() {
  //   setIsOpen(true)
  // }


// *--------- Renders -------*/
 const renderProductList = products.map((product , idx )=> (
 
   <ProductCard 
     key={product.id} product = {product} setProductToEdit={setProductToEdit} openEditModal={openEditModal} idx={idx} setProductToEditIdx={setProductToEditIdx}
     openConfirmModal={openConfirmModal}
   /> 
 ));

 const renderFormInputList = formInputsList.map(input => <div className="flex flex-col" key ={input.id}>

  <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700 " >{input.label}</label>
  
  <Input type="text" name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} />

  <ErrorMessage msg={errors[input.name]} />
 
 </div>
 
);
 
 const renderCircleColorList = colors.map(color => <CircleColor key={color} color={color} onClick={() => {
  
  if(tempColors.includes(color)){

    setTempColor(prev => prev.filter(item => item !== color))

    return;
  }
  if(productToEdit.colors.includes(color)){

    setTempColor(prev => prev.filter(item => item !== color))

    return;
  }

  
  setTempColor( prev =>[...prev , color])}}/>);
  
  
  const renderProductEditWithError = (id: string , label: string , name:TProductName) => {
    return(
      <div className="flex flex-col" >

      <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700 " >
                  
                

        {label}

      </label>

      <Input type="text" name={name} id={id} value={productToEdit[name]} onChange={onChangeEditHandler} />

      <ErrorMessage msg={errors[name]} />

    </div>
  )
}   

   

  return (
        <main className="container">
          <Button className="bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium " onClick={openModal}>Build a Product</Button>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 m-4 rounded-md p-4" >

            {renderProductList}
            
          </div>
          
          {/* Add product modal*/}

          <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT" >
            <form className="space-y-3" onSubmit={submitHandler} >
              
              {renderFormInputList}

              <Select selected={selectedCategory} setSelected={setSelectedCategory} />

              <div className="flex items-center space-x-1 ">
              
                {renderCircleColorList}
              
              </div>


              

              <div className="flex items-center space-x-1 ">
              
                {tempColors.map(color => <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white flex-wrap" style={{backgroundColor: color}} >{color}</span>)}
              
              </div>

              

              <div className="flex items-center space-x-3 " >
                <Button className="bg-indigo-700 hover:bg-indigo-800 px-3 py-3" >Submit</Button>
            
                <Button className="bg-gray-400 hover:bg-gray-500 px-3 py-3" onClick={onCancel} >Cancel</Button>
              </div>
            </form>
            

            
            
          </Modal>

          {/* Edit product Modal */}

          <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title="EDIT NEW PRODUCT" >
            <form className="space-y-3" onSubmit={submitEditHandler} >

              {renderProductEditWithError('title' , 'Product Title' , 'title')}
              {renderProductEditWithError('description' , 'Product Description' , 'description')}
              {renderProductEditWithError('imageURL' , 'Product ImageURL' , 'imageURL')}
              {renderProductEditWithError('price' , 'Product Price' , 'price')}

              {/* <div className="flex flex-col" >

                <label htmlFor={"title"} className="mb-[2px] text-sm font-medium text-gray-700 " >
                  
                

                  Product Title

                </label>

                <Input type="text" name={'title'} id={'title'} value={productToEdit['title']} onChange={onChangeEditHandler} />

                <ErrorMessage msg={''} />

              </div> */}

              {/* <div className="flex flex-col" >

                <label htmlFor={"title"} className="mb-[2px] text-sm font-medium text-gray-700 " >
  


                  Product Description

                </label>

                <Input type="text" name={'description'} id={'description'} value={productToEdit['description']} onChange={onChangeEditHandler} />

                <ErrorMessage msg={''} />

              </div> */}
              
              

              <Select selected={productToEdit.category} setSelected={value => setProductToEdit({...productToEdit, category: value})} /> 

              <div className="flex items-center flex-wrap space-x-1 ">
              
                {renderCircleColorList}
              
              </div>


              

              <div className="flex items-center flex-wrap space-x-1 ">
              
                {tempColors.concat(productToEdit.colors).map(color => (
                  <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{backgroundColor: color}} >
                    {color}

                  </span>
                ))}
              
              </div>

              

              <div className="flex items-center space-x-3 " >
                <Button className="bg-indigo-700 hover:bg-indigo-800 " >Submit</Button>
            
                <Button className="bg-[#f5f5fa] hover:bg-gray-300 !text-black  " onClick={onCancel} >Cancel</Button>
              </div>
            </form>
          </Modal>

          {/* DELETE PRODUCT CONFIRM MODAL */}
          <Modal
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
          >
            <div className="flex items-center space-x-3">
              <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
                Yes, remove
              </Button>
              <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
                Cancel
              </Button>
            </div>
          </Modal>

          <Toaster />
          
        </main>
    )
 }
  export default App