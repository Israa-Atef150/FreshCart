import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let AuthContext = createContext();


export default function AuthContextProvider({children}){

    const[userLoggedIn , setUserLoggedIn] = useState(localStorage.getItem('token')?true : false)
    let[cartNumber,setCartNumber]=useState(parseInt(localStorage.getItem('cartNumber'))?parseInt(localStorage.getItem('cartNumber')):0)
    


    // const [cartNumber, setCartNumber] = useState(
    //     parseInt(localStorage.getItem("cartNumber")) || 0
    //   );
    
      // useEffect(() => {
      //   async function getProduct() {
      //     try {
      //       if (userLoggedIn) {
      //         const response = await axios.get(
      //           "https://ecommerce.routemisr.com/api/v1/cart",
      //           {
      //             headers: {
      //               token: localStorage.getItem("token"),
      //             },
      //           }
      //         );
      //         if (response?.data) {
      //           setCartNumber(response.data.numOfCartItems);
      //           localStorage.setItem("cartNumber", response.data.numOfCartItems);
      //         }
      //       } else {
      //         setCartNumber(0);
      //         localStorage.setItem("cartNumber", 0);
      //       }
      //     } catch (err) {
      //       console.error("Error fetching cart data:", err);
      //     }
      //   }
    
      //   getProduct();
      // }, [userLoggedIn]);


      useEffect(()=>{
        async function getProduct() {
          setCartNumber(parseInt(localStorage.getItem('cartNumber')))
              try {
                  const response = await axios.get(
                    "https://ecommerce.routemisr.com/api/v1/cart",
                    {
                      headers: {
                        token: localStorage.getItem("token"),
                      },
                    }
                  );
                  if (response?.data) {
                    setCartNumber(response.data.numOfCartItems);
                    localStorage.setItem("cartNumber", response.data.numOfCartItems);
                  }
                
                // else {
                //   setCartNumber(0);
                //   localStorage.setItem("cartNumber", 0);
                // }
              } catch (err) {
                console.error("Error fetching cart data:", err);
              }
            }
        
            getProduct();
      })
    
    return <AuthContext.Provider value={{userLoggedIn , setUserLoggedIn,cartNumber,setCartNumber}}>
        {children}
    </AuthContext.Provider>
}