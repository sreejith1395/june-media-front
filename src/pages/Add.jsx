
import React from 'react'
import { PlusCircle } from 'react-feather'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../services/allapi';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add({handleRes}) {

  const [uploadData, setuploadData] = useState({
    id: "", caption: "", thumbnail: "", url: ""
  })


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e) => {

    const { name, value } = e.target
    setuploadData({ ...uploadData, [name]: value })

  }
  console.log(uploadData);

  // original url :https://www.youtube.com/watch?v=ivX8_EZAs9I


  

  // src="https://www.youtube.com/embed/ivX8_EZAs9I"



  

  const extractUrl = (e) => {
    let youtubeUrl = e.target.value
    if (youtubeUrl.includes("v=")) {

      let index = youtubeUrl.indexOf("v=")
      console.log(index);


      let videourl = youtubeUrl.substring(index + 2, index + 13)
      console.log(videourl);

      let videoData = uploadData

      videoData.url = `https://www.youtube.com/embed/${videourl}`
      setuploadData(videoData)


    }

    console.log(uploadData);

  }




  // define handle add function

  const handleAdd = async () => {
    const { id, caption, thumbnail, url } = uploadData

    if (!id || !caption || !thumbnail || !url) {
      toast.warn("please fill the form completly")
    }
    else {
      const response = await addVideo(uploadData)


      if (response.status >= 200 && response.status < 300) {

        // console.log(response.data);
        handleRes(response.data)

        toast.success("new video uploaded successfully", {

          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        })
        setShow(false)
      }
      else {
        toast.warn("provide a unique is!!!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }


    }

  }


  return (
    <>
      <div onClick={handleShow} >
        <PlusCircle color='blue' size={90} />
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingId" label="Uploading video id">
              <Form.Control type="text" placeholder="Video id" name='id' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading video caption">
              <Form.Control type="text" placeholder="Video caption" name='caption' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingImage" label="Uploading video cover image url">
              <Form.Control type="text" placeholder="Video cover image URL" name='thumbnail' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingLink" label="Uploading video Link">
              <Form.Control type="text" placeholder="Video Link" name='url' onChange={extractUrl} />
            </FloatingLabel>

          </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

    </>
  )
}

export default Add