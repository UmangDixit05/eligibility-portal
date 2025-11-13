// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import axios from 'axios'

// function RemoveStudent() {
//   const [show, setShow] = useState(false);
//   const [info, setInfo] = useState({
//     div: "",
//     rollNo: ""
//   });
//   const [message, setMessage] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleChange = (e) => {
//     setInfo((prev) => ({...prev, [e.target.name]: e.target.value}));
//   }

//   const handleDelete = async () => {
//     try {
//       const res = await axios.delete("http://localhost:8080/students",{
//         data: info
//       });
//       setInfo({
//         div: "",
//         rollNo: ""
//       })
//       setMessage(res.data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <Button variant="danger" onClick={handleShow}>
//         Remove Student
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Remove Student</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Enter Divison</Form.Label>
//                 <Form.Control type="text" placeholder="Division" required onChange={handleChange} value={info.div} name='div' />
//               </Form.Group>
        
//               <Form.Group className="mb-3" controlId="formBasicText">
//                 <Form.Label>Roll No</Form.Label>
//                 <Form.Control type="number" placeholder="1" required onChange={handleChange} value={info.rollNo} name='rollNo' />
//               </Form.Group>
//               <h6 className='text-danger'>{message}</h6>
//             </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Remove
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default RemoveStudent;