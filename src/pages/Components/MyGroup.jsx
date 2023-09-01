import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import profile from "../../assets/profile.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



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

  const style2 = {
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


const MyGroup = () => {

    const db = getDatabase();

    let [myGrouplist, setmyGrouplist] = useState([])
    let [myGroupReglist, setmyGroupreglist] = useState([])
    let [myMemberslist, setMyMemberslist] = useState([])
    const [open, setOpen] = React.useState(false);

    let userData = useSelector((state)=> state.loguser.loginUser);
    
    const [open2, setOpen2] = React.useState(false);

    const handleOpen2 = (member) => {

      const groupRef = ref(db, 'members');
      onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
          if(userData.uid == item.val().adminid && item.val().groupid == member.groupid){
              arr.push({...item.val(), memberid: item.key })
          }
        })
        setMyMemberslist(arr)
    });

      setOpen2(true)
      
      // if(item.groupid == membergroupid &&  item.adminid == userData.uid)
    };
    const handleClose2 = () => setOpen2(false);

    const handleOpen = (group) => {
        
        const groupRef = ref(db, 'grouprequest');
        onValue(groupRef, (snapshot) => {
          let arr = []
          snapshot.forEach(item=>{
            if(userData.uid == item.val().adminid && item.val().groupid == group.groupid){
                arr.push({...item.val(), groupreqid: item.key })
            }
          })
          setmyGroupreglist(arr)
      });

        setOpen(true);
    } 
    const handleClose = () => setOpen(false);


    useEffect(()=>{
        const groupRef = ref(db, 'groups');
          onValue(groupRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                arr.push({...item.val(),groupid:item.key})
            })
            setmyGrouplist(arr)
        });
    },[])

    // useEffect(()=>{
   
    // },[])

    let handleGroupReqDelete = (item)=>{

      remove(ref(db, "grouprequest/" + item.groupreqid));

    }

    let handleGroupReqAccept = (item)=>{
      set(push(ref(db, "members/")),{
        ...item
      }).then(()=>{
        remove(ref(db, "grouprequest/" + item.groupreqid));
      })
    }

  return (
<div className='box'>
    <h3 className='title'>Group list
    <Button size='small' variant="contained">Create Group</Button>
    </h3>

    {myGrouplist.map(item=>(
            userData.uid == item.adminid &&
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
        <Button onClick={()=>handleOpen(item)} size='small' variant="contained">request</Button>
        <Button onClick={()=>handleOpen2(item)} size='small' variant="contained" color='success'>member</Button>
        </div>
    </div>
    ))}

      {/* group modal start */}
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Request List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

           {myGroupReglist.map(item=>(
                 <ListItem alignItems="flex-start">
                 <ListItemAvatar>
                   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                 </ListItemAvatar>
                 <ListItemText
                   primary={item.username}
                   secondary={
                     <React.Fragment>
                       <Typography
                         sx={{ display: 'inline' }}
                         component="span"
                         variant="body2"
                         color="text.primary"
                       >
                       </Typography>
                       {" — I'll be in your neighborhood doing errands this…"}
                       <Button onClick={()=>handleGroupReqAccept(item)} size='small' variant="contained" color='success'>Accept</Button>
                       <Button onClick={()=>handleGroupReqDelete(item)} size='small' variant="contained" color='error'>Cancle</Button>
                     </React.Fragment>
                   }
                 />
               </ListItem>
           ))}
 
    </List>
          </Typography>
        </Box>
      </Modal>
      {/* group modal end */}
      {/* Accept modal start */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Member
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                  {myMemberslist.map(item=>(
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.username}
                          secondary={
                             <React.Fragment>
                              <Typography
                                 sx={{ display: 'inline' }}
                                 component="span"
                                 variant="body2"
                                 color="text.primary"
                              >
                              </Typography>
                              {" — I'll be in your neighborhood doing errands this…"}
                              <Button onClick={()=>handleGroupReqDelete(item)} size='small' variant="contained" color='error'>Remove</Button>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                  ))}

</List>
          </Typography>
        </Box>
      </Modal>
      {/* Accept modal end */}
</div>
  )
}

export default MyGroup