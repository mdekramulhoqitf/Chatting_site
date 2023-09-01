import {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getDatabase, ref, set, push, onValue } from "firebase/database";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  let groupData = {
    groupname: "",
    grouptagline: "",
  }
  

const Group = () => {

    const db = getDatabase();

    let [grouplist, setGrouplist] = useState([])
    let [groupmemberlist, setGroupmemberlist] = useState([])

    let [groupInfo, setGroupInfo] = useState(groupData);
    let userData = useSelector((state)=> state.loguser.loginUser);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    let handleChange = (e) => {

        setGroupInfo({
            ...groupInfo,
            [e.target.name] : e.target.value
        })

    }

    let handleSubmit = () => {
            
             set(push(ref(db, 'groups/')), {
                groupname: groupInfo.groupname,
                grouptagline: groupInfo.grouptagline,
                adminid: userData.uid,
                adminname: userData.displayName,              
        }).then(()=>{
          setOpen(false)
        })
    }


    useEffect(()=>{
      const groupRef = ref(db, 'groups');
      onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            arr.push({...item.val(),groupid:item.key})
        })
        setGrouplist(arr)
    });
    },[])

    let handleGroupjoin = (item)=>{
      set(push(ref(db, 'grouprequest/')), {
       adminid: item.adminid,
       adminname: item.adminname,
       groupid: item.groupid,
       groupname: item.groupname,
       userid: userData.uid,
       username: userData.displayName,          
   })
    }

    useEffect(()=>{
      const groupRef = ref(db, 'grouprequest');
      onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
          if(item.val().userid == userData.uid){
            arr.push(item.val().groupid)
          }
        })
        setGroupmemberlist(arr)
    });
    },[])

    let handleReqDelete = (g)=>{
      const groupRef = ref(db, 'grouprequest');
      onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
          if(item.val().userid == userData.uid && g.groupid == item.val().groupid){
            
            remove(ref(db, "grouprequest/" + item.key));
          }
        })
        setGroupmemberlist(arr)
    });
    }

    return (



<div className='box'>
    <h3 className='title'>Group list
    <Button onClick={handleOpen} size='small' variant="contained">Create Group</Button>
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField onChange={handleChange} name='groupname' margin="dense" id="outlined-basic" label="Group Name" variant="outlined" />
          <TextField onChange={handleChange} name='grouptagline' margin="dense" id="outlined-basic" label="Group Tagline" variant="outlined" />
          <Button onClick={handleSubmit} variant="contained">Contained</Button>
          </Typography>
        </Box>
      </Modal>

    </h3>
    {grouplist.map(item=>(
       userData.uid != item.adminid &&
    <div className='list'>
        <div className='img'>
            <img src={profile}/>
        </div>
        <div className='details'>
        <p>Admin:{item.adminname}</p>
            <h4>{item.groupname}</h4>
            <p>{item.grouptagline}</p>
        </div>
        <div className='join_button'>
          {groupmemberlist.indexOf(item.groupid) != -1 ? 
          <>
          <Button size='small' variant="contained">Request Sent</Button>
          <Button onClick={()=>handleReqDelete(item)} size='small' variant="contained" color='error'>Req Cancle</Button>
          </>
        :
        <Button onClick={()=>handleGroupjoin(item)} size='small' variant="contained">join</Button>
          }
        </div>
    </div>
    ))}
</div>
  )
}

export default Group