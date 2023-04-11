import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../../features/projects/projectSlice';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewProjectForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { name, description };

    try {
      dispatch(createProject(newProject));
      navigate(`/projects`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-4">Create a new project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" >Create</button>
            <button type="button" onClick={props.onClose} className="ml-4 border border-gray-300 rounded-lg py-2 px-4">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectForm;
