import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Banner from '../Banner';
import Footer from '../Footer';
import EmptyState from '../EmptyState';
import { getProjects, deleteProject } from '../../features/projects/projectSlice';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus } from 'react-icons/fa';
import NewProjectForm from './CreateProjectModal';

function ProjectDashboard() {
  const dispatch = useDispatch();

  const { projects, isError, isSuccess, isLoading, message } = useSelector((state) => state.projects);

  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.done('Retrieved Successfully');
    } else if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);


  const handleDeleteProject = async (projectId) => {
    // if (window.confirm(`Are you sure you want to delete this project?${projectId}`)) {
      try {
        dispatch(deleteProject(projectId));
        toast.success('Project deleted successfully');
        // Wait for 1 seconds before refreshing the page
        setTimeout(() => {
          dispatch(getProjects());
        }, 500);
      } catch (error) {
        toast.error(error.message);
      }
    // }
  };

  const handleSubmitNewProject = async (name, description) => {
    try {
      setIsNewProjectOpen(false);
      toast.success('Project created successfully');
      // Wait for 1 seconds before refreshing the page
      setTimeout(() => {
        dispatch(getProjects());
      }, 100);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-6 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
            <h3 className='h3 p-6'>This is where you could find your existing Projects.<br /> Feel free to create a new one!</h3>
             {projects.length >= 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects && projects.map((project) => (
                    <div key={project._id} className="bg-white rounded-lg shadow-md p-6 relative flex flex-col justify-center items-center">
                      <Link to={`/projects/${project._id}`}><h3 className="text-lg font-medium text-center">{project.name}</h3></Link>
                      <p className="text-center">{project.description}</p>
                      <Link
                        to={`/projects`}
                        className="absolute left-6 flex justify-end items-center"
                      >
                        <FaTrash
                          onClick={() => handleDeleteProject(project._id)}
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          style={{ marginLeft: 'auto', paddingTop: '4px' }}
                        />
                      </Link>
                    </div>
                  ))}

                </div>
              ) : (
                <EmptyState message="No projects to display."
                  onButtonClick={() => {
                    setIsNewProjectOpen(true);
                  }}
                />
              )}
              <div className="bg-white rounded-lg shadow-md p-6 mx-auto" style={{ width: "max-content" }}>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center mx-auto text-center
                      "
                      onClick={() => {
                        setIsNewProjectOpen(true);
                      }}
                    >
                      <FaPlus className="mr-2" /> Create a new Project
                    </button>
                  </div>
              {isNewProjectOpen && <NewProjectForm onSubmit={handleSubmitNewProject} onClose={() => setIsNewProjectOpen(false)} />}
            </>
          )}

        </div>
        </section>
      </main>
      <Banner />
      <Footer />
    </div>
  );
}

export default ProjectDashboard;