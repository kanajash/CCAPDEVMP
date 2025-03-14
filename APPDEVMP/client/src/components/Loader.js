import React, {useState} from 'react'
import HashLoader from "react-spinners/HashLoader";
function Loader() {
    let [loading, setLoading] = useState(true);
   
   
  
   
      
  return (
    <div >

<div className="sweet-loading" style={{width:"20%",margin:"0 auto",paddingTop:"10%"}}>
      <HashLoader
        color="#000"
        loading={loading}
        cssOverride=""
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"

      />
    </div>

    </div>
  )
}

export default Loader