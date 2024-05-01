import { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/functions";
import Image from "./Image"
import Button from "./ui/Button"

interface IProps{
product: IProduct;
}
 const ProductCard = ({product}: IProps) => {
    const {title , description , imageURL , price , category } = product;

    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3" >
            {/* <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D" alt="product name"  className="rounded-md" /> */}

            <Image imageUrl={imageURL } alt={"productName"} className="rounded-md mb-2 h-52 w-full lg:object-cover"  />

            <h3 className="text-lg font-semibold " >{txtSlicer(title , 25)}</h3>

            <p className="font-light" >{txtSlicer(description)} </p>

            <div className="flex items-center space-x-2 ">
                <span className="w-5 h-5 rounded-full cursor-pointer bg-indigo-700 "/>
                <span className="w-5 h-5 rounded-full cursor-pointer bg-yellow-600"/>
                <span className="w-5 h-5 rounded-full cursor-pointer bg-red-600"/>
            
            </div>

            <div className="flex items-center justify-between" >
                <span className="text-blue-800 font-bold " >
                ${price}
                </span>
                <div className="flex items-center space-x-2" >
                <Image imageUrl={category.imageURL } alt={category.name} className="w-10 h-10 rounded-full object-bottom" />

                    <span>{product.category.name}</span>
                </div>
            </div>

            <div className="flex items-center justify-between space-x-2 mt-2 " >
                {/* <button className="bg-indigo-700 p-2 w-full rounded-md text-white ">EDIT</button>
                <button className="bg-red-700 p-2 w-full rounded-md text-white" >DELETE</button> */}

                <Button className="bg-indigo-700 w-full" onClick={()=>{console.log("clicked");}} >EDIT</Button>
                <Button className="bg-red-700 w-full ">DELETE</Button>
            </div>
            
        </div>
    )
 }
  export default ProductCard