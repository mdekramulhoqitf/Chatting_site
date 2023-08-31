import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, set, push, onValue, remove, DataSnapshot } from 'firebase/database';
import { useSelector } from 'react-redux/es/hooks/useSelector';


const Block = () => {
    const db = getDatabase()

    let [blockList, setBlocklist] = useState([])

    let userData = useSelector((state) => state.loguser.loginUser);

    useEffect(()=>{
        const blockRef = ref(db, "block");
        onValue(blockRef, (snapshot) =>{
            let arr = []

            snapshot.forEach((item)=>{
                arr.push({...item.val(),id: item.key})
            });
            setBlocklist(arr);
        })
    },[])

    let handleUnblock = (item) =>{
        remove(ref(db, "block/" + item.id))
    }


  return (
<div className='box'>
    <h3 className='title'>Block Mamber
    <Button size='small' variant="contained">Create Group</Button>
    </h3>
   <>

   {blockList.map(item=>(
    
         <div className='list'>
                <div className='img'>
                <img src={profile}/>
        </div>
        <div className='details'>
        {item.blockbyid == userData.uid
            ?
            <h4>{item.blockedname}</h4>
            :
            <h4>{item.blockbyname}</h4>
            }
            <p>Hi Guys, Wassup!</p>
        </div>
        <div className='join_button'>
            {item.blockbyid == userData.uid && 
                 <Button  onClick={()=>handleUnblock(item)} size='small' variant="contained">Unblock</Button>
            }
        </div>
    </div>
   ))}
  </>
</div>
  )
}

export default Block