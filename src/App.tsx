import { useState } from "react"
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import { productList } from "./data"
import Button from "./components/ui/Button"

 const App = () => {
  /* ------STATE --------*/

  const [isOpen, setIsOpen] = useState(false)

  /* ------HANDLER ------*/

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


// *--------- Renders -------*/
 const renderProductList = productList.map(product=> <ProductCard key={product.id} product = {product}/> )

    return (
        <main className="container">
          <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal} >Add</Button>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 m-4 rounded-md p-4" >

            {renderProductList}
            
          </div>
          
          <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT" >
            <div className="flex items-center space-x-3 " >
              <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            
              <Button className="bg-gray-300 hover:bg-gray-400">Cancel</Button></div>
            
          </Modal>
          
        </main>
    )
 }
  export default App