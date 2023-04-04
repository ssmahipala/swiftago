import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import EmptyState from './EmptyState';
import { createProject } from '../features/projects/projectSlice';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {toast} from 'react-toastify'

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const dispatch = useDispatch();

  const {isSuccess, message } = useSelector((state) => state.project);

  useEffect(() => {
    if(isSuccess) {
      return toast.done('Retrieved Successfully')
    } else {
      return toast.error(message)
    }
  }, [isSuccess, message, dispatch])


  const handleCreateProject = () => {
    dispatch(createProject());
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-6 pt-16"> {/* add padding to the top */}
          {projects.length >= 1 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium">{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                ))}
                <div className="bg-white rounded-lg shadow-md p-6">
                <Link to="/create-project" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleCreateProject}> Create a new Project </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <EmptyState message="No projects to display." />
                <div className="bg-white rounded-lg shadow-md p-6 mx-auto">
                <Link to="/create-project" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={handleCreateProject}> Create a new Project </Link>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Banner />
      <Footer />
    </div>
  );
}

export default ProjectDashboard;
