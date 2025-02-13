import React, { useState } from 'react';
import axios from 'axios';

function ImageUploadForm() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('image', image);

    try {
      // Send a POST request to your server to save the image data
      await axios.post('/api/uploadImage', formData);

      // Clear form fields after successful submission
      setName('');
      setDesc('');
      setImage(null);

      // Optionally, you can display a success message or redirect the user
      console.log('Image uploaded successfully');
    } catch (error) {
      // Handle errors here
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <hr />
      <div>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="name">Image Title</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
          <div>
            <label htmlFor="desc">Image Description</label>
            <textarea
              id="desc"
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="2"
              placeholder="Description"
              required
            />
          </div>
          <div>
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageUploadForm;
